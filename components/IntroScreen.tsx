
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
    // Fast sequence for a snappier feel while maintaining high-tech aesthetics
    const timers = [
      setTimeout(() => { setStage(1); setStatusText('Establishing Global Mesh...'); }, 250),
      setTimeout(() => { setStage(2); setStatusText('Syncing Distributed Shards...'); }, 650),
      setTimeout(() => { setStage(3); setStatusText('Network Optimized. Ready.'); }, 1050),
      setTimeout(() => { setIsExiting(true); }, 1350),
      setTimeout(() => { onComplete(); }, 1750),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  // Node locations for the global map visualization (approximate percentage coords)
  const nodes = [
    { label: 'LDN', x: 48, y: 32 },
    { label: 'NYC', x: 28, y: 38 },
    { label: 'TKO', x: 82, y: 42 },
    { label: 'SNG', x: 75, y: 65 },
    { label: 'SFO', x: 18, y: 40 },
    { label: 'DXB', x: 58, y: 48 }
  ];

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#020617] flex items-center justify-center transition-all duration-700 ease-in-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Globalized Infrastructure Visualization */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          {/* Faded World Outline (Simplified representation) */}
          <path 
            d="M150,200 Q200,150 300,180 T450,220 T600,180 T750,250 T900,200 V400 Q800,450 700,420 T500,480 T300,420 T100,400 Z" 
            fill="none" 
            stroke="#1e293b" 
            strokeWidth="0.5" 
            className="opacity-20"
          />
          
          {/* Connecting Mesh Lines */}
          <g className="transition-opacity duration-1000">
            {stage >= 1 && nodes.map((node, i) => (
              nodes.slice(i + 1).map((target, j) => (
                <line 
                  key={`${i}-${j}`}
                  x1={`${node.x}%`} y1={`${node.y}%`}
                  x2={`${target.x}%`} y2={`${target.y}%`}
                  stroke={stage >= 2 ? "#10b981" : "#334155"}
                  strokeWidth="0.2"
                  className={`transition-colors duration-700 ${stage >= 1 ? 'dash-anim' : ''}`}
                  opacity={stage >= 2 ? "0.4" : "0.1"}
                />
              ))
            ))}
          </g>

          {/* Active Pings */}
          {nodes.map((node, i) => (
            <g key={node.label} transform={`translate(${node.x * 10}, ${node.y * 6})`}>
              <circle 
                r="3" 
                className={`transition-all duration-500 ${stage > (i % 3) ? 'fill-emerald-500 shadow-glow' : 'fill-slate-800'}`} 
              />
              {stage > (i % 3) && (
                <circle r="3" className="fill-emerald-500 animate-ping opacity-75" />
              )}
            </g>
          ))}
        </svg>
        
        {/* Radial Gradients for Depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Central Core Branding */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Animated Tech Orbits */}
          <div className={`absolute inset-0 border border-blue-500/10 rounded-[2.5rem] transition-all duration-1000 ${stage >= 1 ? 'rotate-90 scale-110 opacity-100' : 'scale-50 opacity-0'}`}></div>
          <div className={`absolute inset-0 border border-emerald-500/10 rounded-[3rem] transition-all duration-1000 delay-100 ${stage >= 2 ? '-rotate-45 scale-125 opacity-100' : 'scale-50 opacity-0'}`}></div>
          
          <div className={`transition-all duration-1000 ease-out z-10 ${
            stage >= 1 ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 -rotate-90'
          }`}>
            <FluidLogo size={80} className="drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]" />
          </div>
        </div>

        {/* Global Status Text */}
        <div className="mt-12 text-center">
          <h1 className={`text-4xl font-extrabold tracking-tighter transition-all duration-700 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-white">FLUID</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 ml-2">L1 NETWORK</span>
          </h1>
          
          <div className="h-6 mt-4 flex flex-col items-center overflow-hidden">
             <p className={`text-[10px] font-bold text-blue-400 uppercase tracking-[0.6em] transition-all duration-300 ${stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                {statusText}
             </p>
             <div className="mt-2 w-32 h-0.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-700 ease-out" 
                  style={{ width: `${(stage / 3) * 100}%` }}
                ></div>
             </div>
          </div>
        </div>

        {/* Horizontal Node Indicators */}
        <div className={`mt-10 flex gap-4 transition-all duration-700 delay-200 ${stage >= 1 ? 'opacity-60' : 'opacity-0'}`}>
          {nodes.slice(0, 4).map((node, i) => (
            <div key={node.label} className="flex flex-col items-center">
              <div className={`w-1.5 h-1.5 rounded-full mb-1.5 transition-all duration-300 ${stage > (i % 3) ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-800'}`}></div>
              <span className="text-[8px] font-bold text-slate-500 tracking-widest">{node.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .dash-anim {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 3s linear infinite;
        }
        .shadow-glow {
          filter: drop-shadow(0 0 4px #10b981);
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
