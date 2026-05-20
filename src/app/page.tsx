'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedAgents } from '@/components/marketplace/FeaturedAgents';
import { CategoryFilter } from '@/components/marketplace/CategoryFilter';
import { AgentGrid } from '@/components/marketplace/AgentGrid';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className="relative">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <Navbar />
      <Hero />
      <FeaturedAgents />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            Browse <span className="text-gradient">Agents</span>
          </h2>
        </div>
        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <AgentGrid category={selectedCategory} />
      </section>

      <HowItWorks />
      <Footer />
    </main>
  );
}
