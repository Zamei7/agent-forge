'use client';

const STEPS = [
  {
    step: '01',
    title: 'Create Your Agent',
    description: 'Define your agent's purpose, system prompt, and MiMo capabilities. Configure reasoning, multimodal, or voice features.',
    icon: '🛠️',
  },
  {
    step: '02',
    title: 'List on Marketplace',
    description: 'Set your pricing model — per-invocation, subscription, or unlimited. Stake $FORGE tokens to list.',
    icon: '🏪',
  },
  {
    step: '03',
    title: 'Users Deploy & Use',
    description: 'Users discover your agent, purchase licenses, and invoke it through the API or web interface.',
    icon: '🚀',
  },
  {
    step: '04',
    title: 'Earn Revenue',
    description: 'Receive 70% of every invocation payment automatically via smart contract. Track earnings on-chain.',
    icon: '💰',
  },
];

export function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-4">
        How <span className="text-gradient">AgentForge</span> Works
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
        From creation to monetization in four simple steps
      </p>

      <div className="grid md:grid-cols-4 gap-8">
        {STEPS.map((step) => (
          <div key={step.step} className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto mb-4 flex items-center justify-center text-3xl">
              {step.icon}
            </div>
            <div className="text-sm text-sky-400 font-mono mb-2">STEP {step.step}</div>
            <h3 className="font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
