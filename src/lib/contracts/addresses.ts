// Contract addresses — update after deployment
export const CONTRACT_ADDRESSES = {
  // Localhost (hardhat)
  31337: {
    ForgeToken: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    AgentRegistry: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    LicenseManager: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    ReputationOracle: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    PaymentRouter: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
  },
  // Sepolia testnet
  11155111: {
    ForgeToken: '0x0000000000000000000000000000000000000000',
    AgentRegistry: '0x0000000000000000000000000000000000000000',
    LicenseManager: '0x0000000000000000000000000000000000000000',
    ReputationOracle: '0x0000000000000000000000000000000000000000',
    PaymentRouter: '0x0000000000000000000000000000000000000000',
  },
} as const;

export type ContractName = keyof typeof CONTRACT_ADDRESSES[31337];
