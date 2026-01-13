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
import FluidLogo from './FluidLogo';

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
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, [selectedToken]);

  const handleBuy = async () => {
    if (!account || !usdAmount) return;
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
    <div className="w-full max-w-[500px] mx-auto z-10">
      <div className="bg-slate-950/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] transition-all duration-500">
        
        <div className="p-10 border-b border-white/5 flex flex-col items-center bg-gradient-to-b from-white/10 to-transparent">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Purchase $Fluid</h2>
            <div className="flex items-center gap-2 mt-4">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                   Infrastructure Round 1
                </span>
            </div>
        </div>

        <div className="p-10 space-y-10">
            <div className="space-y-6">
                {/* Input Section */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Amount in USD</label>
                      <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">Rate: 1 {selectedToken.symbol} ≈ ${cryptoPrice.toLocaleString()}</span>
                    </div>
                    <div className="relative group" ref={dropdownRef}>
                        <input 
                            type="number"
                            value={usdAmount}
                            onChange={(e) => setUsdAmount(e.target.value)}
                            className="w-full bg-slate-900/40 border border-white/10 rounded-[2rem] py-7 pl-8 pr-48 text-4xl font-extrabold text-white placeholder-slate-800 focus:outline-none focus:border-blue-500/40 transition-all shadow-inner"
                            placeholder="0.00"
                        />
                        
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-5 py-4 rounded-2xl border border-white/10 transition-all group active:scale-95 shadow-xl"
                          >
                            <img src={selectedToken.icon} className="w-8 h-8 rounded-full shadow-lg" alt={selectedToken.symbol} />
                            <div className="text-left">
                                <div className="text-xs font-bold text-white leading-none">{selectedToken.symbol}</div>
                                <div className="text-[10px] text-slate-500 font-mono leading-none mt-2">
                                    {cryptoAmount.toFixed(selectedToken.decimals > 8 ? 4 : 2)}
                                </div>
                            </div>
                            <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {isDropdownOpen && (
                            <div className="absolute right-0 top-full mt-4 w-72 bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.8)] overflow-hidden z-50 animate-fade-in-up">
                              {selectorView === 'network' ? (
                                <div className="p-4">
                                  <div className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] border-b border-white/5 mb-3">Choose Network</div>
                                  <div className="space-y-1.5">
                                    {NETWORKS.map((net) => (
                                      <button
                                        key={net.id}
                                        onClick={() => {
                                          setSelectedNetwork(net);
                                          setSelectorView('token');
                                        }}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                                          selectedNetwork.id === net.id 
                                          ? 'bg-white/10 border border-white/10' 
                                          : 'hover:bg-white/5 border border-transparent'
                                        }`}
                                      >
                                        <div className="flex items-center gap-4">
                                          <img src={net.icon} className="w-7 h-7 rounded-full" alt={net.name} />
                                          <span className="text-sm font-bold text-white group-hover:translate-x-1 transition-transform">{net.name}</span>
                                        </div>
                                        <ChevronRight size={14} className="text-slate-500" />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <div className="p-4">
                                  <button 
                                    onClick={() => setSelectorView('network')}
                                    className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:bg-white/5 rounded-xl mb-3 transition-colors"
                                  >
                                    <ChevronLeft size={12} /> Change Network
                                  </button>
                                  <div className="space-y-1.5">
                                    {selectedNetwork.tokens.map((token) => (
                                      <button
                                        key={token.id}
                                        onClick={() => {
                                          setSelectedToken(token);
                                          setIsDropdownOpen(false);
                                          setSelectorView('network');
                                        }}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                                          selectedToken.id === token.id 
                                          ? 'bg-blue-500/10 border border-blue-500/20' 
                                          : 'hover:bg-white/5 border border-transparent'
                                        }`}
                                      >
                                        <div className="flex items-center gap-4">
                                          <img src={token.icon} className="w-7 h-7 rounded-full" alt={token.symbol} />
                                          <div className="text-left">
                                            <div className="text-sm font-bold text-white">{token.symbol}</div>
                                            <div className="text-[10px] text-slate-500">{token.name}</div>
                                          </div>
                                        </div>
                                        {selectedToken.id === token.id && <Check size={16} className="text-blue-500" />}
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

                {/* Output Section */}
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 ml-1 uppercase tracking-widest">Estimated $Fluid Allocation</label>
                    <div className="relative">
                        <div className="w-full bg-slate-900/40 border border-white/10 rounded-[2rem] py-7 pl-8 pr-32 text-4xl font-extrabold text-emerald-400 cursor-default shadow-inner">
                            {fluidAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3 bg-emerald-500/10 px-6 py-4 rounded-2xl border border-emerald-500/20 shadow-lg">
                            <FluidLogo className="w-8 h-8" />
                            <span className="text-xs font-bold text-emerald-400 tracking-wider">Fluid</span>
                        </div>
                    </div>
                    <div className="flex justify-between px-2 text-[10px] font-bold text-slate-500">
                        <span className="text-blue-400/80">Listing Price: $1.50</span>
                        <span className="flex items-center gap-1.5 uppercase tracking-tighter"><Info size={12} className="text-slate-600"/> 1 Fluid = ${fluidPrice.toFixed(2)} USD</span>
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
                            label: "Connect to Purchase", 
                            style: { 
                              width: '100%', 
                              borderRadius: '2rem', 
                              padding: '1.5rem',
                              background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                              color: '#ffffff',
                              fontWeight: 'bold',
                              fontSize: '1.125rem',
                              boxShadow: '0 20px 40px -12px rgba(59, 130, 246, 0.4)'
                            }
                          }}
                        />
                    </div>
                ) : (
                    <button
                        onClick={handleBuy}
                        disabled={isTxPending}
                        className="w-full py-6 rounded-[2rem] text-xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:brightness-110 active:scale-[0.98] transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-4 group"
                    >
                        {isTxPending ? <Loader2 size={28} className="animate-spin" /> : <Zap size={28} fill="currentColor" className="group-hover:scale-125 transition-transform" />}
                        {isTxPending ? 'Confirming...' : 'Secure My Allocation'}
                    </button>
                )}
            </div>
            
            {/* Success/Error Feedback */}
            {isConfirmed && (
                <div className="p-6 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-5 animate-fade-in-up">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Check size={24} className="text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-emerald-400">Transaction Confirmed!</p>
                      <p className="text-[11px] text-emerald-300 opacity-60">Your $Fluid tokens have been allocated to your wallet address.</p>
                    </div>
                </div>
            )}
            {txError && (
                <div className="p-6 rounded-[2rem] bg-red-500/10 border border-red-500/20 flex items-center gap-5 animate-fade-in-up">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center shrink-0">
                      <AlertCircle size={24} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-red-400">Transaction Failed</p>
                      <p className="text-[11px] text-red-300 opacity-60">Check your balance and try again. Gas may be high.</p>
                    </div>
                </div>
            )}

            {/* Bottom Help Text */}
            <div className="bg-white/5 rounded-[2rem] p-6 border border-white/5 flex items-start gap-4">
              <div className="p-2 bg-blue-500/10 rounded-xl">
                 <Lightbulb className="text-blue-400" size={20} />
              </div>
              <p className="text-[12px] leading-relaxed text-slate-400">
                Participation in the Fluid Presale grants early access to the <span className="text-blue-400 font-bold">L1 Ecosystem</span>. Tokens are securely tracked on the blockchain.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PresaleCard;