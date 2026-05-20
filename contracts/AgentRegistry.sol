// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IAgentRegistry.sol";

/**
 * @title AgentRegistry
 * @notice On-chain registry for AI agents in the AgentForge marketplace
 * @dev Stores agent metadata, manages staking, and tracks invocations
 */
contract AgentRegistry is IAgentRegistry, Ownable, ReentrancyGuard {
    uint256 public minStakeAmount = 100 * 1e18; // 100 $FORGE minimum stake

    uint256 private _nextAgentId = 1;

    struct AgentStorage {
        uint256 id;
        address creator;
        string name;
        string description;
        string metadataURI;
        AgentCategory category;
        MiMoCapability[] capabilities;
        uint256 createdAt;
        uint256 updatedAt;
        bool isActive;
        uint256 stakeAmount;
        uint256 invocationCount;
    }

    mapping(uint256 => AgentStorage) private _agents;
    mapping(address => uint256[]) private _creatorAgents;
    mapping(AgentCategory => uint256[]) private _categoryAgents;

    modifier onlyAgentCreator(uint256 agentId) {
        require(_agents[agentId].creator == msg.sender, "Not agent creator");
        _;
    }

    function registerAgent(
        string calldata name,
        string calldata description,
        string calldata metadataURI,
        AgentCategory category,
        MiMoCapability[] calldata capabilities
    ) external payable nonReentrant returns (uint256) {
        require(msg.value >= minStakeAmount, "Insufficient stake");
        require(bytes(name).length > 0, "Name required");

        uint256 agentId = _nextAgentId++;

        AgentStorage storage agent = _agents[agentId];
        agent.id = agentId;
        agent.creator = msg.sender;
        agent.name = name;
        agent.description = description;
        agent.metadataURI = metadataURI;
        agent.category = category;
        agent.createdAt = block.timestamp;
        agent.updatedAt = block.timestamp;
        agent.isActive = true;
        agent.stakeAmount = msg.value;
        agent.invocationCount = 0;

        for (uint256 i = 0; i < capabilities.length; i++) {
            agent.capabilities.push(capabilities[i]);
        }

        _creatorAgents[msg.sender].push(agentId);
        _categoryAgents[category].push(agentId);

        emit AgentRegistered(agentId, msg.sender, name, category);
        return agentId;
    }

    function updateAgentMetadata(uint256 agentId, string calldata newMetadataURI)
        external
        onlyAgentCreator(agentId)
    {
        _agents[agentId].metadataURI = newMetadataURI;
        _agents[agentId].updatedAt = block.timestamp;
        emit AgentUpdated(agentId, newMetadataURI);
    }

    function deactivateAgent(uint256 agentId) external onlyAgentCreator(agentId) {
        _agents[agentId].isActive = false;
        emit AgentDeactivated(agentId);
    }

    function reactivateAgent(uint256 agentId) external onlyAgentCreator(agentId) {
        _agents[agentId].isActive = true;
        emit AgentReactivated(agentId);
    }

    function getAgent(uint256 agentId) external view returns (Agent memory) {
        AgentStorage storage s = _agents[agentId];
        require(s.id > 0, "Agent not found");

        return Agent({
            id: s.id,
            creator: s.creator,
            name: s.name,
            description: s.description,
            metadataURI: s.metadataURI,
            category: s.category,
            capabilities: s.capabilities,
            createdAt: s.createdAt,
            updatedAt: s.updatedAt,
            isActive: s.isActive,
            stakeAmount: s.stakeAmount,
            invocationCount: s.invocationCount
        });
    }

    function getAgentsByCreator(address creator) external view returns (uint256[] memory) {
        return _creatorAgents[creator];
    }

    function getAgentsByCategory(AgentCategory category) external view returns (uint256[] memory) {
        return _categoryAgents[category];
    }

    function getTotalAgents() external view returns (uint256) {
        return _nextAgentId - 1;
    }

    function incrementInvocationCount(uint256 agentId) external {
        _agents[agentId].invocationCount++;
    }

    function setMinStakeAmount(uint256 newAmount) external onlyOwner {
        minStakeAmount = newAmount;
    }
}
