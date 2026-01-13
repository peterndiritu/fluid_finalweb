import React from 'react';
import { Zap, Shield, Layers, Code2, Globe, Cpu, CheckCircle, Wifi, Terminal, Database, ArrowRight, Activity, Clock, BarChart3, Binary, Network } from 'lucide-react';

const BlockchainPage: React.FC = () => {
  const innovations = [
    {
      title: "Dynamic Sharding",
      desc: "The network automatically partitions into shards based on load, allowing for linear scalability and consistent performance.",
      icon: Layers,
      color: "text-blue-400"
    },
    {
      title: "EVM Compatibility",
      desc: "Deploy existing Ethereum smart contracts instantly with no code changes required. Full support for Solidity and Vyper.",
      icon: Code2,
      color: "text-purple-400"
    },
    {
      title: "Proof of Fluidity",
      desc: "A novel consensus mechanism combining Proof-of-Stake with Proof-of-History for sub-second validation.",
      icon: Shield,
      color: "text-emerald-400"
    },
    {
      title: "Parallel Execution",
      desc: "Transactions are processed in parallel, utilizing multi-core architectures for maximum network throughput.",
      icon: Cpu,
      color: "text-cyan-400"
    },
    {
      title: "Global State Sync",
      desc: "Advanced gossip protocols ensure the global state is synchronized across all 150+ nodes in milliseconds.",
      icon: RefreshCwIcon,
      color: "text-indigo-400"
    },
    {
      title: "Native Oracles",
      desc: "Built-in oracle services provide reliable real-world data feeds directly to smart contracts without third-party fees.",
      icon: Database,
      color: "text-amber-400"
    }
  ];

  const comparisonData = [
    { metric: "Throughput (TPS)", fluid: "2,000,000+", eth: "~30", solana: "~65,000" },
    { metric: "Finality", fluid: "~600ms", eth: "~12 min", solana: "~400ms" },
    { metric: "Avg. Fee", fluid: "$0.0001", eth: "$5.00+", solana: "$0.0002" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16">
      {/* Hero Section */}
      <section className="text-center px-4 mb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[150px]"></div>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <Activity size={16} className="text-blue-400 animate-pulse" />
            <span className="text-blue-400 font-bold uppercase tracking-wider text-xs">Layer-1 under Development</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-6 tracking-tighter leading-none">
            The backbone of the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">New internet</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-medium">
            Fluid Chain is a high-performance Layer-1 blockchain designed for infinite scalability, sub-second finality, and zero-downtime decentralized hosting.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-10 py-5 bg-white text-slate-950 font-bold rounded-2xl text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Start building
            </button>
            <button className="px-10 py-5 bg-slate-900 text-white border border-slate-800 font-bold rounded-2xl text-lg hover:bg-slate-800 transition-all">
              Read whitepaper
            </button>
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-3xl group hover:border-blue-500/30 transition-all">
            <div className="text-4xl font-mono font-extrabold text-white mb-1 group-hover:text-blue-400 transition-colors">2M+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">TPS capacity</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-3xl group hover:border-cyan-500/30 transition-all">
            <div className="text-4xl font-mono font-extrabold text-white mb-1 group-hover:text-cyan-400 transition-colors">~600ms</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Time to finality</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-3xl group hover:border-emerald-500/30 transition-all">
            <div className="text-4xl font-mono font-extrabold text-white mb-1 group-hover:text-emerald-400 transition-colors">$0.0001</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Avg fee</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-3xl group hover:border-indigo-500/30 transition-all">
            <div className="text-4xl font-mono font-extrabold text-white mb-1 group-hover:text-indigo-400 transition-colors">150+</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global nodes</div>
          </div>
        </div>
      </section>

      {/* Technical Innovations */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">Technical innovations</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Pushing the boundaries of decentralized computing architecture.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {innovations.map((item, idx) => (
            <div key={idx} className="p-10 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] hover:border-blue-500/20 transition-all group">
              <div className={`w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform shadow-inner`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Comparison */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
        <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-8 md:p-16 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <BarChart3 size={200} />
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4">Performance comparison</h2>
            <p className="text-slate-400">How Fluid Chain stacks up against industry standards.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">
                  <th className="py-6 px-4">Metric</th>
                  <th className="py-6 px-4 text-white">Fluid Chain</th>
                  <th className="py-6 px-4">Ethereum</th>
                  <th className="py-6 px-4">Solana</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-800/50 group hover:bg-white/5 transition-colors">
                    <td className="py-8 px-4 font-bold text-slate-400">{row.metric}</td>
                    <td className="py-8 px-4 font-mono font-extrabold text-blue-400 text-lg">{row.fluid}</td>
                    <td className="py-8 px-4 font-mono text-slate-500">{row.eth}</td>
                    <td className="py-8 px-4 font-mono text-slate-500">{row.solana}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center px-4 relative">
        <div className="max-w-5xl mx-auto py-24 px-8 bg-gradient-to-br from-blue-600/10 to-emerald-500/10 border border-white/5 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Terminal size={120} />
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to build the future?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of developers building the next generation of decentralized applications on Fluid Chain.
          </p>
          <button className="px-10 py-4 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center gap-3 mx-auto">
            Developer documentation <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

// Helper for the missing icon in the list
const RefreshCwIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

export default BlockchainPage;