// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IReputationOracle.sol";
import "./interfaces/IAgentRegistry.sol";

/**
 * @title ReputationOracle
 * @notice Tracks agent reputation through ratings, task completions, and uptime
 * @dev Prevents double-rating and maintains on-chain trust scores
 */
contract ReputationOracle is IReputationOracle, Ownable {
    IAgentRegistry public immutable agentRegistry;

    mapping(uint256 => Reputation) private _reputations;
    mapping(address => mapping(uint256 => bool)) private _hasRated;
    mapping(uint256 => uint256[]) private _topAgents;

    event ReputationUpdated(uint256 indexed agentId, uint256 newScore);

    constructor(address _agentRegistry) Ownable(msg.sender) {
        agentRegistry = IAgentRegistry(_agentRegistry);
    }

    function submitRating(uint256 agentId, uint8 rating, string calldata comment)
        external
    {
        require(rating >= 1 && rating <= 5, "Rating must be 1-5");
        require(!_hasRated[msg.sender][agentId], "Already rated");

        // Verify agent exists
        agentRegistry.getAgent(agentId);

        _hasRated[msg.sender][agentId] = true;

        Reputation storage rep = _reputations[agentId];
        rep.agentId = agentId;
        rep.totalRatings++;
        rep.sumRatings += rating;
        rep.averageRating = (rep.sumRatings * 100) / rep.totalRatings; // e.g., 450 = 4.50
        rep.lastUpdated = block.timestamp;

        emit RatingSubmitted(agentId, msg.sender, rating, comment);
        emit ReputationUpdated(agentId, rep.averageRating);
    }

    function recordTaskCompletion(uint256 agentId, bool success) external {
        Reputation storage rep = _reputations[agentId];
        rep.totalInvocations++;

        if (success) {
            rep.taskCompletions++;
        } else {
            rep.taskFailures++;
        }

        // Update uptime score (basis points: 10000 = 100%)
        if (rep.totalInvocations > 0) {
            rep.uptimeScore = (rep.taskCompletions * 10000) / rep.totalInvocations;
        }

        rep.lastUpdated = block.timestamp;
        emit TaskCompleted(agentId, success);
    }

    function getReputation(uint256 agentId) external view returns (Reputation memory) {
        return _reputations[agentId];
    }

    function getAgentScore(uint256 agentId) external view returns (uint256) {
        Reputation memory rep = _reputations[agentId];

        if (rep.totalRatings == 0) return 0;

        // Weighted score: 60% average rating + 40% uptime
        uint256 ratingScore = rep.averageRating * 60; // max 30000
        uint256 uptimeWeight = rep.uptimeScore * 40 / 100; // max 40000 -> scaled to 400

        return (ratingScore + uptimeWeight) / 100; // 0-100 scale
    }

    function getTopAgents(uint256 count) external view returns (uint256[] memory) {
        uint256 total = agentRegistry.getTotalAgents();
        if (count > total) count = total;

        uint256[] memory result = new uint256[](count);
        uint256[] memory scores = new uint256[](total);
        uint256[] memory ids = new uint256[](total);

        // Collect all agents and scores
        for (uint256 i = 1; i <= total; i++) {
            ids[i - 1] = i;
            scores[i - 1] = getAgentScore(i);
        }

        // Simple selection sort for top N (fine for small counts)
        for (uint256 i = 0; i < count; i++) {
            uint256 maxIdx = i;
            for (uint256 j = i + 1; j < total; j++) {
                if (scores[j] > scores[maxIdx]) {
                    maxIdx = j;
                }
            }
            // Swap
            (scores[i], scores[maxIdx]) = (scores[maxIdx], scores[i]);
            (ids[i], ids[maxIdx]) = (ids[maxIdx], ids[i]);
            result[i] = ids[i];
        }

        return result;
    }

    function hasUserRated(address user, uint256 agentId) external view returns (bool) {
        return _hasRated[user][agentId];
    }
}
