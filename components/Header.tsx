import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, ShoppingCart, Download, LayoutGrid } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ConnectButton } from "thirdweb/react";
import { thirdwebClient } from "../client";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
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
        setIsMenuOpen(false); // Close menu on scroll
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
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
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 120 100">
        <defs>
          <linearGradient id="dlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="100%" stop-color="#10b981" />
          </linearGradient>
        </defs>
        <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" fill="url(#dlGrad)" />
        <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" fill="url(#dlGrad)" />
        <text x="5" y="90" font-family="Arial" font-weight="bold" font-size="28" fill="url(#dlGrad)">Fluid</text>
      </svg>
    `;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Fluid-brand-asset.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const navStructure = [
    {
      label: 'Products',
      children: [
        { label: 'Fluid Blockchain', action: () => handleLinkClick('blockchain') },
        { label: 'Fluid Presale', action: () => handleLinkClick('buy') },
        { label: 'Wallet', action: () => handleLinkClick('wallet') },
        { label: 'Fluid DEX', action: () => handleLinkClick('dex') },
        { label: 'Fluid Crypto Cards', action: () => handleLinkClick('cards') },
        { label: 'Fluid Token', action: () => handleLinkClick('token') },
      ]
    },
    { label: 'Presale', action: () => handleLinkClick('buy') },
    { label: 'Hosting', action: () => handleLinkClick('host') },
    {
      label: 'Resources',
      children: [
        { label: 'About Fluid Chain', action: () => handleLinkClick('about') },
        { label: 'Roadmap', action: () => handleLinkClick('roadmap') },
        { label: 'FAQs', action: () => handleLinkClick('faq') },
        { label: 'Terms of Service', action: () => handleLinkClick('terms') },
        { label: 'Privacy Policy', action: () => handleLinkClick('privacy') },
      ]
    },
    { label: 'Support', action: () => handleLinkClick('support') },
    { label: 'Community', action: () => handleLinkClick('home', 'presale') },
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 py-4 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 rounded-2xl px-6 transition-all duration-300 ${isScrolled ? 'backdrop-blur-xl bg-slate-100/10 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 shadow-lg' : 'bg-transparent border-transparent'}`}>
          
          {/* Left Side: Logo, Title, and Collapsible Menu Trigger */}
          <div className="flex items-center gap-4 relative" ref={menuRef}>
            <div className="flex items-center gap-1 group">
              <div className="flex items-center cursor-pointer" onClick={() => handleLinkClick('home')}>
                <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="mr-2 transition-transform duration-300 group-hover:scale-110">
                    <defs>
                      <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" fill="url(#headerLogoGradient)" />
                    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" fill="url(#headerLogoGradient)" />
                </svg>
                <span className="font-bold text-xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">
                  Fluid
                </span>
              </div>
              
              <button 
                onClick={handleDownloadLogo}
                className="ml-2 p-1.5 rounded-lg bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-500"
                title="Download Brand Asset"
              >
                <Download size={12} />
              </button>
            </div>

            {/* Collapsible Menu Button (Left After Title) */}
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-800 mx-1"></div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isMenuOpen 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
              <span className="hidden sm:inline">Menu</span>
            </button>

            {/* Unified Collapsible Menu Dropdown */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-3 w-72 backdrop-blur-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-50 animate-fade-in-up p-4">
                <div className="space-y-1">
                  {navStructure.map((item, index) => (
                    <div key={index}>
                      {item.children ? (
                        <div>
                          <button 
                            onClick={() => setMobileSubmenu(mobileSubmenu === item.label ? null : item.label)}
                            className="w-full flex items-center justify-between text-left text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 px-4 py-3 rounded-xl text-sm font-bold"
                          >
                            <span className="flex items-center gap-2">
                               {item.label === 'Products' && <LayoutGrid size={14} className="text-blue-500" />}
                               {item.label}
                            </span>
                            <ChevronDown size={14} className={`transition-transform duration-200 ${mobileSubmenu === item.label ? 'rotate-180' : ''}`} />
                          </button>
                          {mobileSubmenu === item.label && (
                            <div className="pl-4 pr-2 space-y-1 mt-1 mb-2 border-l-2 border-slate-200 dark:border-white/10 ml-4">
                              {item.children.map((child, cIndex) => (
                                <button key={cIndex} onClick={() => { child.action(); setIsMenuOpen(false); }} className="w-full text-left block px-4 py-2 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 font-medium">
                                  {child.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <button 
                          onClick={() => { item.action(); setIsMenuOpen(false); }} 
                          className={`w-full text-left block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                            item.label === 'Presale' 
                            ? 'text-emerald-500 bg-emerald-500/10' 
                            : 'text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'
                          }`}
                        >
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {/* Mobile-only Connect Button in the collapsible menu if screen is small */}
                  <div className="md:hidden border-t border-slate-200 dark:border-white/10 my-4 pt-4 space-y-3">
                    <button onClick={() => handleLinkClick('buy')} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-bold rounded-xl shadow-lg text-xs">
                      Buy Fluid Tokens
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <button onClick={() => handleLinkClick('buy')} className="hidden md:flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-500/10 group">
              <ShoppingCart size={14} className="group-hover:scale-110 transition-transform" />
              Buy Fluid
            </button>
            <div className="hidden md:block h-6 w-px bg-slate-300 dark:bg-slate-800 mx-1"></div>
            <button onClick={toggleTheme} className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-200/50 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20 transition-colors">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-800 mx-1"></div>
            <ConnectButton client={thirdwebClient} theme={theme === 'dark' ? 'dark' : 'light'} connectButton={{ label: "Connect", style: { borderRadius: '0.75rem', fontSize: '12px', padding: '0.5rem 1rem' } }} />
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;