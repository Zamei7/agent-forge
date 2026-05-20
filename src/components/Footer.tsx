'use client';

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-300 flex items-center justify-center">
                <span className="text-black font-bold text-sm">AF</span>
              </div>
              <span className="text-lg font-bold">AgentForge</span>
            </div>
            <p className="text-sm text-gray-500">
              Decentralized AI Agent Marketplace<br />
              Powered by Xiaomi MiMo V2.5
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/marketplace" className="hover:text-white transition">Marketplace</a></li>
              <li><a href="/agent/create" className="hover:text-white transition">Create Agent</a></li>
              <li><a href="/dashboard" className="hover:text-white transition">Dashboard</a></li>
              <li><a href="/docs" className="hover:text-white transition">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://platform.xiaomimimo.com" className="hover:text-white transition">MiMo API Platform</a></li>
              <li><a href="https://mimo.xiaomi.com" className="hover:text-white transition">Xiaomi MiMo</a></li>
              <li><a href="#" className="hover:text-white transition">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition">Discord</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Token</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>$FORGE Governance</li>
              <li>Staking</li>
              <li>Royalty Distribution</li>
              <li>Whitepaper</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 text-center text-sm text-gray-500">
          © 2026 AgentForge. Built with ❤️ for the AI agent ecosystem.
        </div>
      </div>
    </footer>
  );
}
