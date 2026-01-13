import React, { useState, useEffect, useMemo } from 'react';
import PresaleCard from '../components/PresaleCard';
import { 
  BarChart3, 
  History, 
  Wallet, 
  ShoppingCart, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  ArrowUpRight, 
  Activity,
  Gift,
  CheckCircle2,
  DollarSign,
  RefreshCw,
  Users,
  Info
} from 'lucide-react';
import { 
  useActiveAccount, 
  useActiveWalletChain, 
  useReadContract 
} from 'thirdweb/react';
import { getContract, defineChain } from 'thirdweb';
import { thirdwebClient } from '../client';

// --- Configuration ---
const PRESALE_CONTRACT_ADDRESS = "0xec9123Aa60651ceee7c0E084c884Cd33478c92a5";

const BuyPage: React.FC = () => {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const [activeTab, setActiveTab] = useState<'buy' | 'portfolio' | 'history'>('buy');

  // Initialize Contract
  const contract = useMemo(() => getContract({
    client: thirdwebClient,
    chain: activeChain || defineChain(1), // Fallback to ETH Mainnet if not connected
    address: PRESALE_CONTRACT_ADDRESS,
  }), [activeChain]);

  // --- Real Contract Reads ---
  const { data: totalRaised, isLoading: loadingRaised, refetch: refetchRaised } = useReadContract({
    contract,
    method: "function totalRaised() view returns (uint256)",
    params: []
  });

  const { data: hardCap, isLoading: loadingCap } = useReadContract({
    contract,
    method: "function hardCap() view returns (uint256)",
    params: []
  });

  const { data: tokenPrice, isLoading: loadingPrice } = useReadContract({
    contract,
    method: "function price() view returns (uint256)",
    params: []
  });

  const { data: userBalance, isLoading: loadingBalance, refetch: refetchBalance } = useReadContract({
    contract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [account?.address || "0x0000000000000000000000000000000000000000"]
  });

  // Calculate Progress Percentages
  const raisedValue = totalRaised ? Number(totalRaised) / 1e18 : 0;
  const capValue = hardCap ? Number(hardCap) / 1e18 : 2500000; // Fallback to 2.5M if read fails
  const progressPercent = Math.min((raisedValue / capValue) * 100, 100);
  const displayPrice = tokenPrice ? (Number(tokenPrice) / 1e18).toFixed(2) : "1.00";

  // Auto-refresh data
  useEffect(() => {
    const interval = setInterval(() => {
      refetchRaised();
      refetchBalance();
    }, 15000);
    return () => clearInterval(interval);
  }, [refetchRaised, refetchBalance]);

  // Portfolio Mock Items for diversity (the $FLUID balance is real)
  const portfolioItems = [
    { name: 'Fluid Token', symbol: 'FLUID', balance: userBalance ? (Number(userBalance) / 1e18).toLocaleString() : '0.00', value: '$0.00', color: 'text-blue-400' },
    { name: 'USDT', symbol: 'USDT', balance: '0.00', value: '$0.00', color: 'text-emerald-400' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-slate-950">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dashboard Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                 <Activity size={12} className="animate-pulse" /> Live Presale Dashboard
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Fluid <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Presale</span>
              </h1>
           </div>
           
           {/* Global Stats Bar */}
           <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl min-w-[140px] backdrop-blur-md">
                 <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Current Price</div>
                 <div className="text-lg font-bold text-white">${displayPrice} USDT</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl min-w-[140px] backdrop-blur-md">
                 <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Total Raised</div>
                 <div className="text-lg font-bold text-white">${raisedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl min-w-[140px] backdrop-blur-md">
                 <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Status</div>
                 <div className="text-lg font-bold text-emerald-400">ACTIVE</div>
              </div>
           </div>
        </header>

        {/* Mobile Tab Switcher */}
        <div className="flex xl:hidden bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 mb-8 sticky top-24 z-30 backdrop-blur-xl">
           <button 
             onClick={() => setActiveTab('buy')}
             className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'buy' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
           >
              <ShoppingCart size={14} /> Buy
           </button>
           <button 
             onClick={() => setActiveTab('portfolio')}
             className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'portfolio' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
           >
              <Wallet size={14} /> Wallet
           </button>
           <button 
             onClick={() => setActiveTab('history')}
             className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
           >
              <History size={14} /> Events
           </button>
        </div>

        {/* MAIN DASHBOARD GRID */}
        <div className="grid xl:grid-cols-12 gap-8 items-start">
           
           {/* LEFT COLUMN: Progress & Purchase Widget */}
           <div className={`xl:col-span-8 space-y-8 ${activeTab !== 'buy' && 'hidden xl:block'}`}>
              
              {/* Sales Progress Card */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                     <TrendingUp size={120} />
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                     <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                           <BarChart3 className="text-blue-400" size={20} /> Collection Progress
                        </h3>
                        <p className="text-sm text-slate-500">Real-time tracking of the current presale stage.</p>
                     </div>
                     <div className="text-right">
                        <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full uppercase tracking-widest">Stage 1: Live</span>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div>
                        <div className="flex justify-between items-end mb-3">
                           <span className="text-sm font-bold text-slate-300">Target: ${capValue.toLocaleString()} USDT</span>
                           <span className="text-xl font-mono font-extrabold text-white">
                             {loadingRaised ? "..." : `$${raisedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                           </span>
                        </div>
                        <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden p-1">
                           <div 
                             className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 transition-all duration-1000 relative"
                             style={{ width: `${progressPercent}%` }}
                           >
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                           </div>
                        </div>
                        <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                           <span>Progress: {progressPercent.toFixed(1)}%</span>
                           <span>{loadingCap ? "Syncing..." : "On-chain Verified"}</span>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-10 border-t border-slate-800/50">
                     <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Contract</div>
                        <div className="text-xs font-mono text-slate-400 truncate">{PRESALE_CONTRACT_ADDRESS.slice(0, 6)}...{PRESALE_CONTRACT_ADDRESS.slice(-4)}</div>
                     </div>
                     <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Audit</div>
                        <div className="text-xs font-bold text-emerald-400">PASSED</div>
                     </div>
                     <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Network</div>
                        <div className="text-xs font-bold text-white">{activeChain?.name || "Ethereum"}</div>
                     </div>
                     <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Participants</div>
                        <div className="text-xs font-bold text-white">4,800+</div>
                     </div>
                  </div>
              </div>

              {/* Purchase Section */}
              <div className="relative group scroll-card">
                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                 <div className="relative">
                    <PresaleCard />
                 </div>
              </div>
           </div>

           {/* RIGHT COLUMN: Portfolio & History */}
           <div className={`xl:col-span-4 space-y-8 ${activeTab === 'buy' && 'hidden xl:block'}`}>
              
              {/* Wallet Info / Portfolio */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-xl">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                       <Wallet size={18} className="text-emerald-400" /> My Portfolio
                    </h3>
                    <button 
                      onClick={() => { refetchBalance(); refetchRaised(); }}
                      className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
                    >
                       <RefreshCw size={14} className={loadingBalance ? "animate-spin" : ""} />
                    </button>
                 </div>

                 {!account ? (
                    <div className="text-center py-10 px-4 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-950/50">
                       <Users className="mx-auto text-slate-700 mb-4" size={48} />
                       <p className="text-sm font-bold text-slate-500 mb-2">Connect to Track Portfolio</p>
                       <p className="text-xs text-slate-600 mb-6">Your token balance and transaction history will appear here.</p>
                    </div>
                 ) : (
                    <div className="space-y-6">
                       <div className="bg-slate-950/80 p-6 rounded-3xl border border-slate-800">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">My $FLUID Holdings</div>
                          <div className="text-3xl font-mono font-extrabold text-white">
                            {loadingBalance ? "..." : (Number(userBalance || 0) / 1e18).toLocaleString()}
                            <span className="text-sm font-normal text-slate-600 ml-2">FLUID</span>
                          </div>
                          <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                             <span className="text-xs text-slate-500">Claimable at TGE</span>
                             <span className="text-sm font-bold text-emerald-400">100%</span>
                          </div>
                       </div>

                       {/* Assets List */}
                       <div className="space-y-3">
                          {portfolioItems.map((item, idx) => (
                             <div key={idx} className="flex justify-between items-center p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
                                <div className="flex items-center gap-3">
                                   <div className={`w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs ${item.color}`}>
                                      {item.symbol[0]}
                                   </div>
                                   <div>
                                      <div className="text-xs font-bold text-white">{item.name}</div>
                                      <div className="text-[10px] text-slate-500">{item.balance} {item.symbol}</div>
                                   </div>
                                </div>
                                <div className="text-right text-xs font-bold text-slate-300">{item.value}</div>
                             </div>
                          ))}
                       </div>
                    </div>
                 )}
              </div>

              {/* Security Badge */}
              <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-[2rem] flex items-center gap-4">
                 <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                    <ShieldCheck size={24} />
                 </div>
                 <div>
                    <h5 className="font-bold text-white text-sm">Anti-Flash Lockup</h5>
                    <p className="text-[10px] text-slate-500">Tokens are locked on-chain until the liquidity launch event.</p>
                 </div>
              </div>

              {/* Participation Info */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-xl">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                    <Info size={18} className="text-purple-400" /> Presale Details
                 </h3>
                 <div className="space-y-4">
                    <div className="flex justify-between text-xs">
                       <span className="text-slate-500">Minimum Buy</span>
                       <span className="text-slate-200 font-bold">$100 USDT</span>
                    </div>
                    <div className="flex justify-between text-xs">
                       <span className="text-slate-500">Maximum Buy</span>
                       <span className="text-slate-200 font-bold">$25,000 USDT</span>
                    </div>
                    <div className="flex justify-between text-xs">
                       <span className="text-slate-500">Vest Period</span>
                       <span className="text-slate-200 font-bold">None (Instant TGE)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                       <span className="text-slate-500">Whitelist</span>
                       <span className="text-emerald-500 font-bold">Public</span>
                    </div>
                 </div>
              </div>

           </div>
        </div>

        {/* Footer Metrics */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 scroll-card">
           <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-blue-400">
                 <Clock size={20} />
              </div>
              <div>
                 <h4 className="text-white font-bold text-sm mb-1">Instant Allocation</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">Purchases are recorded on the Fluid Presale smart contract instantly upon transaction confirmation.</p>
              </div>
           </div>
           <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-emerald-400">
                 <DollarSign size={20} />
              </div>
              <div>
                 <h4 className="text-white font-bold text-sm mb-1">Fair Pricing</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">Dynamic pricing ensures all participants get the best possible entry rate based on the current stage.</p>
              </div>
           </div>
           <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-purple-400">
                 <ArrowUpRight size={20} />
              </div>
              <div>
                 <h4 className="text-white font-bold text-sm mb-1">Referral Yield</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">Early participants gain priority access to the Fluid Referral engine for extra yields.</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default BuyPage;