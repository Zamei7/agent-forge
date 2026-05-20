'use client';

import { useAppStore, Agent } from '@/lib/store';

// Mock data for demo
const MOCK_AGENTS: Agent[] = [
  {
    id: 1,
    name: 'CodeForge Pro',
    description: 'Full-stack code analysis and refactoring agent with automated PR generation.',
    category: 'Coding Assistant',
    creator: '0x1234...5678',
    rating: 4.8,
    invocations: 12400,
    pricePerCall: '0.002',
    capabilities: ['reasoning', 'multimodal'],
    isActive: true,
    metadataURI: 'ipfs://...',
  },
  {
    id: 2,
    name: 'ContentAlchemy',
    description: 'Multi-format content creation: blogs, social media, marketing copy.',
    category: 'Content Creator',
    creator: '0xabcd...efgh',
    rating: 4.6,
    invocations: 8900,
    pricePerCall: '0.001',
    capabilities: ['reasoning'],
    isActive: true,
    metadataURI: 'ipfs://...',
  },
  {
    id: 3,
    name: 'DataLens',
    description: 'Data analysis with visualization, predictions, and automated reporting.',
    category: 'Data Analyst',
    creator: '0x9876...5432',
    rating: 4.9,
    invocations: 15200,
    pricePerCall: '0.003',
    capabilities: ['reasoning', 'multimodal'],
    isActive: true,
    metadataURI: 'ipfs://...',
  },
  {
    id: 4,
    name: 'VoiceAssist Pro',
    description: 'Voice-enabled assistant with speech synthesis for hands-free workflows.',
    category: 'Voice Agent',
    creator: '0xaaaa...bbbb',
    rating: 4.5,
    invocations: 6700,
    pricePerCall: '0.0015',
    capabilities: ['reasoning', 'voice'],
    isActive: true,
    metadataURI: 'ipfs://...',
  },
  {
    id: 5,
    name: 'ResearchBot',
    description: 'Academic research assistant: paper discovery, literature review, citation management.',
    category: 'Research Agent',
    creator: '0xcccc...dddd',
    rating: 4.7,
    invocations: 9300,
    pricePerCall: '0.0025',
    capabilities: ['reasoning'],
    isActive: true,
    metadataURI: 'ipfs://...',
  },
  {
    id: 6,
    name: 'DesignVision',
    description: 'Visual design agent: generate mockups, analyze UI, create concept art.',
    category: 'Multimodal Agent',
    creator: '0xeeee...ffff',
    rating: 4.4,
    invocations: 5100,
    pricePerCall: '0.004',
    capabilities: ['reasoning', 'multimodal'],
    isActive: true,
    metadataURI: 'ipfs://...',
  },
];

interface AgentGridProps {
  category: string | null;
}

export function AgentGrid({ category }: AgentGridProps) {
  const filtered = category
    ? MOCK_AGENTS.filter((a) => a.category.toLowerCase().includes(category))
    : MOCK_AGENTS;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((agent) => (
        <div key={agent.id} className="agent-card group cursor-pointer">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-300 flex items-center justify-center text-black font-bold">
              {agent.name[0]}
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
              {agent.category}
            </span>
          </div>

          <h3 className="font-semibold mb-1 group-hover:text-sky-400 transition">
            {agent.name}
          </h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{agent.description}</p>

          <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
            <span>⭐ {agent.rating}</span>
            <span>·</span>
            <span>{agent.invocations.toLocaleString()} calls</span>
            <span>·</span>
            <span className="text-sky-400">{agent.pricePerCall} ETH</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {agent.capabilities.map((cap) => (
                <span key={cap} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-600">
                  {cap}
                </span>
              ))}
            </div>
            <button className="text-xs px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 transition opacity-0 group-hover:opacity-100">
              Deploy →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
