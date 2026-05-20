# 📝 AgentForge — Deskripsi untuk Form Apply MiMo 100T

## 🎯 Form Field 04: Project Description

**Copy-paste ini ke form:**

---

**Project: AgentForge — Decentralized AI Agent Marketplace**

**Core Pain Point:**
The AI agent ecosystem is fragmented and closed. Developers build specialized AI agents (coding assistants, content creators, data analysts) but have no unified platform to publish, share, and monetize them. Users who need domain-specific AI solutions must build from scratch or rely on generic tools that don't fit their workflow. There's no trustless mechanism for agent licensing, usage tracking, and fair revenue distribution between agent creators and infrastructure providers.

**Core Logic Flow & Architecture:**

AgentForge is a decentralized marketplace where developers create, publish, and monetize AI agents powered by Xiaomi MiMo V2.5 as the core reasoning engine. The platform leverages all three MiMo model capabilities:

1. **MiMo Reasoning Model (mimo-v2.5-pro)** — Powers the agent's core intelligence. Each agent on the marketplace is a specialized prompt architecture + tool integration layer that calls MiMo's reasoning API for complex multi-step tasks. Agents use long-chain reasoning for code analysis, document synthesis, and strategic planning.

2. **MiMo Multimodal Model (mimo-v2.5-vision)** — Enables agents to process and generate images, analyze visual data, and create multimedia content. Used by creative agents (design assistants, visual content creators) and analytical agents (data visualization, chart interpretation).

3. **MiMo Voice Synthesis Model (mimo-v2.5-tts)** — Provides voice interface capabilities for agents. Users can interact with agents via voice commands and receive audio responses. Used by accessibility-focused agents and hands-free workflow assistants.

**Multi-Agent Collaboration Protocol:**
The platform supports agent composition — users can chain multiple specialized agents into workflows. For example:
- A "Startup Launch Pipeline" workflow chains: Market Research Agent → Business Plan Agent → Pitch Deck Agent → Legal Document Agent
- Each agent in the chain is independently created, licensed, and rated
- MiMo's reasoning model handles data handoff and context preservation between agents

**Smart Contract Infrastructure (EVM-compatible):**
- **AgentRegistry.sol** — On-chain agent metadata, versioning, and creator identity. Requires 100 $FORGE stake to list (quality filter).
- **LicenseManager.sol** — Usage-based licensing with automatic royalty splitting (creator 70%, platform 15%, infrastructure 15%).
- **ReputationOracle.sol** — On-chain reputation scores based on user ratings, usage metrics, and task completion rates. Weighted scoring: 60% average rating + 40% uptime.
- **PaymentRouter.sol** — Payment channel system for gas-efficient micropayments. Deposit → Use → Settle pattern minimizes on-chain transactions.
- **ForgeToken.sol** — ERC20 governance token ($FORGE) with permit for gasless approvals. Total supply: 1B tokens.

**Token Economics:**
- $FORGE token governs the platform
- Staking mechanism: agent creators stake tokens to list agents (quality filter)
- Users pay per invocation or subscribe to agent bundles
- Governance: token holders vote on platform parameters, featured agents, and dispute resolution

**Current Status:**
- Full smart contract suite: ForgeToken, AgentRegistry, LicenseManager, ReputationOracle, PaymentRouter
- Contract test suite with Hardhat
- MiMo V2.5 API client with reasoning, multimodal, and voice support
- Frontend built on Next.js 14 with App Router, Tailwind CSS, wagmi/viem for Web3
- Marketplace UI with category filtering, agent grid, and featured agents
- Agent creator page with capability selection and pricing configuration
- API route for agent execution through MiMo
- Deployment scripts for local and Sepolia testnet
- Architecture documentation and README

**Why MiMo:**
MiMo V2.5 is the ideal backbone because it provides reasoning, multimodal, and voice capabilities in a single API platform — no need to stitch together multiple providers. The competitive pricing and high throughput make per-invocation micropayments economically viable, which is critical for a marketplace model. The three-model architecture (reasoning + multimodal + voice) enables a diverse agent ecosystem that no single-model provider can match.

---

*(~400 words — detailed, technical, shows real implementation)*

---

## 📎 Form Field 05: Proof Materials

### GitHub Link
Push the project ke GitHub: `github.com/yourusername/agentforge`

### Screenshots yang bisa di-upload:
1. **Architecture diagram** dari `docs/architecture.md`
2. **Terminal screenshot** deploy contracts pakai Hardhat
3. **Frontend screenshot** halaman marketplace
4. **Test results** dari `npx hardhat test`

### File yang perlu di-upload:
- Screenshot 1: Architecture diagram (copy dari README)
- Screenshot 2: Contract deployment log
- Screenshot 3: Marketplace UI

---

## 🔗 Links yang perlu disiapkan

1. **GitHub repo**: `github.com/yourusername/agentforge`
2. **MiMo API Platform**: https://platform.xiaomimimo.com/ (daftar dulu kalau belum)
3. **Email**: Pastikan email di form sama dengan email MiMo API Platform

---

## ⚡ Quick Checklist Sebelum Submit

- [ ] Push project ke GitHub
- [ ] Register di MiMo API Platform
- [ ] Screenshot architecture diagram
- [ ] Screenshot terminal (contract deployment)
- [ ] Screenshot frontend UI
- [ ] Copy deskripsi di atas ke form field 04
- [ ] Upload screenshots ke form field 05
- [ ] Submit form di https://100t.xiaomimimo.com/
