// Auto-generated ABIs — run `npx hardhat compile` then update
// For now, using minimal ABIs for essential functions

export const AgentRegistryABI = [
  'function registerAgent(string name, string description, string metadataURI, uint8 category, uint8[] capabilities) payable returns (uint256)',
  'function getAgent(uint256 agentId) view returns (tuple(uint256 id, address creator, string name, string description, string metadataURI, uint8 category, uint8[] capabilities, uint256 createdAt, uint256 updatedAt, bool isActive, uint256 stakeAmount, uint256 invocationCount))',
  'function getAgentsByCreator(address creator) view returns (uint256[])',
  'function getAgentsByCategory(uint8 category) view returns (uint256[])',
  'function getTotalAgents() view returns (uint256)',
  'function deactivateAgent(uint256 agentId)',
  'function reactivateAgent(uint256 agentId)',
  'function updateAgentMetadata(uint256 agentId, string newMetadataURI)',
  'event AgentRegistered(uint256 indexed agentId, address indexed creator, string name, uint8 category)',
] as const;

export const LicenseManagerABI = [
  'function createLicense(uint256 agentId, uint8 licenseType, uint256 pricePerInvocation, uint256 subscriptionPrice, uint256 maxInvocations) payable returns (uint256)',
  'function validateAndBill(uint256 licenseId) payable returns (bool)',
  'function revokeLicense(uint256 licenseId)',
  'function getLicense(uint256 licenseId) view returns (tuple(uint256 licenseId, uint256 agentId, address licensee, uint8 licenseType, uint256 pricePerInvocation, uint256 subscriptionPrice, uint256 validUntil, uint256 invocationsUsed, uint256 maxInvocations, bool isActive))',
  'function getUserLicenses(address user) view returns (uint256[])',
] as const;

export const ReputationOracleABI = [
  'function submitRating(uint256 agentId, uint8 rating, string comment)',
  'function getReputation(uint256 agentId) view returns (tuple(uint256 agentId, uint256 totalRatings, uint256 sumRatings, uint256 averageRating, uint256 taskCompletions, uint256 taskFailures, uint256 totalInvocations, uint256 uptimeScore, uint256 lastUpdated))',
  'function getAgentScore(uint256 agentId) view returns (uint256)',
  'function getTopAgents(uint256 count) view returns (uint256[])',
  'function hasUserRated(address user, uint256 agentId) view returns (bool)',
] as const;

export const PaymentRouterABI = [
  'function openChannel(uint256 agentId) payable returns (uint256)',
  'function closeChannel(uint256 channelId)',
  'function deposit(uint256 channelId) payable',
  'function getChannel(uint256 channelId) view returns (tuple(uint256 channelId, address user, uint256 agentId, uint256 totalDeposited, uint256 totalSpent, uint256 settledAt, bool isOpen))',
  'function getUserChannels(address user) view returns (uint256[])',
] as const;

export const ForgeTokenABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
] as const;
