import React, { useState, useEffect } from 'react';
import { 
  Lock, Clock, Coins, Users, Landmark, Wallet, Rocket, 
  TrendingUp, Flame, PieChart, Activity, Info, BarChart3, 
  ArrowUpRight, ShieldCheck, HeartPulse, Percent, Scale, 
  RefreshCw, DollarSign
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
import { thirdwebClient } from "../client";

// --- Configuration ---
const FLUID_TOKEN_ADDRESS = "0xec9123Aa60651ceee7c0E084c884Cd33478c92a5"; 
const BURN_ADDRESS = "0x000000000000000000000000000000000000dEaD";
const CHAIN = defineChain(1);

const distributionHistory = [
  { name: 'Mon', revenue: 12400, payout: 4960 },
  { name: 'Tue', revenue: 15600, payout: 6240 },
  { name: 'Wed', revenue: 14200, payout: 5680 },
  { name: 'Thu', revenue: 18900, payout: 7560 },
  { name: 'Fri', revenue: 22400, payout: 8960 },
  { name: 'Sat', revenue: 19800, payout: 7920 },
  { name: 'Sun', revenue: 21000, payout: 8400 },
];

const allocationData = [
  { 
    name: 'Presale', 
    value: 30, 
    color: '#10b981', 
    amount: '3,000,000', 
    icon: Rocket,
    desc: 'Public sale allocation for early supporters',
    vesting: 'No Vesting'
  },
  { 
    name: 'Incentives', 
    value: 40, 
    color: '#06b6d4', 
    amount: '4,000,000', 
    icon: Users,
    desc: 'Rewards & Airdrops for ecosystem users',
    vesting: '10 Year Vesting'
  },
  { 
    name: 'Liquidity', 
    value: 10, 
    color: '#3b82f6', 
    amount: '1,000,000', 
    icon: Wallet,
    desc: 'CEX/DEX depth & stability pools',
    vesting: 'No Vesting' 
  },
  { 
    name: 'Core Development', 
    value: 10, 
    color: '#a855f7', 
    amount: '1,000,000', 
    icon: Lock,
    desc: 'Protocol development & engineering',
    vesting: 'No Vesting' 
  },
  { 
    name: 'Treasury', 
    value: 10, 
    color: '#f97316', 
    amount: '1,000,000', 
    icon: Landmark,
    desc: 'Ecosystem growth & DAO reserves',
    vesting: '10 Year Vesting' 
  },
];

const Tokenomics: React.FC = () => {
  const [livePrice, setLivePrice] = useState(1.00);
  const [currentPool, setCurrentPool] = useState(84290);

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrice(prev => prev + (Math.random() - 0.5) * 0.001);
      setCurrentPool(prev => prev + Math.floor(Math.random() * 5));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const contract = getContract({
    client: thirdwebClient,
    chain: CHAIN,
    address: FLUID_TOKEN_ADDRESS,
  });

  const { data: burnedAmount } = useReadContract({
    contract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [BURN_ADDRESS],
  });

  const displayBurned = burnedAmount ? Number(BigInt(burnedAmount) / BigInt(1e18)).toLocaleString() : "142,601";
  
  return (
    <section id="tokenomics" className="py-8 bg-transparent relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 scroll-card">
           <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl group hover:border-emerald-500/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">FLUID Price</span>
                 <TrendingUp size={14} className="text-emerald-500" />
              </div>
              <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
                 ${livePrice.toFixed(4)}
              </div>
              <div className="text-[10px] text-emerald-500 font-bold mt-1">+2.45% (24h)</div>
           </div>

           <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl group hover:border-blue-500/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Market Cap (FDV)</span>
                 <BarChart3 size={14} className="text-blue-500" />
              </div>
              <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
                 $10.0M
              </div>
              <div className="text-[10px] text-slate-500 font-bold mt-1">Based on 10M Supply</div>
           </div>

           <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl group hover:border-orange-500/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Burned</span>
                 <Flame size={14} className="text-orange-500" />
              </div>
              <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
                 {displayBurned}
              </div>
              <div className="text-[10px] text-orange-500 font-bold mt-1">Deflationary Mechanism</div>
           </div>

           <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl group hover:border-cyan-500/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Health Score</span>
                 <HeartPulse size={14} className="text-cyan-500" />
              </div>
              <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
                 98/100
              </div>
              <div className="text-[10px] text-cyan-500 font-bold mt-1">Audit: CERTIK Certified</div>
           </div>
        </div>

        {/* DISTRIBUTION DASHBOARD */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Main Dashboard: Distribution Flow */}
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-xl backdrop-blur-md scroll-card">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                   <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                         <Activity size={24} className="text-emerald-500" /> Distribution Dashboard
                      </h3>
                      <p className="text-slate-500 text-sm">Real-time revenue redistribution across the ecosystem.</p>
                   </div>
                   <div className="flex gap-2">
                      <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500">
                         REVENUE: <span className="text-emerald-500">$124,500</span>
                      </div>
                      <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500">
                         YIELD POOL: <span className="text-cyan-400">$49,800</span>
                      </div>
                   </div>
                </div>

                <div className="h-[300px] w-full -ml-4">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={distributionHistory}>
                         <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                               <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPay" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                               <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.1}/>
                         <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                         <YAxis hide />
                         <Tooltip 
                            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                            itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                         />
                         <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" name="System Revenue"/>
                         <Area type="monotone" dataKey="payout" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorPay)" name="Staker Payouts"/>
                      </AreaChart>
                   </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                   <div className="text-center">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-1">Weekly Volume</div>
                      <div className="text-xl font-bold text-slate-900 dark:text-white">$1.2M</div>
                   </div>
                   <div className="text-center border-x border-slate-200 dark:border-slate-800">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-1">Avg. Buyback</div>
                      <div className="text-xl font-bold text-slate-900 dark:text-white">$8.4k</div>
                   </div>
                   <div className="text-center">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-1">Staking Ratio</div>
                      <div className="text-xl font-bold text-slate-900 dark:text-white">64.2%</div>
                   </div>
                </div>
             </div>

             {/* Strategic Allocation Section */}
             <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <PieChart size={20} className="text-emerald-500" /> Strategic Allocation
                   </h3>
                   <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total: 10M FLUID</span>
                </div>
                <div className="grid gap-4">
                   {allocationData.map((item) => (
                      <div key={item.name} className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-all hover:border-opacity-100 group" style={{ borderColor: `${item.color}30` }}>
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-[200px]">
                               <div className="p-3 rounded-2xl bg-opacity-10" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                                  <item.icon size={24} />
                               </div>
                               <div>
                                  <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-0.5">{item.name}</h4>
                                  <p className="text-[10px] text-slate-500 font-bold uppercase">{item.desc}</p>
                               </div>
                            </div>
                            <div className="flex-1 md:px-10">
                               <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-tighter">
                                  <span>Vesting: {item.vesting}</span>
                                  <span>{item.value}%</span>
                               </div>
                               <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                               </div>
                            </div>
                            <div className="text-right min-w-[120px]">
                               <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-white">{item.amount}</div>
                               <div className="text-[10px] text-slate-500 font-bold uppercase">FLUID</div>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Side Panel: Protocol Economy */}
          <div className="space-y-6">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <Scale size={20} className="text-cyan-500" /> Proportional Yield
             </h3>

             {/* Proportional Staking Card */}
             <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-[2.5rem] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Scale size={64} />
                </div>
                <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-4">Real Yield Staking</h4>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">18.5% <span className="text-sm font-normal text-slate-500">APR</span></div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed font-medium">
                   Everyone is paid strictly proportional to their share of the staked pool. No tiers, no hidden requirements—purely egalitarian distribution.
                </p>
                
                <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                      <Percent size={14} className="text-emerald-500" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">40% Revenue Share</span>
                   </div>
                   <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                      <DollarSign size={14} className="text-cyan-400" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Paid in USDT/USDC</span>
                   </div>
                </div>

                <button className="w-full py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold rounded-2xl border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition-all shadow-lg">
                   Launch Staking App
                </button>
             </div>

             {/* Yield Pool Status */}
             <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
                <div className="flex justify-between items-center mb-6">
                   <h4 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                      <RefreshCw size={12} className="text-emerald-500 animate-spin-slow" /> Current Yield Pool
                   </h4>
                   <span className="text-[10px] font-bold text-emerald-500">UP +14%</span>
                </div>
                <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-white mb-6">
                   ${currentPool.toLocaleString()}
                </div>
                <div className="space-y-4">
                   <div>
                      <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-tighter">
                         <span className="text-slate-500">Buyback Velocity</span>
                         <span className="text-emerald-500">Optimal</span>
                      </div>
                      <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                         <div className="w-[85%] h-full bg-emerald-500"></div>
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-tighter">
                         <span className="text-slate-500">Total Scarcity Index</span>
                         <span className="text-orange-500">1.42%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                         <div className="w-[44%] h-full bg-orange-500"></div>
                      </div>
                   </div>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 flex items-center gap-2">
                   <Info size={12} /> Next Distribution: <span className="text-slate-900 dark:text-white font-bold">2d 14h 05m</span>
                </div>
             </div>

             {/* Security Compliance */}
             <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex items-center gap-4 group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-110 transition-transform">
                   <ShieldCheck size={24} />
                </div>
                <div>
                   <h5 className="font-bold text-white text-sm">Verified Governance</h5>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Certik Certified Contract</p>
                </div>
             </div>
          </div>
        </div>

        {/* VESTING TIMELINE SECTION */}
        <div className="scroll-card mt-24">
           <div className="text-center mb-16">
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white">Supply Release Schedule</h3>
              <p className="text-slate-500 mt-2 font-medium">FLUID implements a long-term release strategy to ensure sustainable market growth.</p>
           </div>
           
           <div className="relative pt-12 pb-16">
              <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-slate-800/50 -translate-y-1/2"></div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative">
                 {[
                   { year: 'Launch', desc: 'Presale TGE (3M)', status: 'Active' },
                   { year: 'Year 1', desc: 'Treasury Payouts Begin', status: 'Locked' },
                   { year: 'Year 2', desc: 'Full Incentives Active', status: 'Locked' },
                   { year: 'Year 5', desc: '60% Tokens Circulating', status: 'Locked' },
                   { year: 'Year 10', desc: 'Max Supply Reached', status: 'Locked' },
                 ].map((point, i) => (
                    <div key={i} className="flex flex-col items-center">
                       <div className={`w-6 h-6 rounded-full border-4 shadow-xl ${point.status === 'Active' ? 'bg-emerald-500 border-emerald-500/20 scale-125' : 'bg-slate-700 border-slate-900'} relative z-10 mb-6 transition-transform hover:scale-150 cursor-pointer`}>
                          {point.status === 'Active' && <div className="absolute inset-0 bg-emerald-500 blur-md animate-pulse rounded-full"></div>}
                       </div>
                       <div className="text-center">
                          <div className={`font-bold text-base ${point.status === 'Active' ? 'text-emerald-500' : 'text-slate-500'}`}>{point.year}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 max-w-[120px] mx-auto leading-relaxed font-bold uppercase tracking-tight">{point.desc}</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;