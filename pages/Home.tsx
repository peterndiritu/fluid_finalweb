
import React, { useState, useEffect } from 'react';
import { ArrowRight, Cpu, Server, ShieldCheck, Database, ArrowLeftRight, CreditCard, Zap, Layers } from 'lucide-react';
import FluidAssistant from '../components/FluidAssistant';
import FluidLogo from '../components/FluidLogo';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [totalDistributed, setTotalDistributed] = useState(1248590);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalDistributed(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const coreComponents = [
    {
      title: "Fluid Chain (L1)",
      desc: "Institutional Layer-1 engineered for the permanent web. Sub-second finality with 2M+ TPS capacity.",
      icon: Cpu,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      link: "blockchain"
    },
    {
      title: "Parmaweb Protocol",
      desc: "Permanent web hosting. Pay once in $Fluid to host dApps eternally with 100% uptime.",
      icon: Server,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      link: "host"
    },
    {
      title: "Fluid Super-App",
      desc: "Non-custodial, multi-chain gateway. Encrypted locally, spendable globally.",
      icon: ShieldCheck,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      link: "wallet"
    },
    {
      title: "$Fluid Token",
      desc: "The deflationary fuel. Required for storage, gas, and real-time revenue sharing.",
      icon: Database,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      link: "token"
    },
    {
      title: "Native Fluid DEX",
      desc: "Zero-slippage institutional liquidity. Gasless trading for $Fluid stakers.",
      icon: ArrowLeftRight,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      link: "dex"
    },
    {
      title: "Fluid Metal Cards",
      desc: "Bridging digital wealth. 18g stainless steel with 3% crypto cashback.",
      icon: CreditCard,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      link: "cards"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <button 
            onClick={() => onNavigate('buy')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 border border-slate-700/50 mb-8 backdrop-blur-sm hover:bg-slate-800/50 transition-colors group"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Infrastructure Presale Live</span>
            <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-8 tracking-tighter leading-[0.9]">
            The Fluid <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-emerald-400 to-cyan-500">Ecosystem</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium">
            Scaling the future of finance with institutional-grade Layer-1 blockchain infrastructure and permanent web hosting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button 
              onClick={() => onNavigate('buy')}
              className="px-12 py-5 bg-white text-slate-950 font-bold rounded-2xl text-lg hover:scale-105 transition-transform shadow-2xl flex items-center justify-center gap-2"
             >
               Buy $Fluid <ArrowRight size={20} />
             </button>
             <button 
              onClick={() => onNavigate('blockchain')}
              className="px-12 py-5 bg-slate-900 text-white border border-slate-800 font-bold rounded-2xl text-lg hover:bg-slate-800 transition-colors"
             >
               Learn More
             </button>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 bg-slate-950/50 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreComponents.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => onNavigate(item.link)}
                  className="group p-10 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] hover:border-blue-500/30 transition-all cursor-pointer relative overflow-hidden flex flex-col shadow-xl"
                >
                   <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-8 ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon size={28} />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      {item.title}
                      <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                   </h3>
                   <p className="text-slate-500 group-hover:text-slate-400 transition-colors leading-relaxed font-medium mb-8">
                      {item.desc}
                   </p>
                   <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-600 group-hover:text-blue-400">
                      <span>Explore</span>
                      <FluidLogo size={16} className="opacity-20 group-hover:opacity-100" />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* AI Assistant */}
      <FluidAssistant />

      {/* Stats Footer */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">Institutional-Grade Security</h2>
              <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">40% Revenue Redistribution to Holders</p>
           </div>
           <div className="flex flex-col items-center md:items-end">
              <div className="text-4xl font-mono font-extrabold text-emerald-400">
                 ${totalDistributed.toLocaleString()}
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Revenue Shared with Community</div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
