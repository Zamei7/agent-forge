# AgentForge Architecture Deep Dive

## System Overview

AgentForge is a decentralized marketplace for AI agents, powered by Xiaomi MiMo V2.5 as the core reasoning engine. The platform enables developers to create, publish, license, and monetize specialized AI agents.

## Core Components

### 1. AI Layer — MiMo V2.5 Integration

The AI layer interfaces with three MiMo model endpoints:

**Reasoning Model (mimo-v2.5-pro)**
- Primary intelligence for all agents
- Handles complex multi-step reasoning tasks
- Supports long-chain inference for code analysis, document synthesis, strategic planning
- Context window supports extended conversations

**Multimodal Model (mimo-v2.5-vision)**
- Image understanding and analysis
- Visual content generation
- Used by creative and analytical agents
- Supports image-to-text and text-to-image workflows

**Voice Synthesis (mimo-v2.5-tts)**
- Text-to-speech conversion
- Multiple voice profiles
- Used by accessibility and hands-free agents
- Supports multiple languages

### 2. Smart Contract Layer

**AgentRegistry**
- Stores agent metadata on-chain
- Requires staking to list (quality filter)
- Tracks invocations per agent
- Categories: Coding, Content, Data, Research, Workflow, Voice, Multimodal

**LicenseManager**
- Three license types: Per-Invocation, Subscription, Unlimited
- Automatic royalty distribution on payment
- Revenue split: 70% creator / 15% platform / 15% infrastructure

**ReputationOracle**
- On-chain reputation scoring
- Prevents double-rating
- Weighted score: 60% average rating + 40% uptime
- Enables trustless agent discovery

**PaymentRouter**
- Payment channels for gas efficiency
- Deposit → Use → Settle pattern
- Minimizes on-chain transactions for micropayments

### 3. Frontend Layer

**Next.js App Router**
- Server-side rendering for SEO
- Client-side interactivity for Web3 features
- Responsive design with Tailwind CSS

**Web3 Integration**
- wagmi/viem for contract interactions
- RainbowKit for wallet connection
- Real-time event listening

## Data Flow

```
User Request
    │
    ▼
┌──────────────┐
│ Frontend     │ ──▶ Wallet signs transaction
│ (Next.js)    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Smart        │ ──▶ License validation
│ Contract     │ ──▶ Payment processing
│ Layer        │ ──▶ Royalty distribution
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ MiMo API     │ ──▶ Model selection based on agent capabilities
│ Client       │ ──▶ Request execution
│              │ ──▶ Response streaming
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Response     │ ──▶ Update invocation count
│ Processing   │ ──▶ Record task completion
│              │ ──▶ Return to user
└──────────────┘
```

## Security Considerations

1. **Stake-based Quality**: Agents require $FORGE stake to list, deterring spam
2. **One Rating Per User**: Prevents manipulation of reputation scores
3. **Payment Channels**: Off-chain transactions with on-chain settlement
4. **License Validation**: Smart contract enforces license validity before execution
5. **Reentrancy Guards**: All payment functions protected against reentrancy attacks

## Future Enhancements

1. **Multi-Agent Workflows**: Chain agents into complex pipelines
2. **IPFS Metadata**: Store extended agent configs on IPFS
3. **DAO Governance**: Community-driven platform parameter updates
4. **Cross-chain**: Expand to L2s for lower gas costs
5. **Agent Templates**: Pre-built templates for common agent types
