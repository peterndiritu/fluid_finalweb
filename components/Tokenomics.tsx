import React from 'react';
import { 
  Lock, Clock, Coins, Users, Landmark, Wallet, Rocket, 
  TrendingUp, Flame, PieChart, Activity, Info, BarChart3, 
  ArrowUpRight, ShieldCheck, HeartPulse
} from 'lucide-react';
import { getContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
// Fix: Correctly import thirdwebClient from ../client as it is the exported member
import { thirdwebClient } from "../client";

// --- Configuration ---
// Placeholder address - replace with actual deployed contract
const FLUID_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000"; 
const BURN_ADDRESS = "0x000000000000000000000000000000000000dEaD";
const CHAIN = defineChain(1); // Ethereum Mainnet

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
  // Fix: Use thirdwebClient exported from client.ts
  const contract = getContract({
    client: thirdwebClient,
    chain: CHAIN,
    address: FLUID_TOKEN_ADDRESS,
  });

  // Fetch FLUID Price from contract (Safely wrapped)
  const { data: contractPrice, isLoading: isPriceLoading, error: priceError } = useReadContract({
    contract,
    method: "function getFluidPrice() view returns (uint256)",
    params: [],
  });

  // Fetch Total Burned (Safely wrapped)
  const { data: burnedAmount, isLoading: isBurnLoading, error: burnError } = useReadContract({
    contract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [BURN_ADDRESS],
  });

  // Data processing with requested values as defaults if contract read fails
  // Updated fallback price to 1.00
  const displayPrice = (!priceError && contractPrice) ? (Number(contractPrice) / 1e18).toFixed(4) : "1.00";
  const displayBurned = (!burnError && burnedAmount) ? Number(BigInt(burnedAmount) / BigInt(1e18)).toLocaleString() : "142,601";
  
  // Market Cap calculation (Price * 10M supply)
  const mcValue = 10000000 * parseFloat(displayPrice);
  const displayMC = mcValue >= 1000000 
    ? `$${(mcValue / 1000000).toFixed(1)}M` 
    : `$${(mcValue / 1000).toFixed(0)}k`;

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
              <div className={`text-2xl font-mono font-extrabold text-slate-900 dark:text-white ${isPriceLoading ? 'animate-pulse opacity-50' : ''}`}>
                 ${displayPrice}
              </div>
              <div className="text-[10px] text-emerald-500 font-bold mt-1">+2.45% (24h)</div>
           </div>

           <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl group hover:border-blue-500/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Market Cap (FDV)</span>
                 <BarChart3 size={14} className="text-blue-500" />
              </div>
              <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white">
                 {displayMC}
              </div>
              <div className="text-[10px] text-slate-500 font-bold mt-1">Based on 10M Supply</div>
           </div>

           <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl group hover:border-orange-500/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Burned</span>
                 <Flame size={14} className="text-orange-500" />
              </div>
              <div className={`text-2xl font-mono font-extrabold text-slate-900 dark:text-white ${isBurnLoading ? 'animate-pulse opacity-50' : ''}`}>
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

        {/* MAIN DASHBOARD CONTENT */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <PieChart size={20} className="text-emerald-500" /> Strategic Allocation
                 </h3>
                 <span className="text-xs text-slate-500 font-bold">Total Supply: 10,000,000 FLUID</span>
              </div>
              
              <div className="grid gap-4">
                  {allocationData.map((item) => (
                      <div 
                        key={item.name} 
                        className="scroll-card bg-white dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-opacity-100 transition-all group"
                        style={{ borderColor: `${item.color}30` }}
                      >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-center gap-4 min-w-[240px]">
                                  <div className="p-3 rounded-2xl bg-opacity-10 text-white shrink-0" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                                      <item.icon size={24} />
                                  </div>
                                  <div>
                                      <h4 className="text-slate-900 dark:text-white font-bold text-lg leading-none mb-1">{item.name}</h4>
                                      <p className="text-[11px] text-slate-500 font-medium">{item.desc}</p>
                                  </div>
                              </div>

                              <div className="flex-1 md:px-12">
                                 <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-tighter">
                                    <span>Vesting: {item.vesting}</span>
                                    <span>{item.value}%</span>
                                 </div>
                                 <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                     <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                                 </div>
                              </div>
                              
                              <div className="text-right min-w-[140px]">
                                  <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-white">{item.amount}</div>
                                  <div className="text-[10px] text-slate-500 font-bold">FLUID TOKENS</div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                 <Activity size={20} className="text-cyan-500" /> Protocol Economy
              </h3>

              <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Lock size={64} />
                  </div>
                  <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-4">Real Yield Staking</h4>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">18.5% <span className="text-sm font-normal text-slate-500">APR</span></div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                     Everyone is paid proportional to staked FLUID from platform revenue. No tiers, purely egalitarian distribution.
                  </p>
                  <button className="w-full py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold rounded-xl border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition-all">
                     Stake FLUID Now
                  </button>
              </div>

              <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
                  <h4 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2">
                     <Flame size={12} className="text-orange-500" /> Scarcity Tracker
                  </h4>
                  <div className="space-y-4">
                     <div>
                        <div className="flex justify-between text-xs font-bold mb-2">
                           <span className="text-slate-500">Buyback Velocity</span>
                           <span className="text-emerald-500">High</span>
                        </div>
                        <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                           <div className="w-[85%] h-full bg-emerald-500"></div>
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-xs font-bold mb-2">
                           <span className="text-slate-500">Token Burn Progress</span>
                           <span className="text-orange-500">1.42%</span>
                        </div>
                        <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                           <div className="w-[44%] h-full bg-orange-500"></div>
                        </div>
                     </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 flex items-center gap-2">
                     <Info size={12} /> Next Buyback: <span className="text-slate-900 dark:text-white font-bold">2d 14h 05m</span>
                  </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 shrink-0">
                    <ShieldCheck size={24} />
                 </div>
                 <div>
                    <h5 className="font-bold text-white text-sm">Audited & Verified</h5>
                    <p className="text-[10px] text-slate-500">Smart contracts verified on FluidScan and audited by Certik.</p>
                 </div>
              </div>
          </div>
        </div>

        {/* VESTING TIMELINE SECTION */}
        <div className="scroll-card">
           <div className="text-center mb-12">
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">Supply Unlock Timeline</h3>
              <p className="text-slate-500 mt-2">FLUID implements a long-term release strategy to ensure market stability.</p>
           </div>
           
           <div className="relative pt-8 pb-12">
              <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-slate-800 -translate-y-1/2"></div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
                 {[
                   { year: 'Launch', desc: 'Presale TGE (3M)', status: 'Active' },
                   { year: 'Year 1', desc: 'Treasury Unlock Starts', status: 'Locked' },
                   { year: 'Year 2', desc: 'Incentives Payouts', status: 'Locked' },
                   { year: 'Year 5', desc: '60% Tokens Circulating', status: 'Locked' },
                   { year: 'Year 10', desc: 'Max Supply Reached', status: 'Locked' },
                 ].map((point, i) => (
                    <div key={i} className="flex flex-col items-center">
                       <div className={`w-4 h-4 rounded-full border-4 ${point.status === 'Active' ? 'bg-emerald-500 border-emerald-500/20' : 'bg-slate-700 border-slate-900'} relative z-10 mb-4`}>
                          {point.status === 'Active' && <div className="absolute inset-0 bg-emerald-500 blur-sm animate-pulse rounded-full"></div>}
                       </div>
                       <div className="text-center">
                          <div className={`font-bold text-sm ${point.status === 'Active' ? 'text-emerald-500' : 'text-slate-500'}`}>{point.year}</div>
                          <div className="text-[10px] text-slate-600 dark:text-slate-400 mt-1 max-w-[100px] mx-auto leading-tight">{point.desc}</div>
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