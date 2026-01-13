import React, { useEffect, useState } from 'react';
import { ChevronDown, Lightbulb, Wallet, Check, AlertCircle, Info, Loader2 } from 'lucide-react';
import { 
  useAccount, 
  useWriteContract, 
  useSwitchChain, 
  useChainId,
  useWaitForTransactionReceipt 
} from 'wagmi';
import { parseUnits, parseEther } from 'viem';

// --- Configuration ---
const PRESALE_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890" as `0x${string}`;
const FALLBACK_FLUID_PRICE = 1.0; // Updated price: 1 USDT per FLUID

interface PaymentOption {
  id: string;
  symbol: string;
  name: string;
  network: string;
  chainId: number;
  icon: string;
  isNative: boolean;
  address?: `0x${string}`;
  decimals: number;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', network: 'ERC-20', chainId: 1, icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026', isNative: true, decimals: 18 },
  { id: 'bnb', symbol: 'BNB', name: 'BNB Smart Chain', network: 'BEP-20', chainId: 56, icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026', isNative: true, decimals: 18 },
  { id: 'usdt_eth', symbol: 'USDT', name: 'Tether', network: 'ERC-20', chainId: 1, icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=026', isNative: false, address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" as `0x${string}`, decimals: 6 },
  { id: 'usdc_poly', symbol: 'USDC', name: 'USD Coin', network: 'Polygon', chainId: 137, icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026', isNative: false, address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" as `0x${string}`, decimals: 6 },
  { id: 'matic', symbol: 'MATIC', name: 'Polygon', network: 'Polygon', chainId: 137, icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=026', isNative: true, decimals: 18 },
];

const PresaleCard: React.FC = () => {
  const { isConnected } = useAccount();
  const currentChainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { writeContract, data: hash, isPending: isWritePending, error: writeError } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [selectedPayment, setSelectedPayment] = useState<PaymentOption>(PAYMENT_OPTIONS[0]);
  const [usdAmount, setUsdAmount] = useState<string>('100');
  const [cryptoPrice, setCryptoPrice] = useState<number>(0);
  const [fluidPrice] = useState<number>(FALLBACK_FLUID_PRICE);
  const [showMore, setShowMore] = useState(false);
  
  const cryptoAmount = cryptoPrice > 0 && usdAmount ? parseFloat(usdAmount) / cryptoPrice : 0;
  const fluidAmount = usdAmount ? parseFloat(usdAmount) / fluidPrice : 0;

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        let symbol = selectedPayment.symbol;
        if (symbol === 'USDT' || symbol === 'USDC') {
          setCryptoPrice(1);
          return;
        }
        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
        const data = await res.json();
        if (data.price) setCryptoPrice(parseFloat(data.price));
      } catch (e) {
        if (selectedPayment.symbol === 'ETH') setCryptoPrice(3200);
        if (selectedPayment.symbol === 'BNB') setCryptoPrice(600);
        if (selectedPayment.symbol === 'MATIC') setCryptoPrice(0.70);
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, [selectedPayment]);

  const handleBuy = async () => {
    if (!isConnected || !usdAmount) return;
    
    // 1. Check Network
    if (currentChainId !== selectedPayment.chainId) {
       switchChain({ chainId: selectedPayment.chainId });
       return;
    }

    try {
      if (selectedPayment.isNative) {
        writeContract({
          address: PRESALE_CONTRACT_ADDRESS,
          abi: [
            {
              name: 'buyWithNative',
              type: 'function',
              stateMutability: 'payable',
              inputs: [],
              outputs: [],
            },
          ],
          functionName: 'buyWithNative',
          value: parseEther(cryptoAmount.toFixed(18)),
        });
      } else {
        // Simplified buy logic
        writeContract({
          address: PRESALE_CONTRACT_ADDRESS,
          abi: [
            {
              name: 'buyWithToken',
              type: 'function',
              stateMutability: 'nonpayable',
              inputs: [
                { name: 'token', type: 'address' },
                { name: 'amount', type: 'uint256' },
              ],
              outputs: [],
            },
          ],
          functionName: 'buyWithToken',
          args: [selectedPayment.address, parseUnits(cryptoAmount.toFixed(selectedPayment.decimals), selectedPayment.decimals)],
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const status = isWritePending || isConfirming ? 'PENDING' : (isConfirmed ? 'SUCCESS' : (writeError ? 'ERROR' : 'IDLE'));

  return (
    <div className="w-full max-w-[480px] mx-auto z-10">
      <div className="bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white tracking-tight">Buy $FLUID Presale</h2>
            <div className="flex items-center gap-2 mt-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Sale is Live</span>
            </div>
        </div>

        <div className="p-6 space-y-6">
            {/* Payment Selector */}
            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-medium text-xs">Select Payment Method</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Info size={10} /> Multi-Chain Supported
                    </span>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                    {PAYMENT_OPTIONS.slice(0, 4).map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => setSelectedPayment(opt)}
                            className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 group ${
                                selectedPayment.id === opt.id 
                                ? 'bg-white/10 border-lime-500/50 shadow-[0_0_15px_rgba(132,204,22,0.15)]' 
                                : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                            }`}
                        >
                            <img src={opt.icon} alt={opt.symbol} className="w-8 h-8 rounded-full mb-1.5 shadow-sm" />
                            <span className="text-[10px] font-bold text-slate-300">{opt.symbol}</span>
                            <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-[8px] text-slate-400 border border-slate-700 px-1 rounded-sm scale-75 origin-center">
                                {opt.network}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">You Pay (USD)</label>
                    <div className="relative group">
                        <input 
                            type="number"
                            value={usdAmount}
                            onChange={(e) => setUsdAmount(e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-4 pr-32 text-2xl font-bold text-white placeholder-slate-600 focus:outline-none focus:border-lime-500/50 transition-all"
                            placeholder="0.00"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                            <img src={selectedPayment.icon} className="w-5 h-5 rounded-full" />
                            <div className="text-right">
                                <div className="text-[10px] font-bold text-white leading-none">{selectedPayment.symbol}</div>
                                <div className="text-[10px] text-slate-500 font-mono leading-none mt-1">
                                    {cryptoAmount.toFixed(4)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">You Receive ($FLUID)</label>
                    <div className="relative">
                        <div className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-4 pr-32 text-2xl font-bold text-emerald-400 cursor-default">
                            {fluidAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-[10px] text-white font-bold">F</div>
                            <span className="text-[10px] font-bold text-emerald-400">FLUID</span>
                        </div>
                    </div>
                    <div className="flex justify-between px-1 text-[10px] font-medium text-slate-500">
                        <span>1 FLUID = ${fluidPrice.toFixed(2)} USDT</span>
                    </div>
                </div>
            </div>

            <div className="pt-2">
                {!isConnected ? (
                    <div className="flex justify-center">
                        <appkit-button />
                    </div>
                ) : (
                    <button
                        onClick={handleBuy}
                        disabled={status === 'PENDING'}
                        className="w-full py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-lime-400 to-green-500 text-slate-900 hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        {status === 'PENDING' ? <Loader2 size={20} className="animate-spin" /> : <Wallet size={20} />}
                        {status === 'PENDING' ? 'Confirming...' : 'Buy Tokens'}
                    </button>
                )}
            </div>
            
            {status === 'SUCCESS' && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 animate-fade-in-up">
                    <Check size={18} className="text-emerald-500" />
                    <p className="text-xs text-emerald-200">Purchase successful! Tokens will be airdropped.</p>
                </div>
            )}
            {status === 'ERROR' && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 animate-fade-in-up">
                    <AlertCircle size={18} className="text-red-500" />
                    <p className="text-xs text-red-200">Transaction failed. Try again.</p>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default PresaleCard;