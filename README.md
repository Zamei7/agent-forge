# 🛠️ AgentForge — Decentralized AI Agent Marketplace - Build by kurazame7@gmail.com

> Create, share, and monetize AI agents powered by Xiaomi MiMo V2.5

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                       │
│  ┌──────────┐ ┌──────────────┐ ┌────────────┐ ┌─────────────┐ │
│  │ Navbar   │ │ Marketplace  │ │ Agent      │ │ Dashboard   │ │
│  │          │ │ (Browse/     │ │ Creator    │ │ (Analytics/ │ │
│  │          │ │  Search/     │ │ (Config/   │ │  Earnings/  │ │
│  │          │ │  Filter)     │ │  Deploy)   │ │  Licenses)  │ │
│  └──────────┘ └──────────────┘ └────────────┘ └─────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                     WEB3 LAYER (wagmi/viem)                     │
│  ┌──────────┐ ┌──────────────┐ ┌────────────┐ ┌─────────────┐ │
│  │ Wallet   │ │ Contract     │ │ Transaction│ │ Event       │ │
│  │ Connect  │ │ Read/Write   │ │ Management │ │ Listening   │ │
│  └──────────┘ └──────────────┘ └────────────┘ └─────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                   SMART CONTRACTS (EVM)                         │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │  $FORGE Token   │    │ AgentRegistry   │                    │
│  │  (ERC20)        │    │ • register      │                    │
│  │  • governance   │    │ • update        │                    │
│  │  • staking      │    │ • deactivate    │                    │
│  │  • payments     │    │ • invocation++  │                    │
│  └─────────────────┘    └────────┬────────┘                    │
│                                  │                              │
│  ┌─────────────────┐    ┌───────┴─────────┐                    │
│  │ PaymentRouter   │    │ LicenseManager  │                    │
│  │ • channels      │───▶│ • create        │                    │
│  │ • micropayments │    │ • validate/bill │                    │
│  │ • settlement    │    │ • royalty split │                    │
│  └─────────────────┘    └────────┬────────┘                    │
│                                  │                              │
│  ┌─────────────────┐    ┌───────┴─────────┐                    │
│  │ (Future)        │    │ ReputationOracle│                    │
│  │ AgentWorkflow   │    │ • ratings       │                    │
│  │ • composition   │    │ • task tracking │                    │
│  │ • chaining      │    │ • uptime score  │                    │
│  └─────────────────┘    └─────────────────┘                    │
├─────────────────────────────────────────────────────────────────┤
│                    AI LAYER (MiMo V2.5 API)                     │
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │  Reasoning   │ │  Multimodal  │ │    Voice     │            │
│  │  Model       │ │  Model       │ │  Synthesis   │            │
│  │              │ │              │ │              │            │
│  │ • code       │ │ • image      │ │ • text-to-   │            │
│  │ • analysis   │ │   analysis   │ │   speech     │            │
│  │ • planning   │ │ • generation │ │ • voice      │            │
│  │ • reasoning  │ │ • visual QA  │ │   interface  │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

## 🔑 Smart Contracts

### ForgeToken.sol
- ERC20 governance token ($FORGE)
- Total supply: 1B tokens
- Used for staking, payments, and governance
- ERC20Permit for gasless approvals

### AgentRegistry.sol
- On-chain agent metadata storage
- Creator staking mechanism (100 $FORGE minimum)
- Category and capability tracking
- Invocation counting

### LicenseManager.sol
- Per-invocation, subscription, and unlimited license types
- Automatic royalty splitting (70% creator / 15% platform / 15% infrastructure)
- License validation and billing

### ReputationOracle.sol
- User ratings (1-5 stars, one per user per agent)
- Task completion tracking
- Uptime scoring
- Top agents leaderboard

### PaymentRouter.sol
- Payment channels for gas-efficient micropayments
- Deposit → use → settle pattern
- Periodic on-chain settlement

## 🤖 MiMo V2.5 Integration

| Capability | Model | Use Case |
|-----------|-------|----------|
| Reasoning | mimo-v2.5-pro | Code analysis, planning, multi-step tasks |
| Multimodal | mimo-v2.5-vision | Image understanding, visual content creation |
| Voice | mimo-v2.5-tts | Speech synthesis, voice-enabled agents |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MetaMask or any Web3 wallet
- Xiaomi MiMo API key (get from platform.xiaomimimo.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/zamei7/agentforge.git
cd agentforge

# Install dependencies
npm install

# Copy env file
cp .env.example .env.local

# Add your MiMo API key to .env.local
```

### Development

```bash
# Start local blockchain
npx hardhat node

# Deploy contracts (in another terminal)
npm run deploy:local

# Start frontend
npm run dev
```

### Testing

```bash
npm run test
```

## 📁 Project Structure

```
agentforge/
├── contracts/                    # Solidity smart contracts
│   ├── interfaces/               # Contract interfaces
│   │   ├── IAgentRegistry.sol
│   │   ├── ILicenseManager.sol
│   │   ├── IReputationOracle.sol
│   │   └── IPaymentRouter.sol
│   ├── ForgeToken.sol            # $FORGE ERC20 token
│   ├── AgentRegistry.sol         # Agent registration & management
│   ├── LicenseManager.sol        # Licensing & royalty distribution
│   ├── ReputationOracle.sol      # Ratings & trust scoring
│   └── PaymentRouter.sol         # Payment channels
├── src/
│   ├── app/                      # Next.js app router
│   │   ├── api/agent/            # Agent execution API
│   │   ├── agent/create/         # Create agent page
│   │   ├── marketplace/          # Browse agents
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/               # React components
│   │   ├── marketplace/
│   │   │   ├── AgentGrid.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   └── FeaturedAgents.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   └── Footer.tsx
│   └── lib/                      # Shared utilities
│       ├── ai/
│       │   └── mimo-client.ts    # MiMo V2.5 API client
│       ├── contracts/
│       │   ├── abis.ts           # Contract ABIs
│       │   └── addresses.ts      # Deployed addresses
│       └── store.ts              # Zustand state management
├── scripts/
│   └── deploy.js                 # Contract deployment script
├── test/
│   └── AgentForge.test.js        # Contract tests
├── docs/
│   └── architecture.md           # Architecture documentation
├── hardhat.config.js
├── package.json
└── README.md
```

## 💰 Tokenomics

| Allocation | Amount | Percentage |
|-----------|--------|------------|
| Staking Rewards | 300M $FORGE | 30% |
| Ecosystem Fund | 250M $FORGE | 25% |
| Team (vested) | 200M $FORGE | 20% |
| Public Sale | 150M $FORGE | 15% |
| Liquidity | 100M $FORGE | 10% |

## 📜 License

MIT License — see LICENSE file for details.

---

**Built for the Xiaomi MiMo Orbit 100T Creator Incentive Program** 🚀
