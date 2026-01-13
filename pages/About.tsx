import React from 'react';
import HowItWorks from '../components/HowItWorks';
import { Shield, Rocket, Target, Globe, Heart, Zap, Infinity as InfinityIcon, ArrowRight } from 'lucide-react';

const AboutPage: React.FC = () => {
  const visionGoals = [
    {
      icon: Globe,
      title: "Universal Access",
      desc: "Democratizing institutional-grade financial tools for anyone with a smartphone, regardless of geographic or economic status.",
      color: "text-blue-400"
    },
    {
      icon: InfinityIcon,
      title: "Web Perpetuity",
      desc: "Creating a permanent digital record for human knowledge through the Hosting Protocol, ensuring information survives beyond centralized entities.",
      color: "text-emerald-400"
    },
    {
      icon: Zap,
      title: "Frictionless Economy",
      desc: "Eliminating the latency and high costs of legacy finance through sub-second L1 settlement and native liquidity sharding.",
      color: "text-cyan-400"
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-950">
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-20 relative">
         <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
         <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm">Our Mission</span>
         <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-4 mb-8 tracking-tighter">Fluid Ecosystem</h1>
         <div className="prose dark:prose-invert max-w-none text-slate-400 text-lg leading-relaxed">
            <p className="mb-6">
               At Fluid, we're driven by a simple yet powerful mission: to empower individuals by making cryptocurrency accessible, secure, and intuitive. Our journey began with the belief that managing digital assets shouldn't be complex or intimidating.
            </p>
            <p>
               Fluid was founded by a team of blockchain enthusiasts, developers, and security experts with years of experience in the crypto and web3 industry. We've seen the challenges users face: fragmented tools, confusing interfaces, and security risks. We created Fluid to set a new standard for convenience and trust.
            </p>
         </div>
      </section>

      {/* Vision & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
         <h2 className="text-3xl font-bold text-center text-white mb-12">Core Principles</h2>
         
         <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-emerald-500/50 transition-all group backdrop-blur-sm">
               <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 text-emerald-500 group-hover:scale-110 transition-transform">
                  <Shield size={32} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-4">Security</h3>
               <p className="text-slate-400 leading-relaxed">
                  Your assets deserve uncompromising protection. Fluid Wallet is built with advanced encryption and a non-custodial design to ensure your private keys remain yours alone.
               </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-cyan-500/50 transition-all group backdrop-blur-sm">
               <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 text-cyan-500 group-hover:scale-110 transition-transform">
                  <Rocket size={32} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-4">Innovation</h3>
               <p className="text-slate-400 leading-relaxed">
                  The crypto space evolves rapidly, and so do we. From our existing tools to exceptional upcoming features, we are always working to push the boundaries of what's possible.
               </p>
            </div>
         </div>
      </section>

      {/* NEW: Vision Statement Section */}
      <section className="relative py-24 mb-32 overflow-hidden border-y border-white/5 bg-slate-900/20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/5 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <Target size={16} className="text-blue-400" />
              <span className="text-slate-300 font-bold uppercase tracking-wider text-xs">Long-Term Vision</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tighter max-w-4xl mx-auto leading-tight">
              To be the universal liquidity layer for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">digital future.</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              We envision a world where every asset is fluid, every website is permanent, and every individual has sovereign control over their financial destiny through decentralized infrastructure.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {visionGoals.map((goal, idx) => (
              <div key={idx} className="bg-slate-950/50 border border-slate-800 p-10 rounded-[3rem] shadow-2xl relative group overflow-hidden transition-all hover:border-white/20">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 ${goal.color} bg-white/5 group-hover:scale-110 transition-transform`}>
                  <goal.icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{goal.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">
                  {goal.desc}
                </p>
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] group-hover:text-blue-400 transition-colors">
                  Protocol Impact <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 bg-gradient-to-br from-blue-600/10 to-emerald-500/10 rounded-[3rem] p-12 border border-white/10 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-tech-grid opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative z-10">
              <Heart className="mx-auto text-pink-500 mb-6 animate-pulse" size={40} />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Beyond the Code</h3>
              <p className="text-slate-400 max-w-2xl mx-auto mb-8 font-medium">
                Fluid isn't just a set of tools; it's a movement towards a more equitable and permanent web. We are building for the next century, creating the digital commons that will support generations of global citizens.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-6 py-2 rounded-full bg-black/40 border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  100% Non-Custodial
                </div>
                <div className="px-6 py-2 rounded-full bg-black/40 border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Open Source Foundation
                </div>
                <div className="px-6 py-2 rounded-full bg-black/40 border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Carbon Neutral Network
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section (Formerly HowItWorks) */}
      <section id="technology">
         <div className="text-center mb-12">
            <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Our Stack</span>
            <h2 className="text-4xl font-extrabold text-white mt-2">Architecture</h2>
         </div>
         <HowItWorks />
      </section>

    </div>
  );
};

export default AboutPage;