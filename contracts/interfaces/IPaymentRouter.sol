// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IPaymentRouter {
    struct PaymentChannel {
        uint256 channelId;
        address user;
        uint256 agentId;
        uint256 totalDeposited;
        uint256 totalSpent;
        uint256 settledAt;
        bool isOpen;
    }

    event ChannelOpened(uint256 indexed channelId, address indexed user, uint256 indexed agentId);
    event ChannelClosed(uint256 indexed channelId);
    event PaymentSettled(uint256 indexed channelId, uint256 amount);
    event FundsDeposited(uint256 indexed channelId, uint256 amount);

    function openChannel(uint256 agentId) external payable returns (uint256);
    function closeChannel(uint256 channelId) external;
    function deposit(uint256 channelId) external payable;
    function settle(uint256 channelId, uint256 amount, bytes calldata signature) external;
    function getChannel(uint256 channelId) external view returns (PaymentChannel memory);
    function getUserChannels(address user) external view returns (uint256[] memory);
}
