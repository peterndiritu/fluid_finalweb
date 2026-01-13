
import React, { useState, useEffect } from 'react';
import FluidLogo from './FluidLogo';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Fluid L1...');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Reduced delays for a snappier, "Fluid" experience while still conveying the infrastructure sync
    const timers = [
      setTimeout(() => { setStage(1); setStatusText('Syncing Global Shards...'); }, 300),
      setTimeout(() => { setStage(2); setStatusText('Activating Parmaweb Nodes...'); }, 700),
      setTimeout(() => { setStage(3); setStatusText('Infrastructure Optimized.'); }, 1100),
      setTimeout(() => { setIsExiting(true); }, 1400),
      setTimeout(() => { onComplete(); }, 1800),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#020617] flex items-center justify-center transition-all duration-700 ease-in-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Global Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <pattern id="mesh-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#3b82f6" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#mesh-grid)" />
          {/* Animated connections */}
          {stage >= 1 && (
            <g className="animate-pulse">
              <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="#10b981" strokeWidth="0.5" className="dash-anim" />
              <line x1="80%" y1="10%" x2="50%" y2="60%" stroke="#3b82f6" strokeWidth="0.5" className="dash-anim-slow" />
              <line x1="30%" y1="80%" x2="70%" y2="30%" stroke="#06b6d4" strokeWidth="0.5" className="dash-anim" />
            </g>
          )}
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Core Loading Hexagon */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className={`absolute inset-0 border border-blue-500/20 rounded-[1.5rem] transition-all duration-700 ${stage >= 1 ? 'rotate-45 scale-110 opacity-100' : 'scale-50 opacity-0'}`}></div>
          <div className={`absolute inset-0 border border-emerald-500/20 rounded-[2rem] transition-all duration-700 delay-100 ${stage >= 2 ? '-rotate-12 scale-125 opacity-100' : 'scale-50 opacity-0'}`}></div>
          
          <div className={`transition-all duration-700 ease-out z-10 ${
            stage >= 1 ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'
          }`}>
            <FluidLogo size={64} className="drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
          </div>
        </div>

        {/* Brand Reveal */}
        <div className="mt-10 text-center">
          <h1 className={`text-3xl font-extrabold tracking-tighter transition-all duration-700 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <span className="text-white">FLUID</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 ml-2">L1 NETWORK</span>
          </h1>
          <div className="h-4 mt-2 flex items-center justify-center overflow-hidden">
             <p className={`text-[9px] font-bold text-blue-400 uppercase tracking-[0.4em] transition-all duration-300 ${stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                {statusText}
             </p>
          </div>
        </div>

        {/* Infrastructure Progress Nodes */}
        <div className={`mt-10 flex gap-3 transition-all duration-700 ${stage >= 1 ? 'opacity-80' : 'opacity-0'}`}>
          {['LDN', 'NYC', 'TKO', 'SNG'].map((node, i) => (
            <div key={node} className="flex flex-col items-center">
              <div className={`w-1 h-1 rounded-full mb-1 transition-all duration-300 ${stage > i ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]' : 'bg-slate-800'}`}></div>
              <span className="text-[7px] font-bold text-slate-500">{node}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .dash-anim {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 2s linear infinite;
        }
        .dash-anim-slow {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 3s linear infinite;
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
