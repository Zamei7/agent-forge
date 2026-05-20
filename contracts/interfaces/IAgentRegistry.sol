// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IAgentRegistry {
    struct Agent {
        uint256 id;
        address creator;
        string name;
        string description;
        string metadataURI;       // IPFS CID for extended metadata
        AgentCategory category;
        MiMoCapability[] capabilities;
        uint256 createdAt;
        uint256 updatedAt;
        bool isActive;
        uint256 stakeAmount;
        uint256 invocationCount;
    }

    enum AgentCategory {
        CodingAssistant,
        ContentCreator,
        DataAnalyst,
        ResearchAgent,
        WorkflowAutomation,
        VoiceAgent,
        MultimodalAgent,
        Custom
    }

    enum MiMoCapability {
        Reasoning,
        Multimodal,
        Voice,
        All
    }

    event AgentRegistered(
        uint256 indexed agentId,
        address indexed creator,
        string name,
        AgentCategory category
    );

    event AgentUpdated(uint256 indexed agentId, string newMetadataURI);
    event AgentDeactivated(uint256 indexed agentId);
    event AgentReactivated(uint256 indexed agentId);

    function registerAgent(
        string calldata name,
        string calldata description,
        string calldata metadataURI,
        AgentCategory category,
        MiMoCapability[] calldata capabilities
    ) external payable returns (uint256);

    function updateAgentMetadata(uint256 agentId, string calldata newMetadataURI) external;
    function deactivateAgent(uint256 agentId) external;
    function reactivateAgent(uint256 agentId) external;
    function getAgent(uint256 agentId) external view returns (Agent memory);
    function getAgentsByCreator(address creator) external view returns (uint256[] memory);
    function getAgentsByCategory(AgentCategory category) external view returns (uint256[] memory);
    function getTotalAgents() external view returns (uint256);
    function incrementInvocationCount(uint256 agentId) external;
}
