// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/ILicenseManager.sol";
import "./interfaces/IAgentRegistry.sol";

/**
 * @title LicenseManager
 * @notice Manages agent licensing, billing, and royalty distribution
 * @dev Supports per-invocation, subscription, and unlimited license types
 */
contract LicenseManager is ILicenseManager, Ownable, ReentrancyGuard {
    IAgentRegistry public immutable agentRegistry;

    uint16 public constant DEFAULT_CREATOR_SHARE = 7000;  // 70%
    uint16 public constant DEFAULT_PLATFORM_SHARE = 1500;  // 15%
    uint16 public constant DEFAULT_INFRA_SHARE = 1500;     // 15%

    uint256 private _nextLicenseId = 1;

    mapping(uint256 => License) private _licenses;
    mapping(address => uint256[]) private _userLicenses;
    mapping(uint256 => RoyaltySplit) private _agentRoyaltySplits;
    mapping(uint256 => address) private _agentPaymentRecipient;

    constructor(address _agentRegistry) Ownable(msg.sender) {
        agentRegistry = IAgentRegistry(_agentRegistry);
    }

    function createLicense(
        uint256 agentId,
        LicenseType licenseType,
        uint256 pricePerInvocation,
        uint256 subscriptionPrice,
        uint256 maxInvocations
    ) external payable nonReentrant returns (uint256) {
        IAgentRegistry.Agent memory agent = agentRegistry.getAgent(agentId);
        require(agent.isActive, "Agent not active");

        uint256 licenseId = _nextLicenseId++;

        License storage license = _licenses[licenseId];
        license.licenseId = licenseId;
        license.agentId = agentId;
        license.licensee = msg.sender;
        license.licenseType = licenseType;
        license.pricePerInvocation = pricePerInvocation;
        license.subscriptionPrice = subscriptionPrice;
        license.validUntil = licenseType == LicenseType.Subscription
            ? block.timestamp + 30 days
            : block.timestamp + 365 days;
        license.invocationsUsed = 0;
        license.maxInvocations = maxInvocations;
        license.isActive = true;

        _userLicenses[msg.sender].push(licenseId);

        emit LicenseCreated(licenseId, agentId, msg.sender);
        return licenseId;
    }

    function revokeLicense(uint256 licenseId) external {
        License storage license = _licenses[licenseId];
        require(
            license.licensee == msg.sender || license.licensee == agentRegistry.getAgent(license.agentId).creator,
            "Unauthorized"
        );
        license.isActive = false;
        emit LicenseRevoked(licenseId);
    }

    function validateAndBill(uint256 licenseId) external payable nonReentrant returns (bool) {
        License storage license = _licenses[licenseId];
        require(license.isActive, "License inactive");
        require(block.timestamp <= license.validUntil, "License expired");
        require(license.invocationsUsed < license.maxInvocations, "Max invocations reached");

        if (license.licenseType == LicenseType.PerInvocation) {
            require(msg.value >= license.pricePerInvocation, "Insufficient payment");
            _distributeRoyalty(license.agentId, msg.value);
        }

        license.invocationsUsed++;
        agentRegistry.incrementInvocationCount(license.agentId);

        return true;
    }

    function _distributeRoyalty(uint256 agentId, uint256 amount) internal {
        RoyaltySplit memory split = getAgentRoyaltySplit(agentId);
        IAgentRegistry.Agent memory agent = agentRegistry.getAgent(agentId);

        uint256 creatorAmount = (amount * split.creatorShare) / 10000;
        uint256 platformAmount = (amount * split.platformShare) / 10000;
        uint256 infraAmount = amount - creatorAmount - platformAmount;

        // Transfer to creator
        (bool success1, ) = agent.creator.call{value: creatorAmount}("");
        require(success1, "Creator transfer failed");

        // Platform and infra fees go to contract owner
        (bool success2, ) = owner().call{value: platformAmount + infraAmount}("");
        require(success2, "Platform transfer failed");

        emit RoyaltyDistributed(agentId, amount);
    }

    function getLicense(uint256 licenseId) external view returns (License memory) {
        return _licenses[licenseId];
    }

    function getUserLicenses(address user) external view returns (uint256[] memory) {
        return _userLicenses[user];
    }

    function getAgentRoyaltySplit(uint256) external view returns (RoyaltySplit memory) {
        return RoyaltySplit({
            creator: address(0),
            platform: owner(),
            infrastructure: owner(),
            creatorShare: DEFAULT_CREATOR_SHARE,
            platformShare: DEFAULT_PLATFORM_SHARE,
            infrastructureShare: DEFAULT_INFRA_SHARE
        });
    }
}
