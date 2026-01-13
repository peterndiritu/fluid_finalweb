import React from 'react';
import { LifeBuoy, Mail, MessageCircle, AlertTriangle, ShieldAlert, ExternalLink, Twitter, Facebook, Globe, Lock } from 'lucide-react';

const SupportPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-16">
      
      {/* Header */}
      <div className="text-center mb-16 px-4">
         <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Help Center</span>
         <h1 className="text-5xl font-extrabold text-white mt-2 mb-4">How can we help?</h1>
         <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Find answers, contact our team, or report security issues.
         </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
         
         {/* EMERGENCY SECTION */}
         <div className="bg-red-500/10 border border-red-500/50 rounded-3xl p-8 mb-16 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
               <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-500 shrink-0 animate-pulse">
                  <ShieldAlert size={32} />
               </div>
               <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">Emergency Support</h2>
                  <p className="text-red-200/80 mb-4">
                     Use this only if your account is compromised, you've lost a device with an active session, or you've detected a critical security vulnerability.
                  </p>
                  <div className="flex flex-wrap gap-3">
                     <button className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-colors flex items-center gap-2">
                        <Lock size={18} /> Freeze Account
                     </button>
                     <a href="mailto:security@fluid.finance?subject=CRITICAL%20SECURITY%20ISSUE" className="px-6 py-3 bg-red-950/50 border border-red-500/30 hover:bg-red-900/50 text-red-400 font-bold rounded-xl transition-colors flex items-center gap-2">
                        <AlertTriangle size={18} /> Report Hack
                     </a>
                  </div>
               </div>
            </div>
         </div>

         {/* Contact Channels Grid */}
         <div className="grid md:grid-cols-2 gap-8 mb-16">
            
            {/* General Support */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500/30 transition-colors">
               <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-500">
                  <Mail size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
               <p className="text-slate-400 mb-6 h-12">
                  For general inquiries, partnership proposals, and non-urgent account issues.
               </p>
               <a href="mailto:support@fluid.finance" className="text-blue-400 font-bold hover:text-blue-300 flex items-center gap-2">
                  support@fluid.finance <ExternalLink size={14} />
               </a>
            </div>

            {/* Live Chat / Community */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/30 transition-colors">
               <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-500">
                  <MessageCircle size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Live Community</h3>
               <p className="text-slate-400 mb-6 h-12">
                  Get help from our moderators and community in our official Discord and Telegram channels.
               </p>
               <div className="flex gap-4">
                  <a href="https://t.me/fluid" target="_blank" rel="noreferrer" className="text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-2">
                     Telegram <ExternalLink size={14} />
                  </a>
                  <a href="https://discord.gg/fluid" target="_blank" rel="noreferrer" className="text-indigo-400 font-bold hover:text-indigo-300 flex items-center gap-2">
                     Discord <ExternalLink size={14} />
                  </a>
               </div>
            </div>
         </div>

         {/* Social Media List */}
         <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Official Social Channels</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               
               <a href="https://twitter.com/fluid" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:bg-slate-800 hover:border-slate-700 transition-all group">
                  <Twitter className="w-8 h-8 text-slate-400 group-hover:text-blue-400 mb-3 transition-colors" />
                  <span className="text-slate-300 font-bold">X (Twitter)</span>
                  <span className="text-xs text-slate-500">@fluid</span>
               </a>

               <a href="https://t.me/fluid" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:bg-slate-800 hover:border-slate-700 transition-all group">
                   <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-blue-500 mb-3 transition-colors">
                     <line x1="22" y1="2" x2="11" y2="13"></line>
                     <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                   </svg>
                  <span className="text-slate-300 font-bold">Telegram</span>
                  <span className="text-xs text-slate-500">t.me/fluid</span>
               </a>

               <a href="https://facebook.com/fluid" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:bg-slate-800 hover:border-slate-700 transition-all group">
                  <Facebook className="w-8 h-8 text-slate-400 group-hover:text-blue-600 mb-3 transition-colors" />
                  <span className="text-slate-300 font-bold">Facebook</span>
                  <span className="text-xs text-slate-500">fluid.finance</span>
               </a>

               <a href="https://fluid.finance" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:bg-slate-800 hover:border-slate-700 transition-all group">
                  <Globe className="w-8 h-8 text-slate-400 group-hover:text-cyan-400 mb-3 transition-colors" />
                  <span className="text-slate-300 font-bold">Website</span>
                  <span className="text-xs text-slate-500">fluid.finance</span>
               </a>

            </div>
         </div>

         {/* Safety Warning */}
         <div className="mt-12 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-4">
            <AlertTriangle className="text-amber-500 shrink-0 mt-1" />
            <div>
               <h4 className="text-amber-500 font-bold mb-1">Safety Warning</h4>
               <p className="text-amber-200/80 text-sm">
                  Fluid Support admins will <strong>NEVER</strong> ask for your seed phrase, private keys, or passwords. We will never DM you first on Telegram or Discord. Always verify you are speaking to official accounts listed on this page.
               </p>
            </div>
         </div>

      </div>
    </div>
  );
};

export default SupportPage;