
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { ChevronDown, Check, AlertCircle, Info, Loader2, Zap, ChevronLeft, ChevronRight, Globe, Layers } from 'lucide-react';
import { 
  useActiveAccount, 
  useSendTransaction,
  useActiveWalletChain,
  useSwitchActiveWalletChain,
  ConnectButton
} from 'thirdweb/react';
import { 
  getContract, 
  prepareContractCall,
  toUnits,
  toWei
} from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { thirdwebClient } from "../client";
import FluidLogo from './FluidLogo';

const PRESALE_CONTRACT_ADDRESS = "0xec9123Aa60651ceee7c0E084c884Cd33478c92a5";
const FLUID_PRICE = 1.0; 

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

  const cryptoAmount = cryptoPrice > 0 ? parseFloat(usdAmount || '0') / cryptoPrice : 0;
  const fluidAmount = parseFloat(usdAmount || '0') / FLUID_PRICE;

  useEffect(() => {
    const fetchPrice = async () => {
      if (selectedToken.symbol === 'USDT') {
        setCryptoPrice(1);
        return;
      }
      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${selectedToken.symbol}USDT`);
        const data = await res.json();
        if (data.price) setCryptoPrice(parseFloat(data.price));
      } catch (e) {
        setCryptoPrice(selectedToken.symbol === 'ETH' ? 3400 : 600);
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
    
    const contract = getContract({
      client: thirdwebClient,
      chain: defineChain(selectedToken.chainId),
      address: PRESALE_CONTRACT_ADDRESS,
    });

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

  return (
    <div className="w-full max-w-[480px] mx-auto z-10">
      <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 bg-gradient-to-b from-blue-500/5 to-transparent flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white">Acquire $Fluid</h2>
            <div className="flex items-center gap-2 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Infrastructure Presale</span>
            </div>
        </div>

        {/* Stage Progress Indicator */}
        <div className="px-8 pt-8">
           <div className="flex justify-between relative">
              {/* Connector Lines */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-800 -z-0">
                 <div className="h-full bg-blue-500 w-[25%]"></div>
              </div>
              
              {STAGES.map((s) => (
                 <div key={s.id} className="relative z-10 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                       s.active 
                       ? 'bg-blue-500 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-110' 
                       : s.id < 1 ? 'bg-blue-500 border-blue-500/30' : 'bg-slate-900 border-slate-800'
                    }`}>
                       {s.id < 1 ? <Check size={14} className="text-white" /> : (
                          <span className={`text-[10px] font-bold ${s.active ? 'text-white' : 'text-slate-500'}`}>{s.id}</span>
                       )}
                    </div>
                    <div className="mt-2 text-center">
                       <div className={`text-[9px] font-bold uppercase tracking-tighter ${s.active ? 'text-blue-400' : 'text-slate-600'}`}>{s.name}</div>
                       <div className={`text-[10px] font-mono font-bold ${s.active ? 'text-white' : 'text-slate-500'}`}>{s.price}</div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        <div className="p-8 space-y-8">
            <div className="space-y-4">
                <div className="relative">
                    <input 
                        type="number"
                        value={usdAmount}
                        onChange={(e) => setUsdAmount(e.target.value)}
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-6 pl-6 pr-40 text-3xl font-bold text-white outline-none focus:border-blue-500/50 transition-colors"
                        placeholder="0.00"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl border border-white/5 transition-all active:scale-95"
                        >
                            <img src={selectedToken.icon} className="w-6 h-6 rounded-full" alt={selectedToken.symbol} />
                            <span className="font-bold text-white text-sm">{selectedToken.symbol}</span>
                            <ChevronDown size={14} className="text-slate-500" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-6 pl-6 pr-40 text-3xl font-bold text-emerald-400">
                        {fluidAmount.toLocaleString()}
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-emerald-500/10 px-4 py-3 rounded-xl border border-emerald-500/20">
                        <FluidLogo size={24} />
                        <span className="font-bold text-emerald-400 text-sm">FLUID</span>
                    </div>
                </div>
            </div>

            <div className="pt-2">
                {!account ? (
                    <div className="connect-btn-wrapper">
                        <ConnectButton 
                          client={thirdwebClient} 
                          theme="dark" 
                          connectButton={{ 
                            label: "Connect Wallet", 
                            style: { width: '100%', borderRadius: '1rem', padding: '1.25rem', background: '#3b82f6', fontWeight: 'bold' } 
                          }}
                        />
                    </div>
                ) : (
                    <button
                        onClick={handleBuy}
                        disabled={isTxPending}
                        className="w-full py-5 rounded-2xl text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                        {isTxPending ? <Loader2 size={24} className="animate-spin" /> : <Zap size={24} fill="currentColor" />}
                        {isTxPending ? 'Processing...' : 'Secure Allocation'}
                    </button>
                )}
            </div>

            {isConfirmed && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                    <Check size={20} className="text-emerald-500" />
                    <span className="text-xs font-bold text-emerald-400">Transaction Confirmed!</span>
                </div>
            )}
            
            {txError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                    <AlertCircle size={20} className="text-red-500" />
                    <span className="text-xs font-bold text-red-400">Transaction Failed</span>
                </div>
            )}

            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 px-2">
                <span className="flex items-center gap-1"><Info size={12}/> Min Buy: $50 USD</span>
                <span className="flex items-center gap-1 uppercase tracking-tighter">Current Stage: 1/4</span>
            </div>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
           <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                 <h3 className="font-bold text-white">{selectorView === 'network' ? 'Choose Network' : `Select ${selectedNetwork.name} Asset`}</h3>
                 <button onClick={() => setIsDropdownOpen(false)} className="text-slate-500">✕</button>
              </div>
              <div className="p-4 space-y-2">
                 {selectorView === 'network' ? (
                    NETWORKS.map(net => (
                       <button key={net.id} onClick={() => { setSelectedNetwork(net); setSelectorView('token'); }} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
                          <div className="flex items-center gap-3">
                             <img src={net.icon} className="w-8 h-8 rounded-full" />
                             <span className="font-bold text-white">{net.name}</span>
                          </div>
                          <ChevronRight size={16} className="text-slate-500" />
                       </button>
                    ))
                 ) : (
                    <>
                       <button onClick={() => setSelectorView('network')} className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2 mb-2 p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <ChevronLeft size={12}/> Change Network
                       </button>
                       {selectedNetwork.tokens.map(token => (
                          <button key={token.id} onClick={() => { setSelectedToken(token); setIsDropdownOpen(false); setSelectorView('network'); }} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                             <div className="flex items-center gap-3">
                                <img src={token.icon} className="w-8 h-8 rounded-full" />
                                <div>
                                   <div className="font-bold text-white text-sm">{token.symbol}</div>
                                   <div className="text-[10px] text-slate-500">{token.name}</div>
                                </div>
                             </div>
                             {selectedToken.id === token.id && <Check size={16} className="text-blue-500" />}
                          </button>
                       ))}
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
