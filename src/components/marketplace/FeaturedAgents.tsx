'use client';

const FEATURED = [
  {
    id: 1,
    name: 'CodeForge Pro',
    description: 'Full-stack code analysis and refactoring agent. Scans for tech debt, generates PRs, runs tests.',
    category: 'Coding Assistant',
    rating: 4.8,
    invocations: 12400,
    pricePerCall: '0.002',
    capabilities: ['reasoning', 'multimodal'],
    creator: '0x1234...5678',
  },
  {
    id: 2,
    name: 'ContentAlchemy',
    description: 'Multi-format content creation agent. Blog posts, social media, marketing copy, SEO optimization.',
    category: 'Content Creator',
    rating: 4.6,
    invocations: 8900,
    pricePerCall: '0.001',
    capabilities: ['reasoning'],
    creator: '0xabcd...efgh',
  },
  {
    id: 3,
    name: 'DataLens',
    description: 'Data analysis and visualization agent. Upload datasets, get insights, charts, and predictions.',
    category: 'Data Analyst',
    rating: 4.9,
    invocations: 15200,
    pricePerCall: '0.003',
    capabilities: ['reasoning', 'multimodal'],
    creator: '0x9876...5432',
  },
];

export function FeaturedAgents() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-8">
        🔥 Featured <span className="text-gradient">Agents</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {FEATURED.map((agent) => (
          <div key={agent.id} className="agent-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-300 flex items-center justify-center text-black font-bold text-lg">
                {agent.name[0]}
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-sky-500/20 text-sky-300">
                {agent.category}
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-2">{agent.name}</h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{agent.description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span>⭐ {agent.rating}</span>
              <span>📊 {agent.invocations.toLocaleString()} calls</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sky-400 font-semibold">{agent.pricePerCall} ETH/call</span>
              <button className="px-4 py-2 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 transition text-sm">
                Use Agent
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              {agent.capabilities.map((cap) => (
                <span key={cap} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-500">
                  {cap}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
