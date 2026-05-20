// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IPaymentRouter.sol";
import "./interfaces/ILicenseManager.sol";

/**
 * @title PaymentRouter
 * @notice Payment channel system for gas-efficient micropayments
 * @dev Users deposit funds, settle periodically to minimize on-chain transactions
 */
contract PaymentRouter is IPaymentRouter, Ownable, ReentrancyGuard {
    ILicenseManager public immutable licenseManager;

    uint256 private _nextChannelId = 1;
    uint256 public settlementThreshold = 0.01 ether;

    mapping(uint256 => PaymentChannel) private _channels;
    mapping(address => uint256[]) private _userChannels;
    mapping(uint256 => uint256) private _channelBalances; // channel -> balance available

    constructor(address _licenseManager) Ownable(msg.sender) {
        licenseManager = ILicenseManager(_licenseManager);
    }

    function openChannel(uint256 agentId) external payable nonReentrant returns (uint256) {
        require(msg.value > 0, "Must deposit funds");

        uint256 channelId = _nextChannelId++;

        PaymentChannel storage channel = _channels[channelId];
        channel.channelId = channelId;
        channel.user = msg.sender;
        channel.agentId = agentId;
        channel.totalDeposited = msg.value;
        channel.totalSpent = 0;
        channel.settledAt = block.timestamp;
        channel.isOpen = true;

        _channelBalances[channelId] = msg.value;
        _userChannels[msg.sender].push(channelId);

        emit ChannelOpened(channelId, msg.sender, agentId);
        emit FundsDeposited(channelId, msg.value);

        return channelId;
    }

    function closeChannel(uint256 channelId) external nonReentrant {
        PaymentChannel storage channel = _channels[channelId];
        require(channel.user == msg.sender, "Not channel owner");
        require(channel.isOpen, "Channel already closed");

        uint256 remaining = _channelBalances[channelId];
        channel.isOpen = false;

        if (remaining > 0) {
            _channelBalances[channelId] = 0;
            (bool success, ) = msg.sender.call{value: remaining}("");
            require(success, "Refund failed");
        }

        emit ChannelClosed(channelId);
    }

    function deposit(uint256 channelId) external payable nonReentrant {
        require(_channels[channelId].user == msg.sender, "Not channel owner");
        require(_channels[channelId].isOpen, "Channel closed");
        require(msg.value > 0, "Must deposit funds");

        _channels[channelId].totalDeposited += msg.value;
        _channelBalances[channelId] += msg.value;

        emit FundsDeposited(channelId, msg.value);
    }

    function settle(uint256 channelId, uint256 amount, bytes calldata signature)
        external
        nonReentrant
    {
        PaymentChannel storage channel = _channels[channelId];
        require(channel.isOpen, "Channel closed");
        require(amount > 0 && amount <= _channelBalances[channelId], "Invalid amount");

        // In production, verify the signature from the agent service
        // For MVP, we trust the caller (agent service backend)

        _channelBalances[channelId] -= amount;
        channel.totalSpent += amount;
        channel.settledAt = block.timestamp;

        // Route payment through LicenseManager for royalty distribution
        (bool success, ) = address(licenseManager).call{value: amount}("");
        require(success, "Settlement failed");

        emit PaymentSettled(channelId, amount);
    }

    function getChannel(uint256 channelId) external view returns (PaymentChannel memory) {
        return _channels[channelId];
    }

    function getUserChannels(address user) external view returns (uint256[] memory) {
        return _userChannels[user];
    }

    function getChannelBalance(uint256 channelId) external view returns (uint256) {
        return _channelBalances[channelId];
    }

    function setSettlementThreshold(uint256 newThreshold) external onlyOwner {
        settlementThreshold = newThreshold;
    }
}
