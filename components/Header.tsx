import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Download, LayoutGrid, Globe, Wallet, Cpu, Info, Compass, LifeBuoy, ChevronRight, Zap, Rocket } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ConnectButton } from "thirdweb/react";
import { thirdwebClient } from "../client";
import FluidLogo from './FluidLogo';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const desktopMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsMobileMenuOpen(false); 
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (page: string, id?: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setActiveSubmenu(null);
    if (page === 'home' && !id) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id) {
       setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
       }, 100);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navStructure = [
    {
      label: 'Ecosystem',
      icon: LayoutGrid,
      children: [
        { label: 'L1 Blockchain', action: () => handleLinkClick('blockchain') },
        { label: 'Hosting', action: () => handleLinkClick('host') },
        { label: 'Fluid DEX', action: () => handleLinkClick('dex') },
        { label: 'Fluid Token', action: () => handleLinkClick('token') },
        { label: 'Fluid Wallet', action: () => handleLinkClick('wallet') },
        { label: 'Fluid Cards', action: () => handleLinkClick('cards') },
      ]
    },
    {
      label: 'Investment',
      icon: Rocket,
      children: [
        { label: 'Live Presale', action: () => handleLinkClick('presale') },
        { label: 'Tokenomics', action: () => handleLinkClick('token') },
        { label: 'Roadmap', action: () => handleLinkClick('roadmap') },
      ]
    },
    {
      label: 'Resources',
      icon: Compass,
      children: [
        { label: 'About Us', action: () => handleLinkClick('about') },
        { label: 'FAQs', action: () => handleLinkClick('faq') },
        { label: 'Support Center', action: () => handleLinkClick('support') },
      ]
    }
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 py-4 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-between h-16 rounded-2xl px-4 sm:px-6 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-white/10 shadow-lg' : 'bg-transparent border-transparent'}`}>
          
          <div className="flex items-center cursor-pointer group shrink-0" onClick={() => handleLinkClick('home')}>
            <FluidLogo className="mr-2 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-bold text-xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">
              Fluid
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1 ml-8" ref={desktopMenuRef}>
            {navStructure.map((item, idx) => (
              <div key={idx} className="relative">
                <button 
                  onClick={() => setActiveSubmenu(activeSubmenu === item.label ? null : item.label)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeSubmenu === item.label ? 'text-blue-500 bg-blue-500/10' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                >
                  <item.icon size={16} className="opacity-70" />
                  {item.label}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeSubmenu === item.label ? 'rotate-180' : ''}`} />
                </button>

                {activeSubmenu === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 backdrop-blur-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up p-2 z-[100]">
                    {item.children.map((child, cIdx) => (
                      <button 
                        key={cIdx} 
                        onClick={() => child.action()} 
                        className="w-full text-left px-4 py-2.5 rounded-xl text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium flex items-center justify-between group"
                      >
                        {child.label}
                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <button 
              onClick={() => handleLinkClick('presale')} 
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-500/10 group shrink-0"
            >
              <Rocket size={14} className="group-hover:animate-bounce transition-transform" />
              Join Presale
            </button>
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>
            
            <button 
              onClick={toggleTheme} 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <ConnectButton 
              client={thirdwebClient} 
              theme={theme === 'dark' ? 'dark' : 'light'} 
              connectButton={{ 
                label: "Connect", 
                style: { borderRadius: '0.75rem', fontSize: '12px', height: '40px', padding: '0 1rem', background: theme === 'dark' ? '#1e293b' : '#f1f5f9', color: theme === 'dark' ? 'white' : 'black', border: '1px solid rgba(255,255,255,0.1)' } 
              }} 
            />

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-4 right-4 mt-2 backdrop-blur-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col p-4 max-h-[80vh] overflow-y-auto z-[200]">
            {navStructure.map((item, idx) => (
              <div key={idx} className="mb-2">
                <button 
                  onClick={() => setActiveSubmenu(activeSubmenu === item.label ? null : item.label)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-bold"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-blue-500" />
                    {item.label}
                  </div>
                  <ChevronDown size={18} className={`transition-transform duration-200 ${activeSubmenu === item.label ? 'rotate-180' : ''}`} />
                </button>
                
                {activeSubmenu === item.label && (
                  <div className="grid grid-cols-1 gap-1 p-2 bg-white/50 dark:bg-black/20 rounded-2xl mt-1">
                    {item.children.map((child, cIdx) => (
                      <button 
                        key={cIdx} 
                        onClick={() => child.action()} 
                        className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 font-medium"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="h-px bg-slate-200 dark:bg-slate-800 my-4"></div>
            
            <button 
              onClick={() => handleLinkClick('presale')}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 mb-2"
            >
              <Rocket size={18} />
              Join Presale
            </button>
            <button 
              onClick={() => handleLinkClick('wallet')}
              className="w-full py-4 bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-bold rounded-2xl flex items-center justify-center gap-2"
            >
              <Zap size={18} />
              Open Wallet
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;