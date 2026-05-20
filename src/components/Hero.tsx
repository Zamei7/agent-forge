'use client';

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-sm text-sky-300">Powered by Xiaomi MiMo V2.5</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Create, Share &<br />
          <span className="text-gradient">Monetize AI Agents</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          The decentralized marketplace for AI agents. Build specialized agents
          powered by MiMo reasoning, multimodal, and voice capabilities.
          License them, earn from every invocation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/marketplace"
            className="px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-600 transition font-semibold text-lg"
          >
            Explore Agents
          </a>
          <a
            href="/agent/create"
            className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition font-semibold text-lg"
          >
            Create an Agent
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-3xl font-bold text-gradient">3</div>
            <div className="text-sm text-gray-500 mt-1">MiMo Models</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gradient">∞</div>
            <div className="text-sm text-gray-500 mt-1">Agent Types</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gradient">70%</div>
            <div className="text-sm text-gray-500 mt-1">Creator Revenue</div>
          </div>
        </div>
      </div>
    </section>
  );
}
