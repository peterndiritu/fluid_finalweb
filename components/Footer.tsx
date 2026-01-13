import React from 'react';
import { Download, Mail, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const handleDownloadLogo = () => {
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 100 100" fill="white">
        <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
        <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
        <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
      </svg>
    `;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fluid-logo.svg';
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
    { 
      name: 'Facebook', 
      url: 'https://facebook.com/fluid',
      icon: <Facebook size={20} />
    },
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
    { 
      name: 'Email', 
      url: 'mailto:support@fluid.finance',
      icon: <Mail size={20} />
    }
  ];

  return (
    <footer className="py-12 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 text-center">
          
          {/* Downloadable Logo Section */}
          <button 
            onClick={handleDownloadLogo}
            className="group relative flex items-center justify-center mb-8 mx-auto"
            title="Download Brand Asset"
          >
              <div className="w-12 h-12 flex items-center justify-center mr-2 transition-all group-hover:scale-110 z-10 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400">
                 <svg width="48" height="48" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" />
                    <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" />
                    <path d="M25 64 H60 A5 5 0 0 1 60 79 H25 A5 5 0 0 1 25 64 Z" transform="skewX(-20)" />
                 </svg>
              </div>
              <span className="font-bold text-2xl tracking-tighter text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">fluid</span>
              
              <div className="absolute -right-32 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none flex items-center gap-1">
                  <Download size={10} /> Click to Download
              </div>
          </button>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((link) => (
              <a 
                key={link.name}
                href={link.url}
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-black transition-all duration-300 backdrop-blur-sm"
                title={link.name}
              >
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