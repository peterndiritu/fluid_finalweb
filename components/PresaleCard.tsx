import React, { useEffect, useState, useMemo } from 'react';
import { 
  ChevronDown, 
  Check, 
  AlertCircle, 
  Info, 
  Loader2, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  History,
  TrendingUp,
  ShieldCheck,
  Wallet,
  DollarSign,
  Search as SearchIcon
} from 'lucide-react';
import { 
  useActiveAccount, 
  useSendTransaction,
  useActiveWalletChain,
  useSwitchActiveWalletChain,
  ConnectButton,
  useWalletBalance,
  useReadContract
} from 'thirdweb/react';
import { 
  getContract, 
  prepareContractCall,
  toUnits,
  toWei,
  defineChain
} from "thirdweb";
import { thirdwebClient } from "../client";
import FluidLogo from './FluidLogo';

const PRESALE_CONTRACT_ADDRESS = "0xec9123Aa60651ceee7c0E084c884Cd33478c92a5";

interface PaymentToken {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  isNative: boolean;
  address?: string;
  decimals: number;
  chainId: number;
}

interface NetworkOption {
  id: number;
  name: string;
  symbol: string;
  icon: string;
  tokens: PaymentToken[];
}

interface Transaction {
  id: string;
  address: string;
  amountUsd: number;
  tokens: number;
  time: string;
  tokenIcon: string;
}

const NETWORKS: NetworkOption[] = [
  {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026",
    tokens: [
      { id: 'eth', symbol: 'ETH', name: 'Ethereum', chainId: 1, icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026', isNative: true, decimals: 18 },
      { id: 'usdt_eth', symbol: 'USDT', name: 'Tether', chainId: 1, icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=026', isNative: false, address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6 },
      { id: 'usdc_eth', symbol: 'USDC', name: 'USD Coin', chainId: 1, icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026', isNative: false, address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6 },
    ]
  },
  {
    id: 56,
    name: "BSC",
    symbol: "BNB",
    icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026",
    tokens: [
      { id: 'bnb', symbol: 'BNB', name: 'BNB', chainId: 56, icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026', isNative: true, decimals: 18 },
      { id: 'usdt_bsc', symbol: 'USDT', name: 'Tether', chainId: 56, icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=026', isNative: false, address: "0x55d398326f99059fF775485246999027B3197955", decimals: 18 },
      { id: 'usdc_bsc', symbol: 'USDC', name: 'USD Coin', chainId: 56, icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026', isNative: false, address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", decimals: 18 },
    ]
  }
];

const STAGES = [
  { id: 1, name: "Stage 1", price: "$1.00", active: true },
  { id: 2, name: "Stage 2", price: "$1.15", active: false },
  { id: 3, name: "Stage 3", price: "$1.30", active: false },
  { id: 4, name: "Launch", price: "$1.50", active: false },
];

const PresaleCard: React.FC = () => {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const { mutate: sendTransaction, isPending: isTxPending, isSuccess: isConfirmed, error: txError } = useSendTransaction();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectorView, setSelectorView] = useState<'network' | 'token'>('network');
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkOption>(NETWORKS[0]);
  const [selectedToken, setSelectedToken] = useState<PaymentToken>(NETWORKS[0].tokens[0]);
  const [usdAmount, setUsdAmount] = useState<string>('500');
  const [cryptoPrice, setCryptoPrice] = useState<number>(3400);
  const [tokenSearch, setTokenSearch] = useState('');
  const [recentTxs, setRecentTxs] = useState<Transaction[]>([
    { id: '1', address: '0x71C...4f9', amountUsd: 1250, tokens: 1250, time: '2m ago', tokenIcon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026' },
    { id: '2', address: '0x32b...eE2', amountUsd: 500, tokens: 500, time: '5m ago', tokenIcon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=026' },
    { id: '3', address: '0x9a2...11c', amountUsd: 3200, tokens: 3200, time: '8m ago', tokenIcon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026' },
  ]);

  const contract = useMemo(() => getContract({
    client: thirdwebClient,
    chain: defineChain(selectedToken.chainId),
    address: PRESALE_CONTRACT_ADDRESS,
  }), [selectedToken.chainId]);

  const { data: contractTokenPrice } = useReadContract({
    contract,
    method: "function getPrice() view returns (uint256)",
    params: []
  });

  const fluidPricePerUsd = useMemo(() => {
    if (contractTokenPrice) {
      return Number(contractTokenPrice) / 1e18;
    }
    return 1.0;
  }, [contractTokenPrice]);

  const { data: walletBalance } = useWalletBalance({
    client: thirdwebClient,
    chain: defineChain(selectedToken.chainId),
    address: account?.address,
  });

  const cryptoAmount = useMemo(() => {
    return cryptoPrice > 0 ? parseFloat(usdAmount || '0') / cryptoPrice : 0;
  }, [usdAmount, cryptoPrice]);

  const fluidAmount = useMemo(() => {
    return parseFloat(usdAmount || '0') / fluidPricePerUsd;
  }, [usdAmount, fluidPricePerUsd]);

  useEffect(() => {
    const fetchPrice = async () => {
      if (selectedToken.symbol === 'USDT' || selectedToken.symbol === 'USDC') {
        setCryptoPrice(1);
        return;
      }
      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${selectedToken.symbol}USDT`);
        const data = await res.json();
        if (data.price) setCryptoPrice(parseFloat(data.price));
      } catch (e) {
        if (selectedToken.symbol === 'ETH') setCryptoPrice(3400);
        else if (selectedToken.symbol === 'BNB') setCryptoPrice(600);
      }
    };
    fetchPrice();
  }, [selectedToken]);

  const handleBuy = async () => {
    if (!account || !usdAmount) return;
    if (activeChain?.id !== selectedToken.chainId) {
        await switchChain(defineChain(selectedToken.chainId));
        return;
    }

    try {
      const tx = selectedToken.isNative 
        ? prepareContractCall({
            contract,
            method: "function buyWithNative() payable",
            params: [],
            value: toWei(cryptoAmount.toFixed(18)),
          })
        : prepareContractCall({
            contract,
            method: "function buyWithToken(address token, uint256 amount)",
            params: [selectedToken.address!, toUnits(cryptoAmount.toFixed(selectedToken.decimals), selectedToken.decimals)],
          });
      sendTransaction(tx);
    } catch (e) {
      console.error(e);
    }
  };

  const quickTokens = [
    NETWORKS[0].tokens[0], // ETH
    NETWORKS[1].tokens[0], // BNB
    NETWORKS[0].tokens[1], // USDT (ETH)
  ];

  const filteredTokens = useMemo(() => {
    if (!tokenSearch) return selectedNetwork.tokens;
    return selectedNetwork.tokens.filter(t => 
      t.symbol.toLowerCase().includes(tokenSearch.toLowerCase()) || 
      t.name.toLowerCase().includes(tokenSearch.toLowerCase())
    );
  }, [tokenSearch, selectedNetwork]);

  return (
    <div className="w-full max-w-[480px] mx-auto z-10">
      <div className="bg-[#0f172a]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.6)] transition-all">
        {/* Header */}
        <div className="p-8 border-b border-white/5 bg-gradient-to-b from-blue-500/10 to-transparent flex flex-col items-center">
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">Secure Allocation</h2>
            <div className="flex items-center gap-2 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">Smart Contract: {PRESALE_CONTRACT_ADDRESS.slice(0,6)}...</span>
            </div>
        </div>

        {/* Stage Progress */}
        <div className="px-8 pt-8">
           <div className="flex justify-between relative px-2">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-800 -z-0 mx-6">
                 <div className="h-full bg-blue-500 w-[25%] shadow-[0_0_10px_#3b82f6]"></div>
              </div>
              
              {STAGES.map((s) => (
                 <div key={s.id} className="relative z-10 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                       s.active 
                       ? 'bg-blue-500 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-110' 
                       : s.id < 1 ? 'bg-blue-600 border-blue-400' : 'bg-slate-900 border-slate-700'
                    }`}>
                       {s.id < 1 ? <Check size={14} className="text-white" /> : (
                          <span className={`text-[10px] font-bold ${s.active ? 'text-white' : 'text-slate-500'}`}>{s.id}</span>
                       )}
                    </div>
                    <div className="mt-2 text-center">
                       <div className={`text-[8px] font-black uppercase tracking-tighter ${s.active ? 'text-blue-400' : 'text-slate-600'}`}>{s.name}</div>
                       <div className={`text-[10px] font-mono font-bold ${s.active ? 'text-white' : 'text-slate-500'}`}>{s.price}</div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Main Interface */}
        <div className="p-8 space-y-6">
            <div className="space-y-4">
                {/* Pay Section */}
                <div className="relative group">
                    <div className="flex justify-between items-center mb-1.5 px-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <DollarSign size={10} className="text-blue-500" /> You Pay
                      </div>
                      <div className="flex gap-2">
                        {quickTokens.map(t => (
                          <button 
                            key={t.id}
                            onClick={() => {
                              setSelectedToken(t);
                              setSelectedNetwork(NETWORKS.find(n => n.id === t.chainId) || NETWORKS[0]);
                            }}
                            className={`px-2 py-0.5 rounded-md text-[9px] font-black transition-all border ${
                              selectedToken.id === t.id 
                              ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' 
                              : 'bg-slate-900 border-white/5 text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            {t.symbol}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="relative">
                      <input 
                          type="number"
                          value={usdAmount}
                          onChange={(e) => setUsdAmount(e.target.value)}
                          className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl py-6 pl-6 pr-40 text-3xl font-mono font-bold text-white outline-none focus:border-blue-500/50 transition-all shadow-inner"
                          placeholder="0.00"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <button 
                              onClick={() => { setSelectorView('network'); setIsDropdownOpen(true); }}
                              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 px-3 py-2.5 rounded-xl border border-white/5 transition-all active:scale-95 shadow-lg group-hover:border-blue-500/30"
                          >
                              <img src={selectedToken.icon} className="w-6 h-6 rounded-full" alt={selectedToken.symbol} />
                              <span className="font-bold text-white text-sm tracking-tight">{selectedToken.symbol}</span>
                              <ChevronDown size={14} className="text-slate-500" />
                          </button>
                      </div>
                    </div>
                    {account && walletBalance && (
                        <div className="absolute -bottom-6 right-2 text-[9px] font-bold text-slate-600">
                            Balance: <span className="text-slate-400">{Number(walletBalance.displayValue).toFixed(4)} {selectedToken.symbol}</span>
                        </div>
                    )}
                </div>

                {/* Receive Section */}
                <div className="relative group pt-4">
                    <div className="absolute -top-1 left-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <FluidLogo size={10} /> You Receive
                    </div>
                    <div className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl py-6 pl-6 pr-44 text-3xl font-mono font-bold text-emerald-400 shadow-inner">
                        {fluidAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-emerald-500/10 px-4 py-3 rounded-xl border border-emerald-500/20">
                        <FluidLogo size={24} />
                        <span className="font-bold text-emerald-400 text-sm tracking-tighter">FLUID</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
                {!account ? (
                    <div className="connect-btn-wrapper">
                        <ConnectButton 
                          client={thirdwebClient} 
                          theme="dark" 
                          connectButton={{ 
                            label: "Connect to Buy", 
                            style: { width: '100%', borderRadius: '1.25rem', padding: '1.25rem', background: 'linear-gradient(to right, #3b82f6, #06b6d4)', fontWeight: 'bold', border: 'none', fontSize: '1.125rem' } 
                          }}
                        />
                    </div>
                ) : (
                    <button
                        onClick={handleBuy}
                        disabled={isTxPending}
                        className="w-full py-5 rounded-2xl text-lg font-black bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3 uppercase tracking-wider"
                    >
                        {isTxPending ? <Loader2 size={24} className="animate-spin" /> : <Zap size={22} fill="currentColor" />}
                        {isTxPending ? 'Executing...' : `Confirm Purchase`}
                    </button>
                )}
            </div>

            {isConfirmed && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 animate-fade-in-up">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black">
                        <Check size={18} />
                    </div>
                    <div>
                        <span className="text-xs font-black text-emerald-400 block uppercase">Tokens Secured</span>
                        <span className="text-[10px] text-emerald-500/70">Transaction verified on blockchain.</span>
                    </div>
                </div>
            )}
            
            {txError && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 animate-fade-in-up">
                    <AlertCircle size={20} className="text-red-500" />
                    <span className="text-xs font-bold text-red-400">Payment failed. Please try again.</span>
                </div>
            )}

            <div className="flex justify-between items-center text-[9px] font-bold text-slate-600 px-2 pt-2 border-t border-white/5">
                <span className="flex items-center gap-1 uppercase tracking-widest"><ShieldCheck size={10} className="text-emerald-500" /> Secure Protocol</span>
                <span className="flex items-center gap-1 uppercase tracking-widest"><Info size={10} className="text-blue-500" /> Min. Entry: $50</span>
            </div>

            {/* Live Activity Feed */}
            <div className="pt-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        <History size={12} className="text-blue-500" /> Global Mints
                    </h3>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[8px] text-emerald-400 font-black tracking-widest">LIVE</span>
                    </div>
                </div>
                <div className="space-y-3">
                    {recentTxs.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800/50 hover:border-blue-500/30 transition-all group animate-fade-in-up">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-blue-500/50 transition-colors">
                                        <Globe size={18} className="text-blue-500/50" />
                                    </div>
                                    <img src={tx.tokenIcon} className="w-4 h-4 rounded-full absolute -bottom-0.5 -right-0.5 border border-slate-950 shadow-lg" />
                                </div>
                                <div>
                                    <div className="text-[11px] font-black text-white flex items-center gap-1 tracking-tight">
                                        {tx.address} <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">Allocated</span>
                                    </div>
                                    <div className="text-[9px] text-slate-600 font-bold">{tx.time}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[11px] font-mono font-black text-emerald-400 flex items-center gap-1 justify-end">
                                    <TrendingUp size={10} /> +{tx.tokens.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <div className="text-[10px] text-slate-600 font-bold italic tracking-tighter uppercase">FLD</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Modern Token/Network Selector Overlay */}
      {isDropdownOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setIsDropdownOpen(false)}></div>
           
           <div className="w-full max-w-sm bg-[#1e293b] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-fade-in-up">
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
                 <h3 className="font-black text-white uppercase tracking-widest text-sm">
                    {selectorView === 'network' ? 'Entry Network' : `Tokens on ${selectedNetwork.name}`}
                 </h3>
                 <button onClick={() => setIsDropdownOpen(false)} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 hover:text-white transition-colors">✕</button>
              </div>

              {selectorView === 'token' && (
                <div className="px-4 pt-4">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search name or symbol" 
                      value={tokenSearch}
                      onChange={(e) => setTokenSearch(e.target.value)}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
                 {selectorView === 'network' ? (
                    NETWORKS.map(net => (
                       <button key={net.id} onClick={() => { setSelectedNetwork(net); setSelectorView('token'); }} className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-950/40 border border-slate-800 hover:border-blue-500/50 transition-all group">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                                <img src={net.icon} className="w-6 h-6" />
                             </div>
                             <div>
                               <span className="font-black text-white uppercase tracking-widest text-xs block text-left">{net.name}</span>
                               <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter text-left block">{net.tokens.length} Assets Available</span>
                             </div>
                          </div>
                          <ChevronRight size={16} className="text-slate-700" />
                       </button>
                    ))
                 ) : (
                    <>
                       <button onClick={() => { setSelectorView('network'); setTokenSearch(''); }} className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2 mb-4 p-2 hover:bg-white/5 rounded-xl transition-colors">
                          <ChevronLeft size={12}/> Switch Network
                       </button>
                       <div className="space-y-2">
                         {filteredTokens.length > 0 ? filteredTokens.map(token => (
                            <button key={token.id} onClick={() => { setSelectedToken(token); setIsDropdownOpen(false); setTokenSearch(''); }} className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-950/40 border border-slate-800 hover:border-blue-500/50 transition-all group">
                               <div className="flex items-center gap-3">
                                  <img src={token.icon} className="w-10 h-10 rounded-full border border-white/5" />
                                  <div className="text-left">
                                     <div className="font-black text-white text-xs uppercase tracking-widest">{token.symbol}</div>
                                     <div className="text-[9px] text-slate-500 font-bold">{token.name}</div>
                                  </div>
                               </div>
                               {selectedToken.id === token.id && <Check size={18} className="text-blue-500" />}
                            </button>
                         )) : (
                           <div className="text-center py-8">
                             <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">No assets found</p>
                           </div>
                         )}
                       </div>
                    </>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default PresaleCard;
