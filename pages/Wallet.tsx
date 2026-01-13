import React from 'react';
import { 
  Play, Apple, Box, ArrowUpRight, ArrowDownLeft, Repeat, Plus, 
  CreditCard, Lock, Eye, Settings, Globe, Server, 
  Search, Cloud, Wifi, ChevronRight, Activity, Smartphone,
  ShieldCheck, Zap, MoreHorizontal, Copy, RefreshCw
} from 'lucide-react';

const WalletPage: React.FC = () => {
  const FluidLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="walletLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" fill="url(#walletLogoGradient)" />
        <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" fill="url(#walletLogoGradient)" />
    </svg>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#0a0a16] text-white overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8 backdrop-blur-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 text-xs font-bold tracking-wide uppercase">V2.0 Public Beta</span>
         </div>

         <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            The Super App for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">Decentralized Living</span>
         </h1>
         <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Manage your entire digital life in one place. From high-frequency trading and fiat spending to deploying censorship-resistant websites.
         </p>
         
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="group flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Apple size={24} className="fill-current" />
                <div className="text-left leading-none">
                   <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Download on the</div>
                   <div className="text-lg">App Store</div>
                </div>
             </button>
             <button className="group flex items-center gap-3 bg-[#1e1e2e] text-white border border-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-[#2a2a3e] transition-all">
                <Play size={24} className="fill-current text-white" />
                <div className="text-left leading-none">
                   <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Get it on</div>
                   <div className="text-lg">Google Play</div>
                </div>
             </button>
         </div>
      </section>

      {/* Feature Showcase Grid (Phone Mockups) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 mb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              
              {/* Screen 1: Portfolio & Balance */}
              <div className="flex flex-col items-center group">
                 {/* Transparent Outer Holder with Border */}
                 <div className="relative w-[300px] h-[620px] rounded-[3rem] border-[8px] border-[#1a1b26]/50 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-4 backdrop-blur-sm">
                    {/* Dynamic Island / Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1b26] rounded-b-2xl z-20"></div>
                    
                    {/* UI Content - Keep opacity high for readability */}
                    <div className="w-full h-full pt-12 pb-8 px-6 flex flex-col relative bg-[#0f1016]/90">
                        
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                           <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold">JD</div>
                              <span className="text-sm font-bold text-slate-300">Account 1</span>
                              <ChevronRight size={14} className="text-slate-500" />
                           </div>
                           <Activity size={20} className="text-slate-400" />
                        </div>

                        {/* Balance */}
                        <div className="text-center mb-8">
                           <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Balance</span>
                           <h2 className="text-4xl font-bold text-white mt-2 mb-2">$146,092<span className="text-slate-500 text-2xl">.45</span></h2>
                           <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                              <ArrowUpRight size={12} /> +$1,240 (2.4%)
                           </div>
                        </div>

                        {/* Actions Row */}
                        <div className="flex justify-between gap-2 mb-10">
                           {[
                              { icon: ArrowUpRight, label: "Send" },
                              { icon: ArrowDownLeft, label: "Receive" },
                              { icon: RefreshCw, label: "Swap" },
                              { icon: Plus, label: "Buy" }
                           ].map((action, i) => (
                              <div key={i} className="flex flex-col items-center gap-2">
                                 <button className="w-12 h-12 rounded-full bg-[#252836] hover:bg-cyan-500 hover:text-black transition-colors flex items-center justify-center text-white border border-slate-700/50">
                                    <action.icon size={20} />
                                 </button>
                                 <span className="text-[10px] font-medium text-slate-400">{action.label}</span>
                              </div>
                           ))}
                        </div>

                        {/* Asset List */}
                        <div className="flex-1 space-y-4">
                           <h3 className="text-sm font-bold text-slate-500 mb-2">Assets</h3>
                           {[
                              { name: 'Fluid', symbol: 'FLD', amount: '45,000', price: '$45,000', color: 'text-cyan-400' },
                              { name: 'Ethereum', symbol: 'ETH', amount: '12.5', price: '$38,240', color: 'text-blue-400' },
                              { name: 'Tether', symbol: 'USDT', amount: '63,852', price: '$63,852', color: 'text-emerald-400' },
                           ].map((coin, i) => (
                              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#1c1e2b] border border-slate-800/50">
                                 <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold ${coin.color}`}>
                                       {coin.symbol[0]}
                                    </div>
                                    <div>
                                       <div className="font-bold text-sm">{coin.name}</div>
                                       <div className="text-xs text-slate-500">{coin.amount} {coin.symbol}</div>
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <div className="font-bold text-sm">{coin.price}</div>
                                    <div className="text-xs text-emerald-500">+1.2%</div>
                                 </div>
                              </div>
                           ))}
                        </div>

                        {/* Bottom Nav Mock */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-700 rounded-full"></div>
                    </div>
                 </div>
                 <h3 className="mt-8 text-xl font-bold text-white">Full Portfolio Control</h3>
                 <p className="mt-2 text-sm text-slate-400 text-center max-w-[250px]">Track all your assets across 10+ chains in one unified dashboard.</p>
              </div>

              {/* Screen 2: Swap / DEX */}
              <div className="flex flex-col items-center group">
                 <div className="relative w-[300px] h-[620px] rounded-[3rem] border-[8px] border-[#1a1b26]/50 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-4 delay-100 backdrop-blur-sm">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1b26] rounded-b-2xl z-20"></div>
                    
                    <div className="w-full h-full pt-12 pb-8 px-6 flex flex-col relative bg-[#0f1016]/90">
                        <div className="text-center mb-8">
                           <h2 className="text-lg font-bold text-white">Swap</h2>
                        </div>

                        <div className="relative flex-1">
                           {/* From Card */}
                           <div className="bg-[#1c1e2b] rounded-2xl p-4 border border-slate-800 mb-2">
                              <div className="flex justify-between text-xs text-slate-400 mb-2">
                                 <span>You pay</span>
                                 <span>Balance: 12.5 ETH</span>
                              </div>
                              <div className="flex justify-between items-center">
                                 <span className="text-3xl font-bold text-white">1.5</span>
                                 <button className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-slate-700">
                                    <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-bold">E</span>
                                    <span className="font-bold text-sm">ETH</span>
                                    <ChevronRight size={14} />
                                 </button>
                              </div>
                              <div className="text-xs text-slate-500 mt-1">~$4,592.50</div>
                           </div>

                           {/* Swap Icon */}
                           <div className="absolute left-1/2 top-[108px] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#1a1b26] rounded-xl border-4 border-[#0f1016] flex items-center justify-center text-cyan-400 z-10 shadow-lg">
                              <ArrowDownLeft size={20} />
                           </div>

                           {/* To Card */}
                           <div className="bg-[#1c1e2b] rounded-2xl p-4 border border-slate-800 mt-2 mb-6">
                              <div className="flex justify-between text-xs text-slate-400 mb-2">
                                 <span>You receive</span>
                                 <span>Balance: 0 FLD</span>
                              </div>
                              <div className="flex justify-between items-center">
                                 <span className="text-3xl font-bold text-cyan-400">4,592</span>
                                 <button className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-slate-700">
                                    <FluidLogo className="w-5 h-5" />
                                    <span className="font-bold text-sm">FLD</span>
                                    <ChevronRight size={14} />
                                 </button>
                              </div>
                              <div className="text-xs text-slate-500 mt-1">~$4,588.10 (-0.1% Slip)</div>
                           </div>

                           {/* Info */}
                           <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 space-y-2 mb-8">
                              <div className="flex justify-between text-xs">
                                 <span className="text-slate-400">Rate</span>
                                 <span className="text-white font-medium">1 ETH = 3,061 FLD</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                 <span className="text-slate-400">Network Fee</span>
                                 <span className="text-white font-medium flex items-center gap-1"><Zap size={10} className="text-yellow-500"/> $1.50</span>
                              </div>
                           </div>

                           <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/20">
                              Confirm Swap
                           </button>
                        </div>
                    </div>
                 </div>
                 <h3 className="mt-8 text-xl font-bold text-white">Instant DEX Swaps</h3>
                 <p className="mt-2 text-sm text-slate-400 text-center max-w-[250px]">Swap tokens instantly at the best rates with zero hidden fees.</p>
              </div>

              {/* Screen 3: Fluid Pay / Card */}
              <div className="flex flex-col items-center group">
                 <div className="relative w-[300px] h-[620px] rounded-[3rem] border-[8px] border-[#1a1b26]/50 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-4 delay-200 backdrop-blur-sm">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1b26] rounded-b-2xl z-20"></div>
                    
                    <div className="w-full h-full pt-12 pb-8 px-6 flex flex-col relative bg-[#0f1016]/90">
                        <div className="flex justify-between items-center mb-6">
                           <h2 className="text-lg font-bold text-white">Fluid Card</h2>
                           <Plus size={20} className="text-cyan-400" />
                        </div>

                        {/* Visual Card */}
                        <div className="relative w-full aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-5 shadow-2xl border-t border-white/10 mb-8 overflow-hidden">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl -mr-8 -mt-8"></div>
                           <div className="flex justify-between items-start mb-6 relative z-10">
                              <FluidLogo className="w-8 h-8" />
                              <span className="text-white/80 font-bold italic">Debit</span>
                           </div>
                           <div className="text-white/90 font-mono text-lg tracking-widest mb-4 relative z-10">
                              •••• •••• •••• ••••
                           </div>
                           <div className="flex justify-between items-end relative z-10">
                              <div>
                                 <div className="text-[8px] text-white/50 uppercase">Card Holder</div>
                                 <div className="text-sm font-bold text-white">ALEX FLUID</div>
                              </div>
                              <div className="w-10 h-6 bg-white/20 rounded-sm"></div>
                           </div>
                        </div>

                        {/* Card Controls */}
                        <div className="grid grid-cols-4 gap-2 mb-8">
                           <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-2xl bg-[#1c1e2b] flex items-center justify-center text-cyan-400 border border-slate-800">
                                 <Lock size={20} />
                              </div>
                              <span className="text-[10px] text-slate-400">Freeze</span>
                           </div>
                           <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-2xl bg-[#1c1e2b] flex items-center justify-center text-slate-300 border border-slate-800">
                                 <Eye size={20} />
                              </div>
                              <span className="text-[10px] text-slate-400">Details</span>
                           </div>
                           <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-2xl bg-[#1c1e2b] flex items-center justify-center text-slate-300 border border-slate-800">
                                 <Settings size={20} />
                              </div>
                              <span className="text-[10px] text-slate-400">Settings</span>
                           </div>
                           <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-2xl bg-[#1c1e2b] flex items-center justify-center text-slate-300 border border-slate-800">
                                 <MoreHorizontal size={20} />
                              </div>
                              <span className="text-[10px] text-slate-400">More</span>
                           </div>
                        </div>

                        {/* Spending Limit */}
                        <div className="bg-[#1c1e2b] p-4 rounded-xl border border-slate-800 mb-6">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-slate-300">Monthly Limit</span>
                              <span className="text-xs text-cyan-400">$2,400 / $5,000</span>
                           </div>
                           <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full w-[48%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                           </div>
                        </div>

                        {/* Recent Tx */}
                        <div className="flex-1">
                           <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase">Recent Activity</h4>
                           <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs">A</div>
                                 <div>
                                    <div className="text-sm font-bold text-white">Apple Store</div>
                                    <div className="text-[10px] text-slate-500">Today, 10:23 AM</div>
                                 </div>
                              </div>
                              <span className="text-sm font-bold text-white">-$1,299.00</span>
                           </div>
                        </div>

                    </div>
                 </div>
                 <h3 className="mt-8 text-xl font-bold text-white">Virtual & Physical Cards</h3>
                 <p className="mt-2 text-sm text-slate-400 text-center max-w-[250px]">Freeze cards, view details, and manage spending limits instantly.</p>
              </div>

              {/* Screen 4: Hosting & Domains */}
              <div className="flex flex-col items-center group">
                 <div className="relative w-[300px] h-[620px] rounded-[3rem] border-[8px] border-[#1a1b26]/50 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-4 delay-300 backdrop-blur-sm">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1b26] rounded-b-2xl z-20"></div>
                    
                    <div className="w-full h-full pt-12 pb-8 px-6 flex flex-col relative bg-[#0f1016]/90">
                        <div className="flex justify-between items-center mb-6">
                           <h2 className="text-lg font-bold text-white">Parmaweb</h2>
                           <Server size={20} className="text-orange-400" />
                        </div>

                        {/* Domain Search */}
                        <div className="relative mb-8">
                           <input type="text" placeholder="Find your .fluid domain" className="w-full bg-[#1c1e2b] border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500" />
                           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        </div>

                        {/* My Domains */}
                        <div className="mb-8">
                           <h3 className="text-xs font-bold text-slate-500 mb-3 uppercase">My Domains</h3>
                           <div className="bg-[#1c1e2b] p-4 rounded-xl border border-slate-800 flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                                    <Globe size={16} />
                                 </div>
                                 <div>
                                    <div className="text-sm font-bold text-white">alex.fluid</div>
                                    <div className="text-[10px] text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active</div>
                                 </div>
                              </div>
                              <button className="text-slate-400 hover:text-white"><Settings size={16} /></button>
                           </div>
                        </div>

                        {/* Hosting Status */}
                        <div className="flex-1">
                           <h3 className="text-xs font-bold text-slate-500 mb-3 uppercase">Static Hosting</h3>
                           <div className="bg-[#1c1e2b] p-4 rounded-xl border border-slate-800 mb-4">
                              <div className="flex justify-between items-start mb-4">
                                 <div>
                                    <div className="text-sm font-bold text-white">defi-app-v2</div>
                                    <div className="text-[10px] text-slate-500">ipfs://QmXy...8z9</div>
                                 </div>
                                 <div className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Online</div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2 text-center">
                                 <div className="bg-black/20 rounded p-2">
                                    <div className="text-[10px] text-slate-500">Bandwidth</div>
                                    <div className="text-xs font-bold text-white">24 GB</div>
                                 </div>
                                 <div className="bg-black/20 rounded p-2">
                                    <div className="text-[10px] text-slate-500">Visitors</div>
                                    <div className="text-xs font-bold text-white">1.2k</div>
                                 </div>
                                 <div className="bg-black/20 rounded p-2">
                                    <div className="text-[10px] text-slate-500">Storage</div>
                                    <div className="text-xs font-bold text-white">120 MB</div>
                                 </div>
                              </div>
                           </div>

                           <button className="w-full py-3 border border-dashed border-slate-700 text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-center gap-2">
                              <Cloud size={16} /> Deploy New Site
                           </button>
                        </div>
                    </div>
                 </div>
                 <h3 className="mt-8 text-xl font-bold text-white">Web3 Hosting & Domains</h3>
                 <p className="mt-2 text-sm text-slate-400 text-center max-w-[250px]">Purchase decentralized domains and deploy censorship-resistant websites.</p>
              </div>

          </div>
      </section>

      {/* Feature Breakdown Sections */}
      <section className="max-w-7xl mx-auto px-4 py-20 border-t border-slate-800/50">
         <div className="grid md:grid-cols-3 gap-12">
            
            <div className="space-y-4">
               <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-4">
                  <ShieldCheck size={24} />
               </div>
               <h3 className="text-2xl font-bold text-white">Non-Custodial Security</h3>
               <p className="text-slate-400 leading-relaxed">
                  You are the only one with access to your funds. Your private keys are encrypted on your device and never shared with our servers.
               </p>
            </div>

            <div className="space-y-4">
               <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4">
                  <Zap size={24} />
               </div>
               <h3 className="text-2xl font-bold text-white">Lightning Fast</h3>
               <p className="text-slate-400 leading-relaxed">
                  Built on Fluid Chain's high-performance architecture, transactions confirm in milliseconds, not minutes.
               </p>
            </div>

            <div className="space-y-4">
               <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 mb-4">
                  <Globe size={24} />
               </div>
               <h3 className="text-2xl font-bold text-white">Truly Decentralized</h3>
               <p className="text-slate-400 leading-relaxed">
                  Access DApps directly from the browser. Host content permanently on Parmaweb without fear of takedowns.
               </p>
            </div>

         </div>
      </section>

    </div>
  );
};

export default WalletPage;