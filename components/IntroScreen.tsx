import React, { useState, useEffect } from 'react';
import FluidLogo from './FluidLogo';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Stage 0: Initial pulsing ring
    const timer1 = setTimeout(() => setStage(1), 1000);
    // Stage 1: Logo reveal
    const timer2 = setTimeout(() => setStage(2), 2000);
    // Stage 2: Brand name reveal
    const timer3 = setTimeout(() => setStage(3), 3200);
    // Stage 3: Prepare exit
    const timer4 = setTimeout(() => setIsExiting(true), 4200);
    // Stage 4: Remove component
    const timer5 = setTimeout(() => onComplete(), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#0a0a0f] flex items-center justify-center transition-all duration-1000 ease-in-out ${
        isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Pulsing Ring Container */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer Ring */}
          <div className={`absolute inset-0 border-2 border-white/10 rounded-full transition-all duration-1000 ${stage >= 0 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
          
          {/* Spinning Progress */}
          <div className={`absolute inset-0 border-t-2 border-blue-500 rounded-full transition-opacity duration-500 animate-spin ${stage === 0 ? 'opacity-100' : 'opacity-0'}`}></div>

          {/* Logo Reveal */}
          <div className={`transition-all duration-1000 ease-out ${
            stage >= 1 ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-180'
          }`}>
            <FluidLogo size={64} className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          </div>
        </div>

        {/* Text Reveal */}
        <div className="mt-8 overflow-hidden h-12 flex items-center justify-center">
          <h1 className={`text-4xl font-extrabold tracking-tighter transition-all duration-1000 ease-out ${
            stage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
            <span className="text-white">FLUID</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 ml-2">ECOSYSTEM</span>
          </h1>
        </div>

        {/* Subtext Reveal */}
        <div className="mt-2 overflow-hidden h-6 flex items-center justify-center">
          <p className={`text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] transition-all duration-1000 delay-300 ease-out ${
            stage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
            Inference at the Edge
          </p>
        </div>

        {/* Loading Bar */}
        <div className={`mt-10 w-48 h-0.5 bg-white/5 rounded-full overflow-hidden transition-all duration-700 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 animate-[loading-bar_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
