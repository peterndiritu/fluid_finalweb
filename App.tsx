import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WalletPage from './pages/Wallet';
import HostPage from './pages/Host';
import DexPage from './pages/Dex';
import CardsPage from './pages/Cards';
import AboutPage from './pages/About';
import TokenPage from './pages/TokenPage';
import RoadmapPage from './pages/RoadmapPage';
import FaqPage from './pages/FaqPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import BlockchainPage from './pages/BlockchainPage';
import BuyPage from './pages/BuyPage';
import SupportPage from './pages/SupportPage';
import { useAutoConnect } from 'thirdweb/react';
import { createWallet } from 'thirdweb/wallets';
import { thirdwebClient } from './client';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Define supported wallets globally for stability
  const wallets = useMemo(() => [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
  ], []);

  // Global auto-connection (silent restoration)
  useAutoConnect({
    client: thirdwebClient,
    wallets: wallets
  });

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'buy': return <BuyPage />;
      case 'blockchain': return <BlockchainPage />;
      case 'wallet': return <WalletPage />;
      case 'dex': return <DexPage />;
      case 'cards': return <CardsPage />;
      case 'token': return <TokenPage />;
      case 'host': return <HostPage />;
      case 'about': return <AboutPage />;
      case 'roadmap': return <RoadmapPage />;
      case 'faq': return <FaqPage />;
      case 'terms': return <TermsPage />;
      case 'privacy': return <PrivacyPage />;
      case 'support': return <SupportPage />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-emerald-500/30 transition-colors duration-300 relative"
    >
      {/* Technological Hosting Grid Background */}
      <div className="fixed inset-0 bg-tech-grid pointer-events-none z-0 opacity-100"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />

        <main className="flex-grow">
          {renderPage()}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;