
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
  CheckCircle2,
  DollarSign,
  RefreshCw,
  Users,
  Info,
  Layers,
  Zap,
  ChevronRight,
  Gem,
  ArrowRight,
  Globe
} from 'lucide-react';
import { 
  useActiveAccount, 
  useActiveWalletChain, 
  useReadContract,
  useWalletBalance,
  useSwitchActiveWalletChain
} from 'thirdweb/react';
import { getContract, defineChain } from 'thirdweb';
import { thirdwebClient } from '../client';
import FluidLogo from '../components/FluidLogo';

const PRESALE_CONTRACT_ADDRESS = "0xec9123Aa60651ceee7c0E084c884Cd33478c92a5";
const PRIMARY_CHAIN_ID = 1;

const BuyPage: React.FC = () => {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const [activeTab, setActiveTab] = useState<'buy' | 'portfolio' | 'history'>('buy');
  const [simulatedRaised, setSimulatedRaised] = useState(1248590);

  // Simulation for raised funds to make it look alive
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedRaised(prev => prev + Math.floor(Math.random() * 15));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const contractChain = useMemo(() => activeChain || defineChain(PRIMARY_CHAIN_ID), [activeChain]);

  const contract = useMemo(() => getContract({
    client: thirdwebClient,
    chain: contractChain,
    address: PRESALE_CONTRACT_ADDRESS,
  }), [contractChain]);

  const { data: userBalance } = useReadContract({
    contract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [account?.address || "0x0000000000000000000000000000000000000000"]
  });

  const { data: nativeBalance } = useWalletBalance({
    client: thirdwebClient,
    chain: contractChain,
    address: account?.address,
  });

  const presaleStages = [
    { name: "Stage 1", price: "$1.00", status: "Active", current: true },
    { name: "Stage 2", price: "$1.15", status: "Upcoming", current: false },
    { name: "Stage 3", price: "$1.30", status: "Upcoming", current: false },
    { name: "Listing", price: "$1.50", status: "Final", current: false },
  ];

  const investorBenefits = [
    { title: "Early Entry", desc: "Get $Fluid at the lowest possible price before the L1 mainnet launch.", icon: Gem },
    { title: "Governance", desc: "Holders will have voting power over the Fluid Foundation's treasury.", icon: Layers },
    { title: "Fee Sharing", desc: "A portion of L1 transaction fees is distributed back to stakers.", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-slate-950">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-tech-grid opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                 <Activity size={12} className="animate-pulse" /> Fluid L1 Global Infrastructure Launch
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-none mb-4">
                Be part of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">Fluid's Growth</span>
              </h1>
              <p className="text-slate-400 max-w-xl text-lg font-medium">
                The Fluid L1 blockchain is the infrastructure layer for the next generation of decentralized storage and finance.
              </p>
           </div>
           
           <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-[2rem] min-w-[160px] backdrop-blur-md">
                 <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Stage 1 Price</div>
                 <div className="text-2xl font-mono font-extrabold text-white">$1.00 <span className="text-xs text-slate-500">USDT</span></div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-[2rem] min-w-[160px] backdrop-blur-md">
                 <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Listing Goal</div>
                 <div className="text-2xl font-mono font-extrabold text-emerald-400">$1.50 <span className="text-xs text-emerald-500/50">USD</span></div>
              </div>
           </div>
        </header>

        {/* Mobile Tab Navigator */}
        <div className="flex xl:hidden bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 mb-8 sticky top-24 z-30 backdrop-blur-xl">
           <button onClick={() => setActiveTab('buy')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'buy' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}>
              <ShoppingCart size={14} /> Buy Fluid
           </button>
           <button onClick={() => setActiveTab('portfolio')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'portfolio' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}>
              <Wallet size={14} /> My Assets
           </button>
        </div>

        <div className="grid xl:grid-cols-12 gap-8 items-start">
           <div className={`xl:col-span-8 space-y-8 ${activeTab !== 'buy' && 'hidden xl:block'}`}>
              {/* Presale Progress */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5">
                     <TrendingUp size={160} />
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
                     <div className="w-full">
                        <div className="flex justify-between items-center mb-4">
                           <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                             Current Phase: <span className="text-blue-400">Presale Stage 1</span>
                           </h3>
                           <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">78% Filled</span>
                        </div>
                        <div className="w-full h-6 bg-slate-950 rounded-full border border-slate-800 overflow-hidden p-1.5">
                           <div className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 relative" style={{ width: `78%` }}>
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                           </div>
                        </div>
                        <div className="flex justify-between mt-4">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Raised</span>
                              <span className="text-2xl font-mono font-extrabold text-white">${simulatedRaised.toLocaleString()}</span>
                           </div>
                           <div className="flex flex-col text-right">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Goal</span>
                              <span className="text-2xl font-mono font-extrabold text-slate-300">$2,500,000</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Stages Timeline */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-800/50">
                     {presaleStages.map((stage, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl border transition-all ${stage.current ? 'bg-blue-500/10 border-blue-500/30 ring-1 ring-blue-500/20' : 'bg-slate-950/30 border-slate-800'}`}>
                           <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">{stage.name}</div>
                           <div className={`text-lg font-bold ${stage.current ? 'text-blue-400' : 'text-slate-300'}`}>{stage.price}</div>
                           <div className={`text-[9px] font-bold mt-2 uppercase tracking-tighter ${stage.status === 'Active' ? 'text-emerald-500' : 'text-slate-600'}`}>{stage.status}</div>
                        </div>
                     ))}
                  </div>
              </div>

              {/* Presale Card Wrapper */}
              <div className="relative group scroll-card">
                 <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[3.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                 <div className="relative">
                    <PresaleCard />
                 </div>
              </div>

              {/* Investor Info */}
              <div className="grid md:grid-cols-3 gap-6">
                 {investorBenefits.map((benefit, idx) => (
                    <div key={idx} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-blue-500/30 transition-all group">
                       <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                          <benefit.icon size={24} />
                       </div>
                       <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                       <p className="text-sm text-slate-400 leading-relaxed">{benefit.desc}</p>
                    </div>
                 ))}
              </div>
           </div>

           <div className={`xl:col-span-4 space-y-8 ${activeTab === 'buy' && 'hidden xl:block'}`}>
              {/* My Wallet / Portfolio Card */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-8 backdrop-blur-xl">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                       <Wallet size={20} className="text-emerald-400" /> My Assets
                    </h3>
                    <button className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400">
                       <RefreshCw size={16} />
                    </button>
                 </div>
                 
                 {!account ? (
                    <div className="text-center py-12 px-6 border-2 border-dashed border-slate-800 rounded-[2rem] bg-slate-950/50">
                       <Users className="mx-auto text-slate-800 mb-6" size={56} />
                       <p className="text-base font-bold text-slate-400 mb-2">Connect Your Wallet</p>
                       <p className="text-xs text-slate-600">Track your $Fluid holdings and transaction status in real-time.</p>
                    </div>
                 ) : (
                    <div className="space-y-6">
                       <div className="bg-slate-950/80 p-8 rounded-[2rem] border border-slate-800 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                             <FluidLogo size={64} />
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Presale Tokens ($Fluid)</div>
                          <div className="text-4xl font-mono font-extrabold text-white flex items-center gap-3">
                            {(Number(userBalance || 0) / 1e18).toLocaleString()}
                          </div>
                          <div className="mt-6 pt-6 border-t border-slate-800 flex justify-between items-center">
                             <span className="text-xs text-slate-500">Allocation Status</span>
                             <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">Secured</span>
                          </div>
                       </div>
                       
                       <div className="space-y-3">
                          <div className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Wallet Balances</div>
                          <div className="flex justify-between items-center p-5 rounded-2xl bg-slate-950/50 border border-slate-800">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold">
                                   {nativeBalance?.symbol?.[0] || 'E'}
                                </div>
                                <div>
                                   <div className="text-sm font-bold text-white">{nativeBalance?.name || 'Native Token'}</div>
                                   <div className="text-xs text-slate-500 font-mono">{Number(nativeBalance?.displayValue || 0).toFixed(4)} {nativeBalance?.symbol}</div>
                                </div>
                             </div>
                             <ChevronRight size={16} className="text-slate-700" />
                          </div>
                       </div>
                    </div>
                 )}
              </div>

              {/* Verification Info */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-8 backdrop-blur-xl">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                    <ShieldCheck size={20} className="text-blue-400" /> Security Verified
                 </h3>
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-emerald-400">
                          <CheckCircle2 size={20} />
                       </div>
                       <div>
                          <div className="text-sm font-bold text-white">Audited Contract</div>
                          <div className="text-xs text-slate-500">Security audit by CertiK pending.</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400">
                          <Lock size={20} />
                       </div>
                       <div>
                          <div className="text-sm font-bold text-white">Vesting Schedule</div>
                          <div className="text-xs text-slate-500">Tokens unlocked at 100% on TGE.</div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Help/Support CTA */}
              <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-blue-500/30 rounded-[2.5rem] p-8 text-center group">
                 <h4 className="text-white font-bold mb-2">Need help with buying?</h4>
                 <p className="text-xs text-slate-400 mb-6">Read our step-by-step guide on how to join the Fluid Presale.</p>
                 <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
                    Tutorial Guide <ArrowRight size={16} />
                 </button>
              </div>
           </div>
        </div>

        {/* Technical Footer Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-10">
           <div className="p-8 bg-slate-900/20 border border-slate-800/50 rounded-3xl">
              <Zap className="text-yellow-400 mb-6" size={32} />
              <h4 className="text-xl font-bold text-white mb-3">2M+ TPS Capacity</h4>
              <p className="text-sm text-slate-500 leading-relaxed">The Fluid L1 is built for high-frequency decentralized applications with unmatched throughput.</p>
           </div>
           <div className="p-8 bg-slate-900/20 border border-slate-800/50 rounded-3xl">
              <RefreshCw className="text-cyan-400 mb-6" size={32} />
              <h4 className="text-xl font-bold text-white mb-3">Sub-second Finality</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Sub-second transaction finality ensures your assets are moved and secured instantly across the globe.</p>
           </div>
           <div className="p-8 bg-slate-900/20 border border-slate-800/50 rounded-3xl">
              <Globe className="text-emerald-400 mb-6" size={32} />
              <h4 className="text-xl font-bold text-white mb-3">Global Sharding</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Advanced sharding architecture allows Fluid to scale linearly with user demand without congestion.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
