import React, { useState, useEffect } from 'react';
import { ArrowRight, Cpu, Server, ShieldCheck, Database, ArrowLeftRight, CreditCard, Zap, Globe, Activity, MapPin, Rocket } from 'lucide-react';
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
      title: "Hosting Protocol",
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
    <div className="flex flex-col bg-[#020617] relative">
      {/* Huge Background Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden opacity-[0.03]">
        <FluidLogo size={1200} className="transform -rotate-12 translate-x-1/4 scale-150" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden flex flex-col items-center justify-center min-h-[90vh] z-10">
        {/* Background Grid & Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-tech-grid opacity-20"></div>
          <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]"></div>
          <div className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center scroll-reveal reveal-up">
          {/* LIVE PRESALE Badge */}
          <div 
            onClick={() => onNavigate('presale')}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 mb-6 backdrop-blur-sm cursor-pointer hover:bg-[#10b981]/20 transition-all group"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[#10b981] text-[10px] font-black tracking-[0.4em] uppercase">Live Presale</span>
          </div>

          {/* Fluid Title */}
          <h1 className="text-[100px] md:text-[200px] font-black text-white tracking-[-0.06em] leading-[0.8] uppercase italic mb-4 select-none">
            Fluid
          </h1>
          
          {/* Main Tagline - Color Gradient Applied */}
          <div className="mb-4">
            <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 tracking-tighter italic uppercase leading-none">
              Store. Spend. Host.
            </h2>
          </div>

          {/* Secondary Tagline - Refined Color Gradient Applied */}
          <div className="mb-8">
            <p className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 uppercase tracking-widest italic">
              Infinitely & Eternally.
            </p>
          </div>

          {/* Detailed Paragraph */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
              The foundation for consensual computation—combining decentralized infrastructure, 
              private messaging, and a high-performance Layer-1 blockchain built for open, 
              serverless, and permissionless applications & a secure multichain non-custodial wallet.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button 
              onClick={() => onNavigate('presale')}
              className="px-12 py-5 bg-[#10b981] hover:bg-[#059669] text-[#020617] font-black rounded-xl text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 uppercase tracking-tighter"
             >
               Enter Presale <Rocket size={22} className="fill-current" />
             </button>
             <button 
              onClick={() => onNavigate('blockchain')}
              className="px-12 py-5 bg-[#111827] text-white border border-slate-700/50 font-black rounded-xl text-lg hover:bg-slate-800 transition-colors uppercase tracking-tighter"
             >
               Explore Tech
             </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-10 bg-[#020617] border-y border-white/5 backdrop-blur-sm z-10 scroll-reveal reveal-scale">
        <div className="max-w-6xl mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 items-center">
              <div className="text-center md:border-r md:border-white/5 py-4">
                 <div className="text-5xl font-black text-white mb-1 tracking-tighter">$1.00</div>
                 <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Initial Price</div>
              </div>
              <div className="text-center md:border-r md:border-white/5 py-4">
                 <div className="text-5xl font-black text-white mb-1 tracking-tighter">2.4M+</div>
                 <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">TPS Capacity</div>
              </div>
              <div className="text-center md:border-r md:border-white/5 py-4">
                 <div className="text-5xl font-black text-white mb-1 tracking-tighter">150+</div>
                 <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Global Nodes</div>
              </div>
              <div className="text-center py-4">
                 <div className="text-5xl font-black text-[#10b981] mb-1 tracking-tighter">72%</div>
                 <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Stage 1 Sold</div>
              </div>
           </div>
        </div>
      </section>

      {/* Hosting Section */}
      <section className="relative py-16 overflow-hidden bg-[#020617] z-10">
        <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal reveal-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Globe size={14} /> Globalised Hosting
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                Global Nodes. <br/>
                <span className="text-[#10b981]">Infinite Uptime.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-xl font-bold">
                Fluid's Hosting Protocol distributes your dApps across a decentralized mesh of institutional-grade nodes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 shadow-inner">
                  <div className="text-4xl font-mono font-black text-white mb-1 tracking-tighter">100%</div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Storage Redundancy</div>
                </div>
                <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 shadow-inner">
                  <div className="text-4xl font-mono font-black text-white mb-1 tracking-tighter">~0ms</div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">CDN Latency</div>
                </div>
              </div>
            </div>

            <div className="relative aspect-square md:aspect-video bg-[#0f172a]/20 rounded-[4rem] border border-white/5 overflow-hidden flex items-center justify-center group scroll-reveal reveal-right">
               <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
               <div className="relative w-full h-full p-8">
                  <div className="absolute top-[25%] left-[35%] animate-pulse">
                     <MapPin className="text-emerald-500" size={24} />
                     <div className="absolute top-0 left-0 w-6 h-6 bg-emerald-500/40 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute top-[45%] left-[65%] animate-pulse delay-700">
                     <MapPin className="text-blue-500" size={24} />
                     <div className="absolute top-0 left-0 w-6 h-6 bg-blue-500/40 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute bottom-[30%] left-[20%] animate-pulse delay-300">
                     <MapPin className="text-cyan-500" size={24} />
                     <div className="absolute top-0 left-0 w-6 h-6 bg-cyan-500/40 rounded-full animate-ping"></div>
                  </div>
                  
                  <div className="absolute bottom-6 right-6 p-6 bg-[#020617]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl min-w-[200px]">
                     <div className="flex items-center gap-3 mb-4">
                        <Activity className="text-emerald-400" size={16} />
                        <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Network Status</span>
                     </div>
                     <div className="space-y-4">
                        <div className="flex justify-between gap-8 text-[10px] font-black text-slate-500 uppercase">
                           <span>Active Nodes</span>
                           <span className="text-emerald-400">1,248</span>
                        </div>
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                           <div className="w-[92%] h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="relative py-12 bg-[#020617] z-10">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreComponents.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => onNavigate(item.link)}
                  className={`group p-8 bg-[#0f172a]/20 border border-white/5 rounded-[3rem] hover:border-blue-500/30 transition-all cursor-pointer relative overflow-hidden flex flex-col shadow-2xl scroll-reveal reveal-up delay-${(idx % 3) * 100}`}
                >
                   <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon size={28} />
                   </div>
                   <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2 uppercase italic tracking-tighter">
                      {item.title}
                      <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                   </h3>
                   <p className="text-slate-500 group-hover:text-slate-400 transition-colors leading-relaxed font-bold text-sm mb-8">
                      {item.desc}
                   </p>
                   <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-blue-400">
                      <span>Explore Protocol</span>
                      <FluidLogo size={16} className="opacity-10 group-hover:opacity-100" />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 overflow-hidden bg-[#0206