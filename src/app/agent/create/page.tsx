'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';

const CATEGORIES = [
  'Coding Assistant',
  'Content Creator',
  'Data Analyst',
  'Research Agent',
  'Workflow Automation',
  'Voice Agent',
  'Multimodal Agent',
  'Custom',
];

const CAPABILITIES = [
  { id: 'reasoning', label: 'Reasoning', desc: 'Complex multi-step problem solving' },
  { id: 'multimodal', label: 'Multimodal', desc: 'Image understanding and generation' },
  { id: 'voice', label: 'Voice', desc: 'Speech synthesis and voice interface' },
];

export default function CreateAgentPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [category, setCategory] = useState('');
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [pricePerCall, setPricePerCall] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  const toggleCapability = (id: string) => {
    setCapabilities((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    // TODO: Connect to smart contract and register agent
    setTimeout(() => {
      setIsDeploying(false);
      alert('Agent registered! (Demo mode)');
    }, 2000);
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-2">
          Create <span className="text-gradient">New Agent</span>
        </h1>
        <p className="text-gray-400 mb-8">
          Define your agent&apos;s capabilities, set pricing, and deploy to the marketplace.
        </p>

        <div className="space-y-6">
          {/* Agent Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Agent Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., CodeForge Pro"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500 focus:outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does your agent do? What problems does it solve?"
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500 focus:outline-none transition resize-none"
            />
          </div>

          {/* System Prompt */}
          <div>
            <label className="block text-sm font-medium mb-2">System Prompt</label>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="You are a specialized coding assistant that..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500 focus:outline-none transition resize-none font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              This defines your agent&apos;s behavior. Be specific about its expertise and output format.
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500 focus:outline-none transition"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Capabilities */}
          <div>
            <label className="block text-sm font-medium mb-2">MiMo Capabilities</label>
            <div className="grid grid-cols-3 gap-3">
              {CAPABILITIES.map((cap) => (
                <button
                  key={cap.id}
                  onClick={() => toggleCapability(cap.id)}
                  className={`p-4 rounded-xl border text-left transition ${
                    capabilities.includes(cap.id)
                      ? 'border-sky-500 bg-sky-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="font-medium text-sm">{cap.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{cap.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm font-medium mb-2">Price per Invocation (ETH)</label>
            <input
              type="text"
              value={pricePerCall}
              onChange={(e) => setPricePerCall(e.target.value)}
              placeholder="0.001"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500 focus:outline-none transition"
            />
            <p className="text-xs text-gray-500 mt-1">
              You receive 70% of each invocation payment. Platform takes 15%, infrastructure 15%.
            </p>
          </div>

          {/* Deploy Button */}
          <button
            onClick={handleDeploy}
            disabled={isDeploying || !name || !description || !category}
            className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition font-semibold text-lg"
          >
            {isDeploying ? '⏳ Deploying...' : '🚀 Deploy Agent to Marketplace'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Requires wallet connection and 100 $FORGE minimum stake
          </p>
        </div>
      </div>
    </main>
  );
}
