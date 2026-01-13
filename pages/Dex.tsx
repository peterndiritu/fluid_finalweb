import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Settings, ChevronDown, Shield, RefreshCw, Zap, TrendingUp, Play, Apple, Box, Wallet, Globe, CheckCircle, ExternalLink, Loader2, Lock, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FluidTokenIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dexTokenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" fill="url(#dexTokenGrad)" />
    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" fill="url(#dexTokenGrad)" />
  </svg>
);

const data = [
  { name: '10:00', price: 1840 },
  { name: '11:00', price: 1855 },
  { name: '12:00', price: 1848 },
  { name: '13:00', price: 1870 },
  { name: '14:00', price: 1865 },
  { name: '15:00', price: 1885 },
  { name: '16:00', price: 1890 },
];

const DexPage: React.FC = () => {
  const [payAmount, setPayAmount] = useState<string>('1.5');
  const [receiveAmount, setReceiveAmount] = useState<string>('2760');
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapStatus, setSwapStatus] = useState<'idle' | 'approving' | 'swapping' | 'success'>('idle');
  const [activeDapp, setActiveDapp] = useState<string | null>(null);

  useEffect(() => {
    if (!payAmount) {
        setReceiveAmount('');
        return;
    }
    const val = parseFloat(payAmount);
    if (!isNaN(val)) {
        setReceiveAmount((val * 1840).toFixed(2));
    }
  }, [payAmount]);

  const handleSwap = () => {
    setIsSwapping(true);
    setSwapStatus('approving');
    setTimeout(() => setSwapStatus('swapping'), 1500);
    setTimeout(() => setSwapStatus('success'), 3500);
    setTimeout(() => {
        setIsSwapping(false);
        setSwapStatus('idle');
        setPayAmount(''); 
    }, 5500);
  };

  const dapps = [
      { name: 'Uniswap', category: 'DeFi', icon: '🦄', url: 'https://app.uniswap.org' },
      { name: 'OpenSea', category: 'NFT', icon: '🌊', url: 'https://opensea.io' },
      { name: 'Aave', category: 'Lending', icon: '👻', url: 'https://app.aave.com' },
      { name: 'Compound', category: 'Finance', icon: '🟢', url: 'https://compound.finance' }
  ];

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="text-center mb-16 px-4">
        <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm">Decentralized Exchange</span>
        <h1 className="text-5xl font-extrabold text-white mt-2 mb-4">Fluid DEX</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Trade instantly with zero slippage. Connect to any DApp via WalletConnect.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
            <div className="relative z-10">
                 <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>
                    <div className="flex justify-between items-center mb-6">
                       <div className="flex gap-1 p-1 bg-slate-950 rounded-xl">
                          <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold shadow-sm">Swap</button>
                          <button className="px-4 py-2 text-slate-500 hover:text-white rounded-lg text-sm font-bold transition-colors">Limit</button>
                          <button className="px-4 py-2 text-slate-500 hover:text-white rounded-lg text-sm font-bold transition-colors">Bridge</button>
                       </div>
                       <button className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors"><Settings size={20} /></button>
                    </div>
                    <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 mb-2 relative group focus-within:border-slate-600 transition-colors">
                       <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                          <span>You pay</span>
                          <span>Balance: 4.20 ETH</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <input 
                            type="number" 
                            placeholder="0.00" 
                            className="bg-transparent text-3xl font-bold text-white outline-none w-1/2 placeholder-slate-700"
                            value={payAmount}
                            onChange={(e) => setPayAmount(e.target.value)}
                            disabled={isSwapping}
                          />
                          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-full transition-colors border border-slate-700">
                             <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                                 <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-4 h-4" alt="ETH" />
                             </div>
                             <span className="font-bold text-white text-lg">ETH</span>
                             <ChevronDown size={16} className="text-slate-400" />
                          </button>
                       </div>
                       <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-slate-500">~$2,760.50</span>
                            <div className="flex gap-2">
                                {['25%', '50%', 'Max'].map(p => (
                                    <button key={p} className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-1 rounded text-cyan-500 hover:border-cyan-500 transition-colors">{p}</button>
                                ))}
                            </div>
                       </div>
                    </div>
                    <div className="flex justify-center -my-4 relative z-10">
                       <div className="bg-slate-900 border-4 border-slate-900 p-2 rounded-xl text-slate-400 cursor-pointer hover:text-white hover:bg-slate-800 transition-all shadow-lg">
                          <ArrowDownUp size={20} />
                       </div>
                    </div>
                    <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 mb-4 pt-6">
                       <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                          <span>You receive</span>
                          <span>Balance: 0.00 Fluid</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <input 
                            type="number" 
                            placeholder="0.00" 
                            className="bg-transparent text-3xl font-bold text-emerald-400 outline-none w-1/2 placeholder-slate-700"
                            value={receiveAmount}
                            readOnly
                          />
                          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-full transition-colors border border-slate-700">
                             <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                                <FluidTokenIcon className="w-4 h-4" />
                             </div>
                             <span className="font-bold text-white text-lg">Fluid</span>
                             <ChevronDown size={16} className="text-slate-400" />
                          </button>
                       </div>
                       <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-slate-500">~$2,758.10 (-0.08%)</span>
                       </div>
                    </div>
                    <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50 mb-6 space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500 flex items-center gap-1">Rate <RefreshCw size={10}/></span>
                            <span className="text-slate-300">1 ETH = 1,840 Fluid</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500 flex items-center gap-1">Network Cost <Zap size={10}/></span>
                            <span className="text-slate-300">~$2.45</span>
                        </div>
                    </div>
                    <button 
                        onClick={handleSwap}
                        disabled={isSwapping || !payAmount}
                        className={`w-full font-bold text-lg py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                            isSwapping 
                            ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/20'
                        }`}
                    >
                       {swapStatus === 'idle' && 'Swap'}
                       {swapStatus === 'approving' && <><Loader2 className="animate-spin"/> Approving ETH...</>}
                       {swapStatus === 'swapping' && <><Loader2 className="animate-spin"/> Swapping...</>}
                       {swapStatus === 'success' && <><CheckCircle className="text-emerald-400"/> Success!</>}
                    </button>
                 </div>
            </div>

            <div className="space-y-8">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-[300px] flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-6 h-6" alt="ETH"/>
                                <h3 className="text-xl font-bold text-white">Ethereum</h3>
                                <span className="text-slate-500">/ Fluid</span>
                            </div>
                            <div className="text-2xl font-bold text-white mt-1">$1,840.52</div>
                            <div className="text-emerald-400 text-sm font-bold flex items-center gap-1"><TrendingUp size={14}/> +2.4%</div>
                        </div>
                        <div className="flex gap-1">
                            {['1H', '1D', '1W', '1M', '1Y'].map(t => (
                                <button key={t} className={`text-xs font-bold px-2 py-1 rounded ${t === '1D' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}>{t}</button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full -ml-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                              <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                              />
                              <Area type="monotone" dataKey="price" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                                <Globe size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">DApp Browser</h3>
                                <p className="text-xs text-slate-400">Seamlessly connect to Web3</p>
                            </div>
                        </div>
                        <button className="text-xs text-cyan-400 font-bold hover:underline">View All</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {dapps.map((dapp, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-600 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl shadow-sm">
                                        {dapp.icon}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">{dapp.name}</div>
                                        <div className="text-[10px] text-slate-500">{dapp.category}</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setActiveDapp(activeDapp === dapp.name ? null : dapp.name)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeDapp === dapp.name ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'}`}
                                >
                                    {activeDapp === dapp.name ? <CheckCircle size={16} /> : <ExternalLink size={14} />}
                                </button>
                            </div>
                        ))}
                    </div>
                    {activeDapp && (
                        <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 animate-fade-in-up">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-xs text-emerald-400 font-bold">Connected to {activeDapp} via Fluid Wallet</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className="mb-24">
            <h2 className="text-3xl font-extrabold text-white text-center mb-12">Pro Trading Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/30 transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 text-cyan-500 group-hover:scale-110 transition-transform">
                        <Lock size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Privacy First</h3>
                    <p className="text-slate-400">
                        Zero-knowledge proof integration allows for completely anonymous trades. Your financial history remains private.
                    </p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-purple-500/30 transition-colors group relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors"></div>
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Flash Arbitrage</h3>
                    <p className="text-slate-400">
                        Our smart router splits orders across 12+ liquidity sources (Uniswap, Sushi, Curve) to guarantee the best price impact.
                    </p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-emerald-500/30 transition-colors group relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-500 group-hover:scale-110 transition-transform">
                        <Wallet size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Gasless Trading</h3>
                    <p className="text-slate-400">
                        Pay transaction fees in the token you are swapping, or stake Fluid to enjoy gas-free trades on the Fluid network.
                    </p>
                </div>
            </div>
        </div>
        <div className="text-center bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-12 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
             <div className="relative z-10">
                 <h2 className="text-3xl font-bold text-white mb-6">Ready to trade smarter?</h2>
                 <button className="px-10 py-4 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-transform shadow-lg flex items-center gap-2 mx-auto">
                    Launch App <ArrowRight size={20}/>
                 </button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default DexPage;