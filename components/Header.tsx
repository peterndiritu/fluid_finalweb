import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, ShoppingCart, Download, LayoutGrid, Globe, Wallet, Cpu, Info, Compass, LifeBuoy } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ConnectButton } from "thirdweb/react";
import { thirdwebClient } from "../client";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsMenuOpen(false); 
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
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleLinkClick = (page: string, id?: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
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

  const handleDownloadLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="dlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="100%" stop-color="#10b981" />
          </linearGradient>
        </defs>
        <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" fill="url(#dlGrad)" />
        <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" fill="url(#dlGrad)" />
      </svg>
    `;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Fluid-logo.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const navStructure = [
    {
      label: 'Ecosystem',
      icon: LayoutGrid,
      children: [
        { label: 'Blockchain', action: () => handleLinkClick('blockchain') },
        { label: 'Hosting', action: () => handleLinkClick('host') },
        { label: 'Fluid DEX', action: () => handleLinkClick('dex') },
        { label: 'Fluid Token', action: () => handleLinkClick('token') },
        { label: 'Fluid Wallet', action: () => handleLinkClick('wallet') },
        { label: 'Fluid Cards', action: () => handleLinkClick('cards') },
      ]
    },
    {
      label: 'Resources',
      icon: Compass,
      children: [
        { label: 'About Us', action: () => handleLinkClick('about') },
        { label: 'Roadmap', action: () => handleLinkClick('roadmap') },
        { label: 'FAQs', action: () => handleLinkClick('faq') },
        { label: 'Support Center', action: () => handleLinkClick('support') },
      ]
    }
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 py-4 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className={`flex items-center justify-between h-16 rounded-2xl px-4 sm:px-6 transition-all duration-300 ${isScrolled || isMenuOpen ? 'backdrop-blur-xl bg-slate-100/10 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 shadow-lg' : 'bg-transparent border-transparent'}`}>
          
          {/* Left Side Group: Logo + Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-4 relative flex-1 min-w-0" ref={menuRef}>
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-1 group shrink-0">
              <div className="flex items-center cursor-pointer" onClick={() => handleLinkClick('home')}>
                <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="mr-1.5 sm:mr-2 transition-transform duration-300 group-hover:scale-110">
                    <defs>
                      <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" fill="url(#headerLogoGradient)" />
                    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" fill="url(#headerLogoGradient)" />
                </svg>
                <span className="font-bold text-lg sm:text-xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">
                  Fluid
                </span>
              </div>
              
              <button 
                onClick={handleDownloadLogo}
                className="hidden lg:block ml-1 p-1.5 rounded-lg bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-500"
                title="Download Brand Asset"
              >
                <Download size={12} />
              </button>
            </div>

            {/* Menu Trigger Button */}
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-800 mx-1 shrink-0"></div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all shrink-0 ${
                isMenuOpen 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Organized Menu Items Area */}
            <div className={`flex items-center gap-1 sm:gap-2 transition-all duration-500 ease-out overflow-x-auto scrollbar-hide py-1 ${isMenuOpen ? 'max-w-[1000px] opacity-100 ml-2 sm:ml-4' : 'max-w-0 opacity-0 ml-0 pointer-events-none'}`}>
               <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
               {navStructure.map((item, index) => (
                 <div key={index} className="relative group/nav whitespace-nowrap">
                   <button 
                     onClick={() => setActiveSubmenu(activeSubmenu === item.label ? null : item.label)}
                     className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${activeSubmenu === item.label ? 'text-blue-500 bg-blue-500/10' : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'}`}
                   >
                      {item.icon && <item.icon size={14} className="opacity-70" />}
                      {item.label}
                      <ChevronDown size={12} className={`transition-transform duration-200 ${activeSubmenu === item.label ? 'rotate-180' : ''}`} />
                   </button>
                   
                   {/* Submenu Dropdown */}
                   {activeSubmenu === item.label && item.children && (
                      <div className="absolute top-full left-0 mt-2 w-52 backdrop-blur-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[60] animate-fade-in-up p-2">
                        {item.children.map((child, cIndex) => (
                          <button 
                            key={cIndex} 
                            onClick={() => child.action()} 
                            className="w-full text-left px-4 py-2.5 rounded-xl text-[11px] sm:text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium flex items-center justify-between group/item"
                          >
                            <span>{child.label}</span>
                            <ChevronRight size={10} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                   )}
                 </div>
               ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
            <button 
              onClick={() => handleLinkClick('buy')} 
              className="hidden xl:flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-500/10 group shrink-0"
            >
              <ShoppingCart size={14} className="group-hover:scale-110 transition-transform" />
              Buy Fluid
            </button>
            <div className="hidden sm:block h-6 w-px bg-slate-300 dark:bg-slate-800 mx-0.5 sm:mx-1 shrink-0"></div>
            <button 
              onClick={toggleTheme} 
              className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-200/50 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20 transition-colors shrink-0"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="hidden sm:block h-6 w-px bg-slate-300 dark:bg-slate-800 mx-0.5 sm:mx-1 shrink-0"></div>
            <ConnectButton 
              client={thirdwebClient} 
              theme={theme === 'dark' ? 'dark' : 'light'} 
              connectButton={{ 
                label: "Connect", 
                style: { borderRadius: '0.75rem', fontSize: '11px', padding: '0.4rem 0.8rem', height: '36px' } 
              }} 
            />
          </div>

        </div>
      </div>
    </nav>
  );
};

const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default Header;