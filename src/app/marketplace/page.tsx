'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { CategoryFilter } from '@/components/marketplace/CategoryFilter';
import { AgentGrid } from '@/components/marketplace/AgentGrid';

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Agent <span className="text-gradient">Marketplace</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Discover and deploy AI agents powered by Xiaomi MiMo V2.5.
            Each agent is specialized, licensed, and rated by the community.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents by name, category, or capability..."
            className="w-full max-w-xl px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500 focus:outline-none transition"
          />
        </div>

        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <AgentGrid category={selectedCategory} />
      </div>
    </main>
  );
}
