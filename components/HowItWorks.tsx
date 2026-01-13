import React from 'react';
import { Upload, Coins, Globe, Shield, Server, Repeat, Infinity as InfinityIcon, Zap, Database, Lock } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-8 bg-transparent relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white">Hosting</h2>
          <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto text-lg font-medium">
            A deep dive into our revolutionary permanent storage architecture
          </p>
        </div>

        {/* Sharding Architecture Visualization */}
        <div className="mb-12 relative scroll-card">
          <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl dark:shadow-none transition-colors">
            <h3 className="text-xl font-bold text-center mb-8 text-slate-900 dark:text-white">Sharding Architecture</h3>
            
            <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
              
              {/* User Data */}
              <div className="flex flex-col items-center animate-bounce-slow relative z-20">
                <div className="w-16 h-16 bg-white/40 dark:bg-slate-900/60 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-lg mb-2 z-10 relative">
                  <div className="text-4xl">📄</div>
                </div>
                <span className="text-slate-700 dark:text-slate-200 text-sm mt-2 font-bold">YOUR DATA</span>
              </div>

              {/* Arrow: User -> Encryption */}
              <div className="h-10 w-px bg-gradient-to-b from-slate-300 to-emerald-500 dark:from-slate-700 relative overflow-visible">
                  {/* Particle */}
                  <div className="flow-particle-y"></div>
              </div>

              {/* Encryption */}
              <div className="bg-white/40 dark:bg-slate-800/40 px-8 py-4 rounded-xl border border-emerald-500/30 flex items-center gap-3 shadow-lg dark:shadow-[0_0_15px_rgba(16,185,129,0.1)] z-10 backdrop-blur-sm relative">
                <Shield className="text-emerald-500 dark:text-emerald-400 w-5 h-5" />
                <span className="text-emerald-700 dark:text-emerald-100 font-bold tracking-wider">ENCRYPTION</span>
                {/* Visual pulse for processing */}
                <div className="absolute inset-0 border border-emerald-400/50 rounded-xl animate-ping opacity-20"></div>
              </div>

              {/* Arrow Split */}
              <div className="flex flex-col items-center w-full relative">
                  {/* Vertical line out of Encryption */}
                  <div className="h-8 w-px bg-emerald-500/50 relative overflow-visible">
                     <div className="flow-particle-y delay-500"></div>
                  </div>
                  
                  {/* Horizontal line for split */}
                  <div className="w-[80%] max-w-[500px] h-px bg-emerald-500/30 relative overflow-visible">
                      {/* Particles moving outwards from center */}
                      <div className="absolute left-1/2 top-0 h-full w-1/2 overflow-hidden">
                          <div className="flow-particle-x delay-700" style={{left: '0'}}></div>
                      </div>
                      <div className="absolute right-1/2 top-0 h-full w-1/2 overflow-hidden transform rotate-180">
                          <div className="flow-particle-x delay-700" style={{left: '0'}}></div>
                      </div>
                  </div>
              </div>

              {/* Shards */}
              <div className="grid grid-cols-4 gap-4 md:gap-8 w-full max-w-3xl">
                 {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col items-center relative group">
                       {/* Connection to horizontal line */}
                       <div className="h-8 w-px bg-emerald-500/30 mb-2 relative overflow-visible">
                          <div className="flow-particle-y delay-1000"></div>
                       </div>
                       
                       <div className="w-full aspect-square bg-white/30 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-2 group-hover:border-cyan-400 transition-colors shadow-sm dark:shadow-lg relative overflow-hidden backdrop-blur-sm">
                          <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className="text-xs text-slate-600 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors font-bold">SHARD {i}</span>
                       </div>
                       
                       {/* Line Shard -> Node */}
                       <div className="h-8 w-px bg-gradient-to-b from-slate-300 to-cyan-500 dark:from-slate-700 my-2 relative overflow-visible">
                          <div className="flow-particle-y cyan delay-200"></div>
                       </div>
                       
                       {/* Nodes */}
                       <div className="w-full aspect-square bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-cyan-500/20 dark:border-cyan-900/50 flex flex-col items-center justify-center shadow-sm dark:shadow-[0_0_10px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-shadow backdrop-blur-sm relative z-10">
                          <Server className="w-5 h-5 text-cyan-600 dark:text-cyan-500 mb-1" />
                          <span className="text-[10px] text-cyan-700 dark:text-cyan-300 font-bold">NODE {String.fromCharCode(64 + i)}</span>
                       </div>
                    </div>
                 ))}
              </div>
              
              <div className="mt-8 text-center bg-white/40 dark:bg-slate-900/40 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                 <p className="text-slate-600 dark:text-slate-300 text-xs tracking-widest uppercase flex items-center justify-center gap-2 font-bold">
                    <Globe size={14} /> Distributed Across Global Network
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
           {[
             { icon: Upload, title: "Data Upload", desc: "Your data is encrypted and split into multiple redundant shards for maximum durability." },
             { icon: Coins, title: "One-Time Payment", desc: "Pay once using FLUID tokens. Your payment funds an endowment that sustains storage forever." },
             { icon: Globe, title: "Permanent Access", desc: "Your data is distributed globally and remains accessible indefinitely—no renewals needed." }
           ].map((item, idx) => (
             <div key={idx} className="scroll-card bg-white/10 dark:bg-slate-900/30 backdrop-blur-md p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 hover:border-emerald-500/30 transition-all hover:-translate-y-1 group shadow-sm dark:shadow-none">
                <div className="w-12 h-12 bg-white/40 dark:bg-slate-800/40 rounded-xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/5 border border-slate-100/50 dark:border-transparent">
                   <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-slate-700 dark:text-slate-400 leading-relaxed text-sm font-medium">{item.desc}</p>
             </div>
           ))}
        </div>

        {/* Endowment Economics */}
        <div className="mb-12 scroll-card">
           <h3 className="text-xl font-bold text-center mb-8 text-slate-900 dark:text-white">Endowment Economics</h3>
           <div className="flex flex-col items-center max-w-3xl mx-auto">
              
              {/* Payment */}
              <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-500/20 dark:border-emerald-500/50 px-10 py-5 rounded-2xl text-center mb-0 relative z-10 backdrop-blur-sm">
                 <div className="absolute -inset-0.5 bg-emerald-500/10 dark:bg-emerald-500/20 blur-md -z-10 rounded-2xl animate-pulse"></div>
                 <h4 className="text-emerald-800 dark:text-emerald-300 font-bold mb-1 text-sm tracking-wider">ONE-TIME PAYMENT</h4>
                 <div className="flex items-center justify-center gap-2 text-slate-900 dark:text-white font-bold">
                    <Coins size={18} className="text-emerald-600 dark:text-emerald-400" /> Crypto Tokens
                 </div>
              </div>

              {/* Line: Payment -> Pool */}
              <div className="h-12 w-px bg-slate-300 dark:bg-slate-700 relative overflow-hidden">
                 <div className="flow-particle-y"></div>
              </div>

              {/* Pool */}
              <div className="bg-white/40 dark:bg-slate-800/40 px-12 py-6 rounded-2xl border border-slate-200 dark:border-slate-600 text-center mb-0 w-full max-w-sm shadow-xl relative z-10 backdrop-blur-md">
                 <h4 className="text-slate-900 dark:text-white font-bold text-lg">ENDOWMENT POOL</h4>
                 <p className="text-slate-600 dark:text-slate-300 text-xs uppercase tracking-widest mt-1 font-semibold">Protocol Treasury</p>
                 <div className="absolute inset-0 rounded-2xl border border-emerald-500/20 animate-pulse"></div>
              </div>

              {/* Yield Arrows Structure */}
              <div className="flex flex-col items-center w-full mb-2">
                 {/* Top Stem */}
                 <div className="h-8 w-px bg-slate-300 dark:bg-slate-700 relative overflow-visible">
                    <div className="flow-particle-y cyan delay-200"></div>
                 </div>
                 
                 {/* Horizontal Split */}
                 <div className="w-[60%] h-px bg-slate-300 dark:bg-slate-700 relative overflow-visible">
                     <div className="absolute left-1/2 top-0 h-full w-1/2 overflow-hidden">
                          <div className="flow-particle-x cyan delay-500" style={{left: '0'}}></div>
                      </div>
                      <div className="absolute right-1/2 top-0 h-full w-1/2 overflow-hidden transform rotate-180">
                          <div className="flow-particle-x cyan delay-500" style={{left: '0'}}></div>
                      </div>
                 </div>

                 {/* Vertical Drops */}
                 <div className="w-[60%] flex justify-between relative">
                    <div className="h-8 w-px bg-slate-300 dark:bg-slate-700 relative overflow-visible"><div className="flow-particle-y cyan delay-700"></div></div>
                    <div className="h-8 w-px bg-slate-300 dark:bg-slate-700 relative overflow-visible"><div className="flow-particle-y cyan delay-700"></div></div>
                    <div className="h-8 w-px bg-slate-300 dark:bg-slate-700 relative overflow-visible"><div className="flow-particle-y cyan delay-700"></div></div>
                 </div>
              </div>

              {/* Yield Gen */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-lg mb-0">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white/40 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center hover:border-cyan-500/30 transition-colors shadow-sm backdrop-blur-sm relative overflow-hidden group">
                       <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                       <Repeat size={20} className="mx-auto mb-2 text-cyan-600 dark:text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />
                       <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">YIELD GEN</span>
                    </div>
                 ))}
              </div>

              {/* Merge arrows */}
               <div className="flex flex-col items-center w-full mb-2">
                 <div className="w-[60%] flex justify-between max-w-lg">
                    <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 relative overflow-visible"><div className="flow-particle-y cyan delay-1000"></div></div>
                    <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 relative overflow-visible"><div className="flow-particle-y cyan delay-1000"></div></div>
                    <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 relative overflow-visible"><div className="flow-particle-y cyan delay-1000"></div></div>
                 </div>
                 <div className="w-[60%] max-w-lg h-px bg-slate-300 dark:bg-slate-700 relative overflow-visible">
                     {/* Horizontal Merge (Inwards) */}
                      <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
                          <div className="flow-particle-x cyan delay-1000" style={{left: '0'}}></div>
                      </div>
                      <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden transform rotate-180">
                          <div className="flow-particle-x cyan delay-1000" style={{left: '0'}}></div>
                      </div>
                 </div>
                 <div className="h-8 w-px bg-slate-300 dark:bg-slate-700 relative overflow-visible">
                    <div className="flow-particle-y cyan delay-200"></div>
                 </div>
              </div>
              
              {/* Incentives */}
              <div className="bg-white/40 dark:bg-slate-800/40 px-10 py-4 rounded-xl border border-cyan-500/30 text-center mb-4 w-full max-w-xs shadow-lg dark:shadow-[0_0_20px_rgba(34,211,238,0.1)] backdrop-blur-sm z-10 relative">
                 <h4 className="text-cyan-700 dark:text-cyan-300 font-bold tracking-wider text-sm">NODE INCENTIVES</h4>
                 <p className="text-slate-600 text-[10px] uppercase mt-1 font-bold">FOREVER REWARDS</p>
                 <div className="absolute -inset-px border border-cyan-400/30 rounded-xl animate-pulse"></div>
              </div>

              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700 mb-0 relative overflow-visible">
                 <div className="flow-particle-y cyan delay-500"></div>
              </div>

              {/* Permanent Storage */}
              <div className="bg-gradient-to-r from-emerald-900/80 to-cyan-900/80 dark:from-emerald-950/80 dark:to-cyan-950/80 px-12 py-6 rounded-2xl border border-white/10 text-center w-full max-w-sm shadow-xl dark:shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden group backdrop-blur-md z-10">
                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <h4 className="text-white font-bold text-lg mb-1 relative z-10">PERMANENT STORAGE</h4>
                 <InfinityIcon className="w-8 h-8 mx-auto text-emerald-400 relative z-10 mt-2" />
              </div>
           </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 scroll-card">
           <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">200+</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Years Projected</div>
           </div>
           <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">~5%</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Annual Yield</div>
           </div>
           <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">12M+</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Blocks Stored</div>
           </div>
           <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">100%</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Uptime</div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;