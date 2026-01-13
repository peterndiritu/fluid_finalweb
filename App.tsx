import React, { useState } from 'react';
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

// Define the logical order of pages for navigation
const PAGE_SEQUENCE = [
  'home',
  'buy',
  'blockchain',
  'wallet',
  'dex',
  'cards',
  'token',
  'host',
  'about',
  'roadmap',
  'support',
  'faq',
  'terms',
  'privacy'
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  // Swipe State
  const [touchStart, setTouchStart] = useState<{x: number, y: number} | null>(null);
  const [touchEnd, setTouchEnd] = useState<{x: number, y: number} | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    
    // Ensure it's a horizontal swipe (horizontal distance > vertical distance)
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
        const currentIndex = PAGE_SEQUENCE.indexOf(currentPage);

        if (isLeftSwipe) {
          // Swipe Left -> Next Page
          if (currentIndex < PAGE_SEQUENCE.length - 1) {
            setCurrentPage(PAGE_SEQUENCE[currentIndex + 1]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
    
        if (isRightSwipe) {
          // Swipe Right -> Previous Page
          if (currentIndex > 0) {
            setCurrentPage(PAGE_SEQUENCE[currentIndex - 1]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
    }
  };

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
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
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