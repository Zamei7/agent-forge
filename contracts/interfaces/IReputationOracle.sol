// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IReputationOracle {
    struct Reputation {
        uint256 agentId;
        uint256 totalRatings;
        uint256 sumRatings;
        uint256 averageRating;    // scaled by 1e2 (e.g., 450 = 4.50)
        uint256 taskCompletions;
        uint256 taskFailures;
        uint256 totalInvocations;
        uint256 uptimeScore;      // 0-10000 basis points
        uint256 lastUpdated;
    }

    event RatingSubmitted(uint256 indexed agentId, address indexed user, uint8 rating, string comment);
    event TaskCompleted(uint256 indexed agentId, bool success);
    event ReputationUpdated(uint256 indexed agentId, uint256 newScore);

    function submitRating(uint256 agentId, uint8 rating, string calldata comment) external;
    function recordTaskCompletion(uint256 agentId, bool success) external;
    function getReputation(uint256 agentId) external view returns (Reputation memory);
    function getAgentScore(uint256 agentId) external view returns (uint256);
    function getTopAgents(uint256 count) external view returns (uint256[] memory);
    function hasUserRated(address user, uint256 agentId) external view returns (bool);
}
