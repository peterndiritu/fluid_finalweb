import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ConnectButton } from "thirdweb/react";
import { client, wallets } from "../client";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  // Scroll State for Smart Navbar
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we are at the top (for transparency)
      setIsScrolled(currentScrollY > 20);

      // Determine scroll direction (for visibility)
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const toggleMobileSubmenu = (menu: string) => {
    setMobileSubmenu(mobileSubmenu === menu ? null : menu);
  };

  const navStructure = [
    {
      label: 'Products',
      children: [
        { label: 'Fluid Blockchain', action: () => handleLinkClick('blockchain') },
        { label: 'Wallet', action: () => handleLinkClick('wallet') },
        { label: 'Fluid DEX', action: () => handleLinkClick('dex') },
        { label: 'Fluid Crypto Cards', action: () => handleLinkClick('cards') },
        { label: 'Fluid Token', action: () => handleLinkClick('token') },
      ]
    },
    { 
      label: 'Hosting', 
      action: () => handleLinkClick('host') 
    },
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
    <nav 
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 py-4 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`flex items-center justify-between h-16 rounded-2xl px-6 transition-all duration-300 ${
            isScrolled 
              ? 'backdrop-blur-xl bg-slate-100/10 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 shadow-lg' 
              : 'bg-transparent border-transparent'
          }`}
        >
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleLinkClick('home')}>
            <svg width="32" height="32" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-slate-900 dark:text-white transition-transform duration-300 group-hover:scale-110">
                <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
                <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
                <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
            </svg>
            <span className="font-bold text-lg tracking-tighter text-slate-900 dark:text-white">
              fluid
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center space-x-1">
            {navStructure.map((item, index) => (
              <div key={index} className="relative group">
                {item.children ? (
                  <button className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 font-bold text-xs px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                    {item.label} <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                ) : (
                  <button 
                    onClick={item.action} 
                    className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 font-bold text-xs px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                  >
                    {item.label}
                  </button>
                )}

                {item.children && (
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                    <div className="w-52 backdrop-blur-3xl bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden p-2 shadow-2xl">
                      {item.children.map((child, cIndex) => (
                        <button
                          key={cIndex}
                          onClick={child.action}
                          className="block w-full text-left px-4 py-2 rounded-lg text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-200/50 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-800 mx-1"></div>
            <ConnectButton 
              client={client} 
              wallets={wallets}
              theme={theme}
              connectButton={{
                className: "!bg-slate-900 dark:!bg-white !text-white dark:!text-slate-900 !rounded-xl !px-5 !py-2 !text-xs !font-bold !h-10 hover:!opacity-90 transition-opacity !border-none"
              }}
            />
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex xl:hidden items-center gap-2">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-200/50 dark:bg-white/10 text-slate-600 dark:text-slate-400"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden backdrop-blur-3xl bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-white/10 absolute w-[calc(100%-2rem)] left-4 top-20 shadow-2xl transition-all max-h-[calc(100vh-100px)] overflow-y-auto rounded-3xl p-6">
          <div className="space-y-2">
            
            {navStructure.map((item, index) => (
              <div key={index}>
                {item.children ? (
                  <div>
                    <button 
                      onClick={() => toggleMobileSubmenu(item.label)}
                      className="w-full flex items-center justify-between text-left text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 px-4 py-3 rounded-xl text-sm font-bold"
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${mobileSubmenu === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {mobileSubmenu === item.label && (
                      <div className="pl-4 pr-2 space-y-1 mt-1 mb-2 border-l-2 border-slate-200 dark:border-white/10 ml-4">
                        {item.children.map((child, cIndex) => (
                          <button
                            key={cIndex}
                            onClick={() => {
                              child.action();
                              setIsMenuOpen(false);
                            }}
                            className="w-full text-left block px-4 py-2 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 font-medium"
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      item.action();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 block px-4 py-3 rounded-xl text-sm font-bold"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}

            <div className="border-t border-slate-200 dark:border-white/10 my-4 pt-6 space-y-4">
              <div className="flex justify-center">
                <ConnectButton 
                  client={client} 
                  wallets={wallets}
                  theme={theme}
                  connectButton={{
                    className: "!w-full !bg-slate-900 dark:!bg-white !text-white dark:!text-slate-900 !rounded-xl !py-4 !text-sm !font-bold !h-12 !border-none shadow-lg"
                  }}
                />
              </div>
              <button 
                onClick={() => handleLinkClick('buy')}
                className="w-full py-4 bg-gradient-to-r from-lime-400 to-green-500 text-slate-900 font-bold rounded-xl shadow-lg text-sm"
              >
                Buy FLUID Tokens
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;