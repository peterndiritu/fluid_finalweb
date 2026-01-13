import React, { useEffect, useState, useMemo, useRef } from 'react';
import { ChevronDown, Lightbulb, Check, AlertCircle, Info, Loader2, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  ConnectButton, 
  useActiveAccount, 
  useSendTransaction,
  useActiveWalletChain,
  useSwitchActiveWalletChain
} from 'thirdweb/react';
import { 
  getContract, 
  prepareContractCall,
  toUnits,
  toWei
} from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { createWallet } from "thirdweb/wallets";
import { thirdwebClient } from "../client";

// --- Configuration ---
const PRESALE_CONTRACT_ADDRESS = "0xec9123Aa60651ceee7c0E084c884Cd33478c92a5";
const FALLBACK_FLUID_PRICE = 1.0; // 1 USDT per FLUID

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
    name: "BNB Smart Chain",
    symbol: "BNB",
    icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026",
    tokens: [
      { id: 'bnb', symbol: 'BNB', name: 'BNB', chainId: 56, icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026', isNative: true, decimals: 18 },
      { id: 'usdt_bsc', symbol: 'USDT', name: 'Tether', chainId: 56, icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=026', isNative: false, address: "0x55d398326f99059fF775485246999027B3197955", decimals: 18 },
      { id: 'busd_bsc', symbol: 'BUSD', name: 'BUSD', chainId: 56, icon: 'https://cryptologos.cc/logos/binance-usd-busd-logo.png?v=026', isNative: false, address: "0xe9e7CEA3dedcA5984780Bafc599bD69ADd087D56", decimals: 18 },
    ]
  },
  {
    id: 137,
    name: "Polygon",
    symbol: "MATIC",
    icon: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=026",
    tokens: [
      { id: 'matic', symbol: 'MATIC', name: 'Polygon', chainId: 137, icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=026', isNative: true, decimals: 18 },
      { id: 'usdc_poly', symbol: 'USDC', name: 'USD Coin', chainId: 137, icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026', isNative: false, address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", decimals: 6 },
      { id: 'usdt_poly', symbol: 'USDT', name: 'Tether', chainId: 137, icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=026', isNative: false, address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", decimals: 6 },
    ]
  }
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
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSelectorView('network');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Supported wallets (same list as App.tsx for consistency)
  const wallets = useMemo(() => [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
  ], []);

  const [usdAmount, setUsdAmount] = useState<string>('100');
  const [cryptoPrice, setCryptoPrice] = useState<number>(0);
  const [fluidPrice] = useState<number>(FALLBACK_FLUID_PRICE);
  
  const cryptoAmount = cryptoPrice > 0 && usdAmount ? parseFloat(usdAmount) / cryptoPrice : 0;
  const fluidAmount = usdAmount ? parseFloat(usdAmount) / fluidPrice : 0;

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        let symbol = selectedToken.symbol;
        if (symbol === 'USDT' || symbol === 'USDC' || symbol === 'BUSD') {
          setCryptoPrice(1);
          return;
        }
        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
        const data = await res.json();
        if (data.price) setCryptoPrice(parseFloat(data.price));
      } catch (e) {
        if (selectedToken.symbol === 'ETH') setCryptoPrice(3200);
        if (selectedToken.symbol === 'BNB') setCryptoPrice(600);
        if (selectedToken.symbol === 'MATIC') setCryptoPrice(0.70);
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, [selectedToken]);

  const handleBuy = async () => {
    if (!account || !usdAmount) return;

    // Check if on correct chain
    if (activeChain?.id !== selectedToken.chainId) {
        try {
            await switchChain(defineChain(selectedToken.chainId));
        } catch (e) {
            console.error("Failed to switch chain", e);
            return;
        }
    }
    
    const chain = defineChain(selectedToken.chainId);
    const contract = getContract({
      client: thirdwebClient,
      chain: chain,
      address: PRESALE_CONTRACT_ADDRESS,
    });

    try {
      let tx;
      if (selectedToken.isNative) {
        tx = prepareContractCall({
          contract,
          method: "function buyWithNative() payable",
          params: [],
          value: toWei(cryptoAmount.toFixed(18)),
        });
      } else {
        tx = prepareContractCall({
          contract,
          method: "function buyWithToken(address token, uint256 amount)",
          params: [selectedToken.address as string, toUnits(cryptoAmount.toFixed(selectedToken.decimals), selectedToken.decimals)],
        });
      }
      sendTransaction(tx);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto z-10">
      <div className="bg-slate-950/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex flex-col items-center bg-gradient-to-b from-white/5 to-transparent">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Purchase $FLUID</h2>
            <div className="flex items-center gap-2 mt-3">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                   Active Presale Pool
                </span>
            </div>
        </div>

        <div className="p-8 space-y-8">
            {/* Input Section */}
            <div className="space-y-5">
                <div className="space-y-2">
                    <div className="flex justify-between items-end px-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Amount in USD</label>
                      <span className="text-[10px] font-mono text-slate-400">Rate: 1 {selectedToken.symbol} ≈ ${cryptoPrice.toLocaleString()}</span>
                    </div>
                    <div className="relative group" ref={dropdownRef}>
                        <input 
                            type="number"
                            value={usdAmount}
                            onChange={(e) => setUsdAmount(e.target.value)}
                            className="w-full bg-slate-900/40 border border-white/10 rounded-3xl py-6 pl-6 pr-44 text-3xl font-bold text-white placeholder-slate-700 focus:outline-none focus:border-lime-500/30 transition-all shadow-inner"
                            placeholder="0.00"
                        />
                        
                        {/* Token Selector Button */}
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                          <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 px-4 py-3 rounded-2xl border border-white/10 transition-all group active:scale-95"
                          >
                            <img src={selectedToken.icon} className="w-7 h-7 rounded-full shadow-lg" alt={selectedToken.symbol} />
                            <div className="text-left">
                                <div className="text-xs font-bold text-white leading-none">{selectedToken.symbol}</div>
                                <div className="text-[10px] text-slate-500 font-mono leading-none mt-1.5">
                                    {cryptoAmount.toFixed(selectedToken.decimals > 8 ? 4 : 2)}
                                </div>
                            </div>
                            <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {/* Multi-step Dropdown */}
                          {isDropdownOpen && (
                            <div className="absolute right-0 top-full mt-3 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-50 animate-fade-in-up">
                              {selectorView === 'network' ? (
                                <div className="p-3">
                                  <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 mb-2">Select Network</div>
                                  <div className="space-y-1">
                                    {NETWORKS.map((net) => (
                                      <button
                                        key={net.id}
                                        onClick={() => {
                                          setSelectedNetwork(net);
                                          setSelectorView('token');
                                        }}
                                        className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all group ${
                                          selectedToken.chainId === net.id 
                                          ? 'bg-white/10 border border-white/10' 
                                          : 'hover:bg-white/5 border border-transparent'
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <img src={net.icon} className="w-6 h-6 rounded-full" alt={net.name} />
                                          <span className="text-sm font-bold text-white group-hover:translate-x-1 transition-transform">{net.name}</span>
                                        </div>
                                        <ChevronRight size={14} className="text-slate-500" />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <div className="p-3">
                                  <button 
                                    onClick={() => setSelectorView('network')}
                                    className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold text-lime-400 uppercase tracking-widest hover:bg-white/5 rounded-lg mb-2 transition-colors"
                                  >
                                    <ChevronLeft size={12} /> Back to Networks
                                  </button>
                                  <div className="space-y-1">
                                    {selectedNetwork.tokens.map((token) => (
                                      <button
                                        key={token.id}
                                        onClick={() => {
                                          setSelectedToken(token);
                                          setIsDropdownOpen(false);
                                          setSelectorView('network');
                                        }}
                                        className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                                          selectedToken.id === token.id 
                                          ? 'bg-lime-500/10 border border-lime-500/20' 
                                          : 'hover:bg-white/5 border border-transparent'
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <img src={token.icon} className="w-6 h-6 rounded-full" alt={token.symbol} />
                                          <div className="text-left">
                                            <div className="text-sm font-bold text-white">{token.symbol}</div>
                                            <div className="text-[10px] text-slate-500">{token.name}</div>
                                          </div>
                                        </div>
                                        {selectedToken.id === token.id && <Check size={14} className="text-lime-500" />}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                    </div>
                </div>

                {/* Receiver Section */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 ml-1 uppercase tracking-wider">You Receive ($FLUID)</label>
                    <div className="relative">
                        <div className="w-full bg-slate-900/40 border border-white/10 rounded-3xl py-6 pl-6 pr-32 text-3xl font-bold text-emerald-400 cursor-default shadow-inner">
                            {fluidAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-3 bg-emerald-500/10 px-5 py-3 rounded-2xl border border-emerald-500/20">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-[10px] text-white font-bold shadow-lg shadow-blue-500/20">F</div>
                            <span className="text-xs font-bold text-emerald-400 tracking-wider">FLUID</span>
                        </div>
                    </div>
                    <div className="flex justify-between px-1 text-[10px] font-medium text-slate-500">
                        <span>Launch Listing: $1.50</span>
                        <span className="flex items-center gap-1"><Info size={10} /> 1 FLUID = ${fluidPrice.toFixed(2)} USD</span>
                    </div>
                </div>
            </div>

            {/* Action Section */}
            <div className="pt-2">
                {!account ? (
                    <div className="flex justify-center connect-btn-wrapper">
                        <ConnectButton 
                          client={thirdwebClient} 
                          theme="dark" 
                          wallets={wallets}
                          connectButton={{ 
                            label: "Connect Wallet", 
                            style: { 
                              width: '100%', 
                              borderRadius: '1.5rem', 
                              padding: '1.25rem',
                              background: 'linear-gradient(to right, #84cc16, #22c55e)',
                              color: '#020617',
                              fontWeight: 'bold',
                              fontSize: '1.125rem'
                            }
                          }}
                        />
                    </div>
                ) : (
                    <button
                        onClick={handleBuy}
                        disabled={isTxPending}
                        className="w-full py-5 rounded-3xl text-lg font-bold bg-gradient-to-r from-lime-400 to-green-500 text-slate-900 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-lime-500/20 flex items-center justify-center gap-3 group"
                    >
                        {isTxPending ? <Loader2 size={24} className="animate-spin" /> : <Zap size={24} fill="currentColor" className="group-hover:scale-125 transition-transform" />}
                        {isTxPending ? 'Confirming Purchase...' : 'Buy $FLUID Now'}
                    </button>
                )}
            </div>
            
            {/* Notifications */}
            {isConfirmed && (
                <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4 animate-fade-in-up">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Check size={20} className="text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-emerald-400">Transaction Successful!</p>
                      <p className="text-[10px] text-emerald-300 opacity-70">Tokens will be unlocked at the Token Generation Event (TGE).</p>
                    </div>
                </div>
            )}
            {txError && (
                <div className="p-5 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center gap-4 animate-fade-in-up">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                      <AlertCircle size={20} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-red-400">Purchase Error</p>
                      <p className="text-[10px] text-red-300 opacity-70">Please verify your wallet balance and network connection.</p>
                    </div>
                </div>
            )}

            {/* Hint */}
            <div className="bg-white/5 rounded-3xl p-5 border border-white/5 flex items-start gap-4">
              <Lightbulb className="text-yellow-400 shrink-0 mt-0.5" size={20} />
              <p className="text-[11px] leading-relaxed text-slate-400">
                Purchase over <span className="text-white font-bold">$1,000</span> worth of $FLUID to unlock a <span className="text-lime-400 font-bold">Fluid Metal Card</span> and priority hosting allocation.
              </p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default PresaleCard;