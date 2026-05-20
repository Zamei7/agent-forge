'use client';

import Link from 'next/link';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function Navbar() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-300 flex items-center justify-center">
            <span className="text-black font-bold text-sm">AF</span>
          </div>
          <span className="text-xl font-bold">AgentForge</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/marketplace" className="text-sm text-gray-400 hover:text-white transition">
            Marketplace
          </Link>
          <Link href="/agent/create" className="text-sm text-gray-400 hover:text-white transition">
            Create Agent
          </Link>
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition">
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isConnected ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="text-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => connect({ connector: injected() })}
              className="text-sm px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition font-medium"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
