import React from 'react';
import { Download, Mail, Facebook, Send, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

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

  const handleLink = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const footerSections = [
    {
      title: 'Ecosystem',
      links: [
        { label: 'Blockchain', page: 'blockchain' },
        { label: 'Hosting', page: 'host' },
        { label: 'Fluid DEX', page: 'dex' },
        { label: 'Fluid Token', page: 'token' },
      ],
    },
    {
      title: 'Personal',
      links: [
        { label: 'Fluid Wallet', page: 'wallet' },
        { label: 'Fluid Cards', page: 'cards' },
        { label: 'Presale Dashboard', page: 'buy' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'About Us', page: 'about' },
        { label: 'Roadmap', page: 'roadmap' },
        { label: 'FAQs', page: 'faq' },
        { label: 'Support Center', page: 'support' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', page: 'terms' },
        { label: 'Privacy Policy', page: 'privacy' },
      ],
    },
  ];

  const socialLinks = [
    { 
      name: 'X (Twitter)', 
      url: 'https://twitter.com/fluid',
      icon: <Twitter size={18} />
    },
    { name: 'Facebook', url: 'https://facebook.com/fluid', icon: <Facebook size={18} /> },
    { 
      name: 'Telegram', 
      url: 'https://t.me/fluid',
      icon: <Send size={18} />
    },
    { name: 'Email', url: 'mailto:support@fluid.finance', icon: <Mail size={18} /> }
  ];

  return (
    <footer className="pt-20 pb-12 relative z-10 bg-slate-100/30 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => handleLink('home')}>
               <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="footerBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <path d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" transform="skewX(-20)" fill="url(#footerBrandGrad)" />
                  <path d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" transform="skewX(-20)" fill="url(#footerBrandGrad)" />
               </svg>
               <span className="font-bold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">Fluid</span>
            </div>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed max-w-xs">
              Scaling the future of finance with institutional-grade blockchain infrastructure and permanent web hosting.
            </p>
            <div className="flex gap-4">
               {socialLinks.map((social) => (
                 <a 
                   key={social.name} 
                   href={social.url} 
                   target="_blank" 
                   rel="noreferrer" 
                   className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-cyan-400 hover:border-blue-500 dark:hover:border-cyan-400 transition-all shadow-sm"
                   title={social.name}
                 >
                   {social.icon}
                 </a>
               ))}
            </div>
          </div>

          {/* Nav Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button 
                      onClick={() => handleLink(link.page)}
                      className="text-sm text-slate-500 hover:text-blue-500 dark:hover:text-cyan-400 transition-colors font-medium"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8 order-2 md:order-1">
            <p className="text-slate-500 text-xs">© {currentYear} Fluid Finance. All rights reserved.</p>
            <button 
              onClick={handleDownloadLogo}
              className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white hover:text-blue-500 transition-colors"
            >
              <Download size={14} /> Brand Kit
            </button>
          </div>
          
          <div className="flex items-center gap-6 order-1 md:order-2">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Systems Operational
             </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;