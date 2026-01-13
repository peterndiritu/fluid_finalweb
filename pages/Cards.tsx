import React from 'react';
import { CreditCard, Globe, Lock, Sliders, Smartphone, Wifi, Zap, RefreshCw, ShieldCheck, ShoppingBag, Layers } from 'lucide-react';

const FluidBrand = ({ className = "text-white" }: { className?: string }) => (
  <div className={`flex items-center gap-1.5 ${className}`}>
    <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="brandLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" fill="url(#brandLogoGradient)" />
        <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" fill="url(#brandLogoGradient)" />
    </svg>
    <span className="font-bold text-xl tracking-tighter italic">fluid</span>
  </div>
);

const CardsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 overflow-hidden">
      
      {/* Hero Section */}
      <section className="text-center mb-20 px-4 relative z-10">
        <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Fluid Card Ecosystem</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-6 leading-tight">
           One Wallet. <br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Two Realities.</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-16">
           Instantly generate virtual cards for secure online spending, or order the premium metal card for the physical world. Both synced to your non-custodial wallet.
        </p>

        {/* Dual Card Visual */}
        <div className="relative max-w-5xl mx-auto h-[500px] md:h-[400px] flex flex-col md:flex-row items-center justify-center gap-12 perspective-1000">
           
           {/* 1. The Virtual Card (Glass/Holographic) */}
           <div className="relative group w-full max-w-[340px] h-[214px] transition-all duration-500 hover:z-20 md:hover:scale-110">
                <div className="absolute inset-0 bg-cyan-500/30 blur-[60px] rounded-full group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative h-full w-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-500 group-hover:rotate-y-6 group-hover:rotate-x-6 overflow-hidden">
                    {/* Holographic Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cyan-500/10 opacity-50"></div>
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>

                    <div className="flex justify-between items-start z-10">
                        <span className="font-bold text-xl text-white tracking-tighter flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500"></div>
                           fluid <span className="text-[10px] uppercase font-normal text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded">Virtual</span>
                        </span>
                        <Wifi size={24} className="text-white/50 rotate-90" />
                    </div>

                    <div className="z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-7 rounded bg-gradient-to-r from-slate-200/20 to-slate-200/10 border border-white/20 flex items-center justify-center">
                                <div className="w-6 h-4 border border-white/30 rounded-sm flex items-center justify-center">
                                    <div className="w-4 h-2 border-t border-b border-white/30"></div>
                                </div>
                            </div>
                        </div>
                        <div className="font-mono text-xl text-white tracking-widest mb-3 text-shadow-sm">
                            •••• •••• •••• 8842
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <span className="text-[9px] text-cyan-200/70 uppercase block mb-0.5">Card Holder</span>
                                <span className="text-sm text-white font-bold tracking-wider">HOLDER'S NAME</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] text-white/50 font-bold mb-1">EXP 12/28</span>
                                <FluidBrand />
                            </div>
                        </div>
                    </div>
                </div>
           </div>

           {/* 2. The Physical Card (Metal/Dark) */}
           <div className="relative group w-full max-w-[340px] h-[214px] transition-all duration-500 hover:z-20 md:hover:scale-110 md:-ml-20 mt-[-80px] md:mt-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-black rounded-2xl"></div>
                
                <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-[#1a1b26] via-[#0f1016] to-black border border-slate-700 p-6 flex flex-col justify-between transform transition-transform duration-500 group-hover:rotate-y-[-6deg] group-hover:rotate-x-6 overflow-hidden">
                    
                    {/* Metal Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/5 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="flex justify-between items-start z-10">
                        <span className="font-bold text-xl text-white italic tracking-tighter">Fluid <span className="not-italic text-slate-500 text-xs">Metal</span></span>
                        <Wifi size={24} className="text-slate-600 rotate-90" />
                    </div>

                    <div className="z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-7 bg-amber-200/10 rounded border border-amber-500/30 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent"></div>
                                <div className="w-full h-px bg-amber-500/20 absolute top-1/2"></div>
                                <div className="h-full w-px bg-amber-500/20 absolute left-1/2"></div>
                            </div>
                        </div>
                        <div className="font-mono text-xl text-slate-300 tracking-widest mb-3">
                            •••• •••• •••• ••••
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <span className="text-[9px] text-slate-500 uppercase block mb-0.5">Card Holder</span>
                                <span className="text-sm text-slate-200 font-bold tracking-wider">HOLDER'S NAME</span>
                            </div>
                            <div className="text-white/80">
                                <FluidBrand />
                            </div>
                        </div>
                    </div>
                </div>
           </div>

        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Virtual Card Features */}
            <div className="col-span-1 lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 text-cyan-400">
                        <Zap size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Instant Virtual Cards</h2>
                    <p className="text-slate-400 mb-8 max-w-lg">
                        Create a card instantly and start spending in seconds. Perfect for online subscriptions, one-time purchases, or keeping your main card details private.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                            <h4 className="text-white font-bold flex items-center gap-2 mb-1">
                                <RefreshCw size={16} className="text-emerald-500" /> Disposable Mode
                            </h4>
                            <p className="text-xs text-slate-500">Card number regenerates after every purchase for max security.</p>
                        </div>
                        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                            <h4 className="text-white font-bold flex items-center gap-2 mb-1">
                                <Layers size={16} className="text-purple-500" /> Multi-Card Management
                            </h4>
                            <p className="text-xs text-slate-500">Create separate cards for subscriptions, travel, and shopping.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Physical Card Features */}
            <div className="bg-gradient-to-b from-slate-900 to-black border border-slate-800 rounded-3xl p-8 relative overflow-hidden group hover:border-slate-600 transition-colors">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-white">
                    <CreditCard size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Premium Metal</h2>
                <p className="text-slate-400 mb-6 text-sm">
                    18g stainless steel core. Contactless enabled. Designed for those who value craftsmanship and durability.
                </p>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400"><Wifi size={12}/></div>
                        Tap to Pay (NFC)
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-blue-400"><Globe size={12}/></div>
                        No FX Fees
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-purple-400"><ShieldCheck size={12}/></div>
                        Numberless Design
                    </li>
                </ul>
            </div>

            {/* Ecosystem Features */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-blue-500/30 transition-colors group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400">
                    <Smartphone size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Apple & Google Pay</h3>
                <p className="text-slate-400 text-sm">
                    Add both virtual and physical cards to your phone wallet instantly. Pay with a tap anywhere.
                </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/30 transition-colors group">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-400">
                    <ShoppingBag size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">3% Crypto Cashback</h3>
                <p className="text-slate-400 text-sm">
                    Earn rewards in FLUID, BTC, or ETH on every purchase. Staking FLUID increases your tier.
                </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-purple-500/30 transition-colors group">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-400">
                    <Sliders size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Smart Controls</h3>
                <p className="text-slate-400 text-sm">
                    Freeze cards, set monthly spending limits, and block specific merchant categories instantly.
                </p>
            </div>

         </div>
      </section>
      
      {/* CTA */}
      <section className="text-center">
          <button className="px-10 py-4 bg-white text-slate-900 font-bold rounded-full text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
             Get Your Card
          </button>
          <p className="mt-4 text-slate-500 text-xs">Available in EEA, UK, and US. KYC required for physical cards.</p>
      </section>

    </div>
  );
};

export default CardsPage;