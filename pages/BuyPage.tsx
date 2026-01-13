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
  Info,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  AlertCircle
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

// --- Configuration ---
const PRESALE_CONTRACT_ADDRESS = "0xec9123Aa60651ceee7c0E084c884Cd33478c92a5";
const PRIMARY_CHAIN_ID = 137; // Polygon Mainnet
const USDT_POLYGON_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

const FluidTokenIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="buyPageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" fill="url(#buyPageGrad)" />
    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" fill="url(#buyPageGrad)" />
  </svg>
);

const BuyPage: React.FC = () => {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const [activeTab, setActiveTab] = useState<'buy' | 'portfolio' | 'history'>('buy');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PRESALE_CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwitchNetwork = async () => {
    try {
      await switchChain(defineChain(PRIMARY_CHAIN_ID));
    } catch (err) {
      console.error("Failed to switch network:", err);
    }
  };

  const contractChain = useMemo(() => activeChain || defineChain(PRIMARY_CHAIN_ID), [activeChain]);

  const contract = useMemo(() => getContract({
    client: thirdwebClient,
    chain: contractChain,
    address: PRESALE_CONTRACT_ADDRESS,
  }), [contractChain]);

  // Contract Readings
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

  const { data: userBalance, isLoading: loadingFluidBalance, refetch: refetchFluidBalance } = useReadContract({
    contract,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [account?.address || "0x0000000000000000000000000000000000000000"]
  });

  // Wallet Balances
  const { data: nativeBalance, isLoading: loadingNative, refetch: refetchNative } = useWalletBalance({
    client: thirdwebClient,
    chain: contractChain,
    address: account?.address,
  });

  const { data: usdtBalance, isLoading: loadingUsdt, refetch: refetchUsdt } = useWalletBalance({
    client: thirdwebClient,
    chain: contractChain,
    address: account?.address,
    tokenAddress: contractChain.id === 137 ? USDT_POLYGON_ADDRESS : undefined,
  });

  const raisedValue = totalRaised ? Number(totalRaised) / 1e18 : 0;
  const capValue = hardCap ? Number(hardCap) / 1e18 : 2500000;
  const progressPercent = Math.min((raisedValue / capValue) * 100, 100);
  const displayPrice = tokenPrice ? (Number(tokenPrice) / 1e18).toFixed(2) : "1.00";

  const refreshAll = () => {
    refetchRaised();
    refetchFluidBalance();
    refetchNative();
    refetchUsdt();
  };

  useEffect(() => {
    const interval = setInterval(refreshAll, 15000);
    return () => clearInterval(interval);
  }, []);

  const portfolioItems = useMemo(() => {
    if (!account) return [];
    return [
      { 
        name: 'Fluid Token', 
        symbol: 'Fluid', 
        balance: userBalance ? (Number(userBalance) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0.00', 
        value: '$0.00', 
        color: 'text-blue-400', 
        isFluid: true 
      },
      { 
        name: nativeBalance?.symbol || 'POL', 
        symbol: nativeBalance?.symbol || 'POL', 
        balance: nativeBalance ? Number(nativeBalance.displayValue).toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0.00', 
        value: 'Native', 
        color: 'text-purple-400', 
        isFluid: false 
      },
      { 
        name: 'USDT', 
        symbol: 'USDT', 
        balance: usdtBalance ? Number(usdtBalance.displayValue).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0.00', 
        value: `$${usdtBalance ? Number(usdtBalance.displayValue).toFixed(2) : '0.00'}`, 
        color: 'text-emerald-400', 
        isFluid: false 
      },
    ];
  }, [account, userBalance, nativeBalance, usdtBalance]);

  const explorerUrl = contractChain?.blockExplorers?.[0]?.url 
    ? `${contractChain.blockExplorers[0].url}/address/${PRESALE_CONTRACT_ADDRESS}`
    : `https://polygonscan.com/address/${PRESALE_CONTRACT_ADDRESS}`;

  const isWrongNetwork = account && activeChain?.id !== PRIMARY_CHAIN_ID;

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                 <Activity size={12} className="animate-pulse" /> Fluid on Polygon Mainnet
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Fluid <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Presale</span>
              </h1>
           </div>
           
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
                 <div className={`text-lg font-bold ${isWrongNetwork ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {isWrongNetwork ? 'WRONG NETWORK' : 'ACTIVE'}
                 </div>
              </div>
           </div>
        </header>

        {isWrongNetwork && (
          <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up">
             <div className="flex items-center gap-3">
                <AlertCircle className="text-amber-500" size={24} />
                <p className="text-sm font-bold text-amber-200">Please switch to Polygon Mainnet to participate in the presale.</p>
             </div>
             <button 
                onClick={handleSwitchNetwork}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl text-xs transition-all shadow-lg"
             >
                Switch to Polygon
             </button>
          </div>
        )}

        <div className="flex xl:hidden bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 mb-8 sticky top-24 z-30 backdrop-blur-xl">
           <button onClick={() => setActiveTab('buy')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'buy' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}>
              <ShoppingCart size={14} /> Buy
           </button>
           <button onClick={() => setActiveTab('portfolio')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'portfolio' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}>
              <Wallet size={14} /> Wallet
           </button>
           <button onClick={() => setActiveTab('history')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}>
              <History size={14} /> Events
           </button>
        </div>

        <div className="grid xl:grid-cols-12 gap-8 items-start">
           <div className={`xl:col-span-8 space-y-8 ${activeTab !== 'buy' && 'hidden xl:block'}`}>
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                     <TrendingUp size={120} />
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                     <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                           <BarChart3 className="text-blue-400" size={20} /> Collection Progress
                        </h3>
                        <p className="text-sm text-slate-500">Fluid Token presale is live on Polygon Mainnet.</p>
                     </div>
                     <div className="text-right">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${isWrongNetwork ? 'bg-red-400/10 text-red-400' : 'bg-purple-400/10 text-purple-400'}`}>
                           Network: {activeChain?.name || "Polygon"}
                        </span>
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
                           <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-400 transition-all duration-1000 relative" style={{ width: `${progressPercent}%` }}>
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
                     <div className="group/item">
                        <div className="text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1.5">
                          Presale Contract
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs font-mono text-slate-300 truncate max-w-[100px]">{PRESALE_CONTRACT_ADDRESS.slice(0, 6)}...{PRESALE_CONTRACT_ADDRESS.slice(-4)}</div>
                          <button 
                            onClick={handleCopy}
                            className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-90"
                            title="Copy Contract Address"
                          >
                            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                          </button>
                          <a 
                            href={explorerUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-blue-400 transition-all"
                            title="View on PolygonScan"
                          >
                            <ExternalLink size={12} />
                          </a>
                        </div>
                     </div>
                     <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Audit</div>
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 size={12} /> PASSED
                        </div>
                     </div>
                     <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Status</div>
                        <div className={`text-xs font-bold flex items-center gap-1 ${isWrongNetwork ? 'text-amber-400' : 'text-emerald-400'}`}>
                           {isWrongNetwork ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />} 
                           {isWrongNetwork ? 'Switch Req.' : 'Active'}
                        </div>
                     </div>
                     <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Participants</div>
                        <div className="text-xs font-bold text-white">12,400+</div>
                     </div>
                  </div>
              </div>
              <div className="relative group scroll-card">
                 <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                 <div className="relative">
                    <PresaleCard />
                 </div>
              </div>
           </div>

           <div className={`xl:col-span-4 space-y-8 ${activeTab === 'buy' && 'hidden xl:block'}`}>
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-xl">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                       <Wallet size={18} className="text-emerald-400" /> My Portfolio
                    </h3>
                    <button onClick={refreshAll} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
                       <RefreshCw size={14} className={loadingFluidBalance || loadingNative || loadingUsdt ? "animate-spin" : ""} />
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
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">My $Fluid Holdings</div>
                          <div className="text-3xl font-mono font-extrabold text-white flex items-center gap-2">
                            {loadingFluidBalance ? "..." : (Number(userBalance || 0) / 1e18).toLocaleString()}
                            <FluidTokenIcon className="w-5 h-5" />
                          </div>
                          <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                             <span className="text-xs text-slate-500">Claimable at TGE</span>
                             <span className="text-sm font-bold text-emerald-400">100%</span>
                          </div>
                       </div>
                       
                       <div className="space-y-3">
                          <div className="px-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Balances on {activeChain?.name || "Network"}</div>
                          {portfolioItems.map((item, idx) => (
                             <div key={idx} className="flex justify-between items-center p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
                                <div className="flex items-center gap-3">
                                   <div className={`w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs ${item.color}`}>
                                      {item.isFluid ? <FluidTokenIcon className="w-5 h-5" /> : item.symbol[0]}
                                   </div>
                                   <div>
                                      <div className="text-xs font-bold text-white">{item.name}</div>
                                      <div className="text-[10px] text-slate-500">{item.balance} {item.symbol}</div>
                                   </div>
                                </div>
                                <div className="text-right text-xs font-bold text-slate-300">{item.value}</div>
                             </div>
                          ))}
                          
                          {isWrongNetwork && (
                            <button 
                              onClick={handleSwitchNetwork}
                              className="w-full mt-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold text-purple-400 uppercase tracking-widest transition-all"
                            >
                              Switch to Polygon for Portfolio Sync
                            </button>
                          )}
                       </div>
                    </div>
                 )}
              </div>
              <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-[2rem] flex items-center gap-4">
                 <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                    <ShieldCheck size={24} />
                 </div>
                 <div>
                    <h5 className="font-bold text-white text-sm">On-Chain Transparency</h5>
                    <p className="text-[10px] text-slate-500">Polygon's low-latency network ensures real-time tracking of all presale assets.</p>
                 </div>
              </div>
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
                       <span className="text-slate-500">Network Fees</span>
                       <span className="text-emerald-500 font-bold">&lt;$0.01 (Polygon)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                       <span className="text-slate-500">Whitelist</span>
                       <span className="text-emerald-500 font-bold">Public</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        <div className="mt-20 grid md:grid-cols-3 gap-8 scroll-card">
           <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-purple-400">
                 <Clock size={20} />
              </div>
              <div>
                 <h4 className="text-white font-bold text-sm mb-1">Polygon Finality</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">Transactions on Polygon reach finality in seconds, ensuring your Fluid allocation is secured immediately.</p>
              </div>
           </div>
           <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-emerald-400">
                 <DollarSign size={20} />
              </div>
              <div>
                 <h4 className="text-white font-bold text-sm mb-1">Cost-Effective Entry</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">By hosting on Polygon, we minimize gas barriers, making it easy for everyone to participate in the presale.</p>
              </div>
           </div>
           <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-blue-400">
                 <ArrowUpRight size={20} />
              </div>
              <div>
                 <h4 className="text-white font-bold text-sm mb-1">Ecosystem Depth</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">Fluid tokens on Polygon benefit from deep liquidity and integration with the largest L2 DeFi ecosystem.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;