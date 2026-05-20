// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ILicenseManager {
    struct License {
        uint256 licenseId;
        uint256 agentId;
        address licensee;
        LicenseType licenseType;
        uint256 pricePerInvocation;
        uint256 subscriptionPrice;    // per month
        uint256 validUntil;
        uint256 invocationsUsed;
        uint256 maxInvocations;
        bool isActive;
    }

    enum LicenseType {
        PerInvocation,
        Subscription,
        Unlimited
    }

    struct RoyaltySplit {
        address creator;
        address platform;
        address infrastructure;
        uint16 creatorShare;       // basis points (7000 = 70%)
        uint16 platformShare;     // 1500 = 15%
        uint16 infrastructureShare; // 1500 = 15%
    }

    event LicenseCreated(uint256 indexed licenseId, uint256 indexed agentId, address indexed licensee);
    event LicenseRevoked(uint256 indexed licenseId);
    event RoyaltyDistributed(uint256 indexed agentId, uint256 amount);

    function createLicense(
        uint256 agentId,
        LicenseType licenseType,
        uint256 pricePerInvocation,
        uint256 subscriptionPrice,
        uint256 maxInvocations
    ) external payable returns (uint256);

    function revokeLicense(uint256 licenseId) external;
    function validateAndBill(uint256 licenseId) external payable returns (bool);
    function getLicense(uint256 licenseId) external view returns (License memory);
    function getUserLicenses(address user) external view returns (uint256[] memory);
    function getAgentRoyaltySplit(uint256 agentId) external view returns (RoyaltySplit memory);
}
