import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, ArrowDownLeft, Repeat, Plus, 
  CreditCard, Lock, Eye, Settings, Globe, Server, 
  Search, Cloud, Wifi, ChevronRight, Activity, Smartphone,
  ShieldCheck, Zap, MoreHorizontal, Copy, RefreshCw,
  Check, ExternalLink, AlertCircle, Loader2, ArrowRight,
  Wallet, Network, LogOut
} from 'lucide-react';
import { 
  useActiveAccount, 
  useActiveWalletChain, 
  useWalletBalance, 
  useSendTransaction,
  useSwitchActiveWalletChain,
  useDisconnect
} from 'thirdweb/react';
import { thirdwebClient } from '../client';
import { defineChain } from 'thirdweb/chains';
import { toWei } from 'thirdweb';

const WalletPage: React.FC = () => {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const { disconnect } = useDisconnect();
  const { mutate: sendTx, isPending: isSending } = useSendTransaction();

  // State for Send form
  const [sendAddress, setSendAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'assets' | 'send' | 'receive'>('assets');

  // Fetch balance for the connected account on the active chain
  const { data: balance, isLoading: isBalanceLoading } = useWalletBalance({
    chain: activeChain || defineChain(1),
    address: account?.address,
    client: thirdwebClient,
  });

  const supportedChains = [
    { id: 1, name: 'Ethereum', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026' },
    { id: 56, name: 'BSC', icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026' },
    { id: 137, name: 'Polygon', icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=026' },
  ];

  const handleCopyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleSend = async () => {
    if (!account || !sendAddress || !sendAmount) return;
    try {
      const tx = {
        to: sendAddress,
        value: Number(toWei(sendAmount)),
      };
      sendTx(tx as any);
    } catch (error) {
      console.error("Send failed", error);
    }
  };

  const FluidLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
        <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
        <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
    </svg>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#0a0a16] text-white overflow-hidden selection:bg-cyan-500/30">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!account ? (
          /* UNCONNECTED STATE: SHOW MOCKUPS AND HERO */
          <section className="text-center mb-24 py-12">
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
              Connect your wallet to manage assets, swap tokens, and explore the Fluid ecosystem directly from your browser.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
               {/* Simplified Mockups for Unconnected state */}
               {[1,2,3,4].map(i => (
                 <div key={i} className="hidden lg:block relative w-full h-[400px] rounded-[2rem] border-4 border-slate-800 bg-slate-900/30 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-800 rounded-b-lg"></div>
                 </div>
               ))}
            </div>
          </section>
        ) : (
          /* CONNECTED STATE: WEB DASHBOARD */
          <section className="animate-fade-in-up py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Left Column: Stats & Chain Switching */}
              <div className="w-full lg:w-1/3 space-y-6">
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-xl">
                        {account.address.slice(2, 4).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          My Wallet <Activity size={12} className="text-emerald-500" />
                        </div>
                        <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                          {account.address.slice(0, 6)}...{account.address.slice(-4)}
                          <button onClick={handleCopyAddress} className="hover:text-cyan-400 transition-colors">
                            {copySuccess ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => disconnect(activeChain?.id ? { chainId: activeChain.id } as any : undefined)}
                      className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>

                  <div className="mb-10 text-center">
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Total Balance</div>
                    <div className="text-5xl font-mono font-extrabold text-white">
                      {isBalanceLoading ? (
                        <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={24} /></span>
                      ) : (
                        `${parseFloat(balance?.displayValue || '0').toFixed(4)} ${balance?.symbol}`
                      )}
                    </div>
                  </div>

                  {/* Network Selector */}
                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Connected Networks</h4>
                      <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                        SYNCED
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {supportedChains.map((chain) => (
                        <button
                          key={chain.id}
                          onClick={() => switchChain(defineChain(chain.id))}
                          className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${
                            activeChain?.id === chain.id 
                            ? 'bg-cyan-500/10 border-cyan-500/30' 
                            : 'bg-white/5 border-transparent hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={chain.icon} className="w-6 h-6 rounded-full" alt={chain.name} />
                            <span className={`text-sm font-bold ${activeChain?.id === chain.id ? 'text-cyan-400' : 'text-slate-300'}`}>
                              {chain.name}
                            </span>
                          </div>
                          {activeChain?.id === chain.id && <Check size={16} className="text-cyan-400" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6">
                  <h4 className="text-xs font-bold text-slate-500 mb-4 flex items-center gap-2 uppercase">
                    <ShieldCheck size={14} className="text-emerald-500" /> Security Status
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Non-Custodial</span>
                      <span className="text-emerald-500 font-bold">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Private Keys</span>
                      <span className="text-slate-300 font-mono">Device-Stored</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interaction Hub */}
              <div className="w-full lg:w-2/3 space-y-6">
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl min-h-[500px] flex flex-col">
                  {/* Tabs Navigation */}
                  <div className="flex p-1.5 bg-black/30 rounded-2xl w-fit mb-8 border border-white/5">
                    <button 
                      onClick={() => setActiveTab('assets')}
                      className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${activeTab === 'assets' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'}`}
                    >
                      My Assets
                    </button>
                    <button 
                      onClick={() => setActiveTab('send')}
                      className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${activeTab === 'send' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'}`}
                    >
                      Send Tokens
                    </button>
                    <button 
                      onClick={() => setActiveTab('receive')}
                      className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${activeTab === 'receive' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'}`}
                    >
                      Receive
                    </button>
                  </div>

                  <div className="flex-1">
                    {activeTab === 'assets' && (
                      <div className="animate-fade-in-up">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-white flex items-center gap-2">
                             Main Portfolio
                          </h3>
                          <button className="p-2 text-slate-500 hover:text-white transition-colors">
                            <RefreshCw size={16} />
                          </button>
                        </div>
                        <div className="grid gap-4">
                           {/* Native Asset */}
                           <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform">
                                    {balance?.symbol?.[0] || 'N'}
                                 </div>
                                 <div>
                                    <div className="font-bold text-lg text-white">{balance?.name || 'Native Token'}</div>
                                    <div className="text-sm text-slate-500">Live Network Price Sync</div>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-xl font-mono font-bold text-white">
                                    {isBalanceLoading ? '...' : parseFloat(balance?.displayValue || '0').toFixed(6)}
                                 </div>
                                 <div className="text-xs text-slate-500 uppercase tracking-tighter font-bold">{balance?.symbol}</div>
                              </div>
                           </div>

                           {/* Fluid Asset (Simulated) */}
                           <div className="flex items-center justify-between p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 group-hover:scale-110 transition-transform">
                                    <FluidLogo className="w-8 h-8" />
                                 </div>
                                 <div>
                                    <div className="font-bold text-lg text-white">Fluid Token</div>
                                    <div className="text-sm text-emerald-500/70 font-bold uppercase tracking-tighter">Ecosystem Fuel</div>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-xl font-mono font-bold text-white">12,450.00</div>
                                 <div className="text-xs text-emerald-500 uppercase tracking-tighter font-bold">FLUID</div>
                              </div>
                           </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'send' && (
                      <div className="animate-fade-in-up space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Recipient Address</label>
                             <div className="relative">
                                <input 
                                  type="text" 
                                  value={sendAddress}
                                  onChange={(e) => setSendAddress(e.target.value)}
                                  placeholder="0x..."
                                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white font-mono text-sm focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-700 shadow-inner"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/5 text-slate-500 hover:text-white cursor-pointer">
                                  <Wallet size={16} />
                                </div>
                             </div>
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Amount ({balance?.symbol})</label>
                             <div className="relative">
                                <input 
                                  type="number" 
                                  value={sendAmount}
                                  onChange={(e) => setSendAmount(e.target.value)}
                                  placeholder="0.00"
                                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-3xl font-bold text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-700 shadow-inner"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                  <button onClick={() => setSendAmount(balance?.displayValue || '0')} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold text-cyan-400">MAX</button>
                                  <span className="text-sm font-bold text-slate-500 pr-2">{balance?.symbol}</span>
                                </div>
                             </div>
                             <div className="flex justify-between px-1 text-[10px] text-slate-500 font-bold uppercase">
                                <span>Estimated Fee: ~0.0001 ETH</span>
                                <span>Available: {parseFloat(balance?.displayValue || '0').toFixed(4)}</span>
                             </div>
                          </div>
                        </div>

                        <button 
                          onClick={handleSend}
                          disabled={isSending || !sendAddress || !sendAmount}
                          className="w-full py-5 rounded-[1.5rem] bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                        >
                          {isSending ? (
                            <><Loader2 className="animate-spin" size={24} /> Processing Transaction...</>
                          ) : (
                            <><ArrowUpRight size={24} /> Send Assets</>
                          )}
                        </button>
                      </div>
                    )}

                    {activeTab === 'receive' && (
                      <div className="animate-fade-in-up flex flex-col items-center justify-center py-8">
                        <div className="bg-white p-6 rounded-[2rem] shadow-2xl mb-10 relative group">
                          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          {/* Placeholder for QR Code */}
                          <div className="w-48 h-48 bg-slate-100 rounded-xl flex items-center justify-center relative z-10 overflow-hidden">
                             <div className="grid grid-cols-4 grid-rows-4 gap-2 opacity-10">
                               {[...Array(16)].map((_, i) => <div key={i} className="w-8 h-8 bg-black"></div>)}
                             </div>
                             <div className="absolute inset-0 flex items-center justify-center">
                                <FluidLogo className="w-16 h-16 text-black" />
                             </div>
                          </div>
                        </div>
                        
                        <div className="w-full max-w-md bg-black/40 border border-white/10 rounded-2xl p-6 text-center">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">Your Wallet Address</div>
                          <div className="text-sm font-mono text-cyan-400 break-all mb-6">
                            {account.address}
                          </div>
                          <button 
                            onClick={handleCopyAddress}
                            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all mx-auto font-bold text-xs"
                          >
                            {copySuccess ? (
                              <><Check size={14} className="text-emerald-500" /> Copied!</>
                            ) : (
                              <><Copy size={14} /> Copy to Clipboard</>
                            )}
                          </button>
                        </div>
                        <p className="mt-8 text-xs text-slate-500 text-center max-w-sm">
                           Only send assets supported by the <span className="text-cyan-500 font-bold">{activeChain?.name}</span> network to this address.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Features Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/60 border border-white/5 rounded-3xl p-6 flex items-center gap-4 hover:border-cyan-500/20 transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Virtual Fluid Card</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Sync assets with debit card</p>
                    </div>
                  </div>
                  <div className="bg-slate-900/60 border border-white/5 rounded-3xl p-6 flex items-center gap-4 hover:border-purple-500/20 transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Repeat size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Cross-Chain Bridge</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Move assets between chains</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default WalletPage;