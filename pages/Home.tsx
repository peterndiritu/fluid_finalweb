
import React, { useState, useEffect } from 'react';
import { ArrowRight, Cpu, Server, ShieldCheck, Database, ArrowLeftRight, CreditCard, Zap, Globe, Activity, MapPin } from 'lucide-react';
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
               Explore Tech
             </button>
          </div>
        </div>
      </section>

      {/* Infrastructure Visualization */}
      <section className="py-24 relative overflow-hidden bg-slate-950 border-y border-white/5">
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-card">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Globe size={14} /> Globalised Hosting Infrastructure
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
                Global Nodes. <br/>
                <span className="text-emerald-400 underline decoration-emerald-500/30">Infinite Uptime.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Fluid's Parmaweb protocol distributes your dApps across a decentralized mesh of institutional-grade nodes. No single point of failure, no centralized hosting risks.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <div className="text-3xl font-mono font-bold text-white mb-1">100%</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Storage Redundancy</div>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <div className="text-3xl font-mono font-bold text-white mb-1">~0ms</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CDN Latency</div>
                </div>
              </div>
            </div>

            {/* Map/Mesh Visualization */}
            <div className="relative aspect-square md:aspect-video bg-slate-900/40 rounded-[3rem] border border-white/10 overflow-hidden flex items-center justify-center group scroll-card">
               <div className="absolute inset-0 bg-tech-grid opacity-30"></div>
               <div className="relative w-full h-full p-12">
                  <div className="absolute top-[20%] left-[30%] animate-pulse">
                     <MapPin className="text-emerald-500" size={24} />
                     <div className="absolute top-0 left-0 w-6 h-6 bg-emerald-500/40 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute top-[50%] left-[70%] animate-pulse delay-700">
                     <MapPin className="text-blue-500" size={24} />
                     <div className="absolute top-0 left-0 w-6 h-6 bg-blue-500/40 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute bottom-[25%] left-[15%] animate-pulse delay-300">
                     <MapPin className="text-cyan-500" size={24} />
                     <div className="absolute top-0 left-0 w-6 h-6 bg-cyan-500/40 rounded-full animate-ping"></div>
                  </div>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="32%" y1="24%" x2="72%" y2="54%" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="opacity-20" />
                    <line x1="17%" y1="78%" x2="32%" y2="24%" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="opacity-20" />
                  </svg>
                  <div className="absolute bottom-8 right-8 p-6 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                     <div className="flex items-center gap-3 mb-4">
                        <Activity className="text-emerald-400" size={16} />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Node Network Health</span>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between gap-8 text-[10px] font-bold text-slate-500 uppercase">
                           <span>Active Nodes</span>
                           <span className="text-emerald-400">1,248</span>
                        </div>
                        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                           <div className="w-[92%] h-full bg-emerald-500"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 bg-slate-950/50 relative">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreComponents.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => onNavigate(item.link)}
                  className="group p-10 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] hover:border-blue-500/30 transition-all cursor-pointer relative overflow-hidden flex flex-col shadow-xl scroll-card"
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
