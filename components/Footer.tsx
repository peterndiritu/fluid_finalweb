import React from 'react';
import { Download, Mail, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const handleDownloadLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="footerDlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="100%" stop-color="#10b981" />
          </linearGradient>
        </defs>
        <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" fill="url(#footerDlGrad)" />
        <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" fill="url(#footerDlGrad)" />
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

  const socialLinks = [
    { 
      name: 'X (Twitter)', 
      url: 'https://twitter.com/fluid',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ) 
    },
    { name: 'Facebook', url: 'https://facebook.com/fluid', icon: <Facebook size={20} /> },
    { 
      name: 'Telegram', 
      url: 'https://t.me/fluid',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
           <line x1="22" y1="2" x2="11" y2="13"></line>
           <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      )
    },
    { 
      name: 'Discord', 
      url: 'https://discord.gg/fluid',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
           <circle cx="9" cy="12" r="1" />
           <circle cx="15" cy="12" r="1" />
           <path d="M7.5 7.5c3.5-1 5.5-1 9 0" />
           <path d="M7 16.5c3.5 1 6.5 1 10 0" />
           <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-1 2.5" />
           <path d="M8.5 17c0 1 -1.356 3 -1.832 3c-1.429 0 -2.698 -1.667 -3.333 -3c-.635 -1.667 -.476 -5.833 1.428 -11.5c1.388 -1.015 2.782 -1.34 4.237 -1.5l1 2.5" />
        </svg>
      )
    },
    { name: 'Email', url: 'mailto:support@fluid.finance', icon: <Mail size={20} /> }
  ];

  return (
    <footer className="py-12 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-8 mx-auto gap-4">
              <button 
                onClick={handleDownloadLogo} 
                className="group relative w-12 h-12 flex items-center justify-center transition-all hover:scale-110" 
                title="Download Brand Logo"
              >
                 <svg width="48" height="48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" fill="url(#footerLogoGradient)" />
                    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" fill="url(#footerLogoGradient)" />
                 </svg>
                 <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none flex items-center gap-1 shadow-lg">
                    <Download size={8} /> Download Logo
                </div>
              </button>
              <span className="font-bold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">Fluid</span>
          </div>
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-black transition-all duration-300 backdrop-blur-sm" title={link.name}>
                {link.icon}
              </a>
            ))}
          </div>
          <div className="flex justify-center gap-6 mb-6 text-sm text-slate-600 dark:text-slate-400 font-medium">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
            <button onClick={handleDownloadLogo} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Brand Kit</button>
          </div>
          <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">© 2024 Fluid Finance. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;