import React, { useState } from 'react';
import { Zap, Shield, Layers, Code2, Globe, Cpu, CheckCircle, Wifi, Copy, Check, Wallet } from 'lucide-react';
import { ConnectButton } from "thirdweb/react";
import { thirdwebClient } from "../client";

const BlockchainPage: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      
      {/* Hero */}
      <section className="text-center px-4 mb-24">
        <div className="inline-block px-4 py-2 rounded-full bg-purple-600/10 border border-purple-600/30 mb-6">
           <span className="text-purple-500 font-bold uppercase tracking-wider text-sm">Powered by Polygon</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6">
           Liquid Assets on the <br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">Polygon Network</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
           Fluid integrates directly with Polygon Mainnet to provide sub-second transaction speeds, negligible gas fees, and enterprise-grade security.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button className="px-8 py-4 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/25">
                Start Building
             </button>
             <button className="px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                View on PolygonScan
             </button>
        </div>
      </section>

      {/* Key Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
               <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">65k+</div>
               <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Network TPS</div>
            </div>
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
               <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">~2s</div>
               <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Block Time</div>
            </div>
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
               <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">&lt;$0.01</div>
               <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Avg Gas Fee</div>
            </div>
            <div className="text-center p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
               <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">100%</div>
               <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">EVM Native</div>
            </div>
         </div>
      </section>

      {/* Architecture Features */}
      <section className="bg-white dark:bg-slate-900/50 py-24 border-y border-slate-200 dark:border-slate-800 mb-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-16 text-slate-900 dark:text-white">Fluid & Polygon Synergy</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {/* Feature 1 */}
               <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all group">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                     <Layers size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Scalable Infrastructure</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                     By leveraging Polygon's proof-of-stake architecture, Fluid achieves institutional-grade throughput while maintaining low entry costs for users.
                  </p>
               </div>

               {/* Feature 2 */}
               <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all group">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-500 group-hover:scale-110 transition-transform">
                     <Code2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Seamless EVM Dev</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                     Full compatibility with Ethereum tools. Fluid dApps run on the Polygon Virtual Machine with no specialized code required.
                  </p>
               </div>

               {/* Feature 3 */}
               <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-800 hover:border-purple-500/50 transition-all group">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                     <Shield size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Secured by Polygon</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                     Inherit the security of the Polygon network, one of the most battle-tested and widely adopted proof-of-stake chains in existence.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Quick Connect Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mb-24">
         <div className="max-w-xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
               <Wifi className="text-purple-400" />
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Network Settings</h2>
            </div>
            
            <div className="bg-white dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 relative shadow-lg">
               <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">Mainnet</span>
               </div>
               
               <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                     <span className="text-slate-500 dark:text-slate-400">Network Name</span>
                     <span className="text-slate-900 dark:text-white font-medium">Polygon Mainnet</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800 group cursor-pointer" onClick={() => copyToClipboard('https://polygon-rpc.com', 'rpc')}>
                     <span className="text-slate-500 dark:text-slate-400">RPC URL</span>
                     <div className="flex items-center gap-2">
                        <span className="text-purple-600 dark:text-purple-400 font-medium truncate max-w-[150px]">https://polygon-rpc.com</span>
                        {copiedField === 'rpc' ? <Check size={14} className="text-emerald-500"/> : <Copy size={14} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white"/>}
                     </div>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                     <span className="text-slate-500 dark:text-slate-400">Chain ID</span>
                     <span className="text-slate-900 dark:text-white font-medium">137</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                     <span className="text-slate-500 dark:text-slate-400">Currency Symbol</span>
                     <span className="text-slate-900 dark:text-white font-medium">POL</span>
                  </div>

                  <div className="flex justify-between items-center">
                     <span className="text-slate-500 dark:text-slate-400">Block Explorer</span>
                     <span className="text-purple-600 dark:text-purple-400 underline decoration-purple-400/30">https://polygonscan.com</span>
                  </div>
               </div>

               <div className="mt-6 flex flex-col gap-3">
                  <ConnectButton 
                    client={thirdwebClient} 
                    theme="dark"
                    connectButton={{ label: "Connect to Polygon", style: { width: '100%', padding: '0.75rem' } }}
                  />
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="text-center px-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl">
             <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Join the Polygon Revolution</h2>
             <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Fluid is scaling the future of finance and storage on the world's most accessible blockchain.
             </p>
             <button className="px-10 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-purple-50 transition-colors shadow-lg">
                View Fluid Ecosystem
             </button>
          </div>
      </section>

    </div>
  );
};

export default BlockchainPage;