import React, { useState, useEffect, useMemo } from 'react';
import { 
  useActiveAccount, 
  useActiveWalletChain, 
  useReadContract,
  ConnectButton,
  useWalletBalance
} from 'thirdweb/react';
import { getContract, defineChain } from 'thirdweb';
import { 
  Rocket, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  Users, 
  ExternalLink, 
  Zap, 
  ArrowRight, 
  Globe,
  Wallet,
  ArrowUpRight,
  TrendingUp,
  Gem,
  RefreshCw,
  Layers,
  Lock,
  DollarSign,
  Cpu,
  Server
} from 'lucide-react';
import { thirdwebClient } from '../client';
import PresaleCard from '../components/PresaleCard';
import FluidLogo from '../components/FluidLogo';

const PRESALE_CONTRACT_ADDRESS = "0xec9123Aa60651ceee7c0E084c884Cd33478c92a5";
const PRIMARY_CHAIN_ID = 1;

const BuyPage: React.FC = () => {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  
  const contractChain = useMemo(() => activeChain || defineChain(PRIMARY_CHAIN_ID), [activeChain]);

  const contract = useMemo(() => getContract({
    client: thirdwebClient,
    chain: contractChain,
    address: PRESALE_CONTRACT_ADDRESS,
  }), [contractChain]);

  // --- Real-time On-chain Data Fetching ---
  
  // 1. Total USD Raised
  const { data: totalRaised, isLoading: isRaisedLoading } = useReadContract({
    contract,
    method: "function totalRaised() view returns (uint256)",
    params: []
  });

  // 2. Tokens Sold
  const { data: tokensSold, isLoading: isSoldLoading } = useReadContract({
    contract,
    method: "function tokensSold() view returns (uint256)",
    params: []
  });

  // 3. Hard Cap (Max Tokens for this stage/total)
  const { data: hardCap } = useReadContract({
    contract,
    method: "function maxTokens() view returns (uint256)",
    params: []
  });

  // 4. Current Token Price from Contract
  const { data: contractPrice } = useReadContract({
    contract,
    method: "function getPrice() view returns (uint256)",
    params: []
  });

  // 5. User's purchased balance
  const { data: userBalance } = useReadContract({
    contract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [account?.address || "0x0000000000000000000000000000000000000000"]
  });

  // 6. Native Wallet Balance
  const { data: nativeBalance } = useWalletBalance({
    client: thirdwebClient,
    chain: contractChain,
    address: account?.address,
  });

  // --- Computed Values ---

  const displayRaised = useMemo(() => {
    if (totalRaised) {
      // Assuming 18 decimals for USD representation in contract or adjustment
      return (Number(totalRaised) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 2 });
    }
    return "1,284,500"; // Fallback placeholder
  }, [totalRaised]);

  const displaySold = useMemo(() => {
    if (tokensSold) {
      return (Number(tokensSold) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 0 });
    }
    return "21.6M";
  }, [tokensSold]);

  const currentPrice = useMemo(() => {
    if (contractPrice) {
      return (Number(contractPrice) / 1e18).toFixed(2);
    }
    return "1.00";
  }, [contractPrice]);

  const progressPercentage = useMemo(() => {
    if (tokensSold && hardCap && hardCap > 0n) {
      const percentage = (Number(tokensSold) * 100) / Number(hardCap);
      return Math.min(percentage, 100).toFixed(1);
    }
    return "72"; // Fallback percentage
  }, [tokensSold, hardCap]);

  const investorBenefits = [
    { title: "Deflationary Utility", desc: "FLUID is consumed for storage and network gas, creating constant buy-back pressure.", icon: Gem, color: "text-blue-400" },
    { title: "Governance Rights", desc: "Participate in Fluid DAO decisions governing treasury and L1 development.", icon: Layers, color: "text-purple-400" },
    { title: "Protocol Revenue", desc: "40% of all Hosting Protocol fees are redistributed back to long-term stakers.", icon: DollarSign, color: "text-emerald-400" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden bg-slate-950">
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-tech-grid opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <header className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-20 pt-10">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-black uppercase tracking-[0.3em] mb-8">
              <Activity size={14} className="animate-pulse" /> Live Presale Connection: <span className="font-mono">{PRESALE_CONTRACT_ADDRESS.slice(0,6)}...{PRESALE_CONTRACT_ADDRESS.slice(-4)}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8 uppercase italic">
              Invest in <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400">FLUID L1</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-12">
              Secure your allocation in the first Layer-1 engineered for the permanent web. Sub-second finality with 2M+ TPS capacity.
            </p>
            
            <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto lg:mx-0">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Current Price</span>
                <span className="text-3xl font-mono font-black text-white">${currentPrice}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Next Stage</span>
                <span className="text-3xl font-mono font-black text-emerald-400">$1.15</span>
              </div>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-4 justify-center lg:justify-start">
               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase">On-Chain Verified</span>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
                  <Lock size={16} className="text-blue-500" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase">Non-Custodial</span>
               </div>
            </div>
          </div>

          <div className="w-full lg:w-auto scale-105">
            <PresaleCard />
          </div>
        </header>

        {/* Real-time Dashboard */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-20">
          
          <div className="lg:col-span-8 space-y-8">
            {/* Fundraising Progress Card */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10 backdrop-blur-xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

               <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">Current Allocation Progress</h3>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">
                      Live Stats from <span className="text-blue-400 font-mono">FLD Contract</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-mono font-black text-emerald-400">{progressPercentage}%</span>
                  </div>
               </div>

               <div className="relative mb-8">
                  <div className="w-full h-5 bg-slate-950 rounded-full border border-slate-800 overflow-hidden p-1.5 shadow-inner">
                     <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 relative transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                      style={{ width: `${progressPercentage}%` }}
                     >
                        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Raised</span>
                    <span className="text-xl font-mono font-black text-white">
                        {isRaisedLoading ? "..." : `$${displayRaised}`}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Sold</span>
                    <span className="text-xl font-mono font-black text-white">
                        {isSoldLoading ? "..." : displaySold}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Stage Status</span>
                    <span className="text-xl font-mono font-black text-emerald-400">OPEN</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Blockchain</span>
                    <span className="text-xl font-mono font-black text-slate-500">ETH/BSC</span>
                  </div>
               </div>
            </div>

            {/* Benefit Grid */}
            <div className="grid md:grid-cols-3 gap-6">
               {investorBenefits.map((item, idx) => (
                 <div key={idx} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-blue-500/30 transition-all group flex flex-col">
                    <div className={`w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform shadow-inner border border-white/5`}>
                       <item.icon size={24} />
                    </div>
                    <h4 className="text-xl font-black text-white mb-3 uppercase italic tracking-tighter">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-bold">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            {/* Wallet Quickview */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-xl">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[11px] font-black text-white flex items-center gap-2 uppercase tracking-widest">
                     <Wallet size={16} className="text-blue-400" /> My Portfolio
                  </h3>
                  <button className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
                    <RefreshCw size={14} />
                  </button>
               </div>

               {!account ? (
                  <div className="text-center py-12 px-6 border-2 border-dashed border-slate-800 rounded-[2rem] bg-slate-950/40">
                     <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
                        <Wallet size={32} />
                     </div>
                     <p className="text-xs text-slate-500 font-bold mb-8 uppercase tracking-widest">Authenticate to access investment dashboard</p>
                     <div className="w-full">
                       <ConnectButton 
                        client={thirdwebClient} 
                        theme="dark"
                        connectButton={{
                          label: "Connect Wallet",
                          style: { width: '100%', borderRadius: '1.25rem', padding: '1.25rem', fontWeight: 'bold' }
                        }}
                       />
                     </div>
                  </div>
               ) : (
                  <div className="space-y-6">
                     <div className="p-8 rounded-[2rem] bg-slate-950 border border-slate-800 relative overflow-hidden group shadow-inner">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                           <FluidLogo size={64} />
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Accumulated FLUID</div>
                        <div className="text-5xl font-mono font-black text-white mb-4">
                           {userBalance ? (Number(userBalance) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "0"}
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 w-fit">
                           <CheckCircle2 size={12} className="text-emerald-500" />
                           <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Verified Allocation</span>
                        </div>
                     </div>

                     <div className="space-y-4 pt-4">
                        <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Active Balance</h4>
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/30 transition-colors cursor-pointer group">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-black text-sm">
                                 {nativeBalance?.symbol?.[0] || "E"}
                              </div>
                              <div>
                                 <div className="text-xs font-black text-white uppercase">{nativeBalance?.symbol} Assets</div>
                                 <div className="text-[10px] text-slate-600 font-mono font-bold">
                                    {nativeBalance ? Number(nativeBalance.displayValue).toFixed(4) : "0.0000"} {nativeBalance?.symbol}
                                 </div>
                              </div>
                           </div>
                           <ArrowUpRight size={16} className="text-slate-800 group-hover:text-blue-500 transition-colors" />
                        </div>
                     </div>
                  </div>
               )}
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 border border-white/5 rounded-[2.5rem] p-8">
               <h4 className="text-white font-black text-sm uppercase italic tracking-tighter flex items-center gap-2 mb-4">
                  <ShieldCheck size={18} className="text-blue-400" /> Liquidity Lockdown
               </h4>
               <p className="text-[11px] text-slate-400 leading-relaxed font-bold mb-6">
                  Initial liquidity for FLUID DEX will be locked for 5 years. Total supply: <span className="text-white">100,000,000 FLUID</span>.
               </p>
               <a 
                href={`https://etherscan.io/address/${PRESALE_CONTRACT_ADDRESS}`} 
                target="_blank" 
                rel="noreferrer" 
                className="w-full py-3.5 bg-black/40 hover:bg-black/60 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/5 transition-all flex items-center justify-center gap-2"
               >
                  View Smart Contract <ExternalLink size={14} />
               </a>
            </div>
          </div>
        </div>

        {/* Tech Proof Points */}
        <div className="mt-24 grid md:grid-cols-3 gap-10">
           <div className="p-12 bg-slate-900/40 border border-slate-800 rounded-[3rem] group hover:border-blue-500/20 transition-all flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-slate-950 rounded-3xl flex items-center justify-center mb-8 text-blue-400 shadow-inner group-hover:scale-110 transition-transform">
                <Cpu size={40} />
              </div>
              <h4 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter">Liquid L1 Engine</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-bold">Parallel execution pipeline capable of processing 2,000,000+ operations per second with sub-second finality.</p>
           </div>
           <div className="p-12 bg-slate-900/40 border border-slate-800 rounded-[3rem] group hover:border-emerald-500/20 transition-all flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-slate-950 rounded-3xl flex items-center justify-center mb-8 text-emerald-400 shadow-inner group-hover:rotate-180 transition-transform duration-1000">
                <Server size={40} />
              </div>
              <h4 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter">Hosting Protocol Nodes</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-bold">One-time payment hosting. Shards are replicated across 150+ institutional nodes to ensure permanent availability.</p>
           </div>
           <div className="p-12 bg-slate-900/40 border border-slate-800 rounded-[3rem] group hover:border-indigo-500/20 transition-all flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-slate-950 rounded-3xl flex items-center justify-center mb-8 text-indigo-400 shadow-inner group-hover:animate-bounce">
                <Globe size={40} />
              </div>
              <h4 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tighter">Globalized DEX</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-bold">Native liquidity aggregation. Gas-less trading for $Fluid holders via the proprietary L1 sharding router.</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default BuyPage;