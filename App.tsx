import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import Services from './components/Services';
import Contact from './components/Contact';
import SocialHub from './components/SocialHub';
import WholesaleEngine from './components/WholesaleEngine';
import LinkHub from './components/LinkHub';
import BusinessCardStudio from './components/BusinessCardStudio';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPackage, setSelectedPackage] = useState('');

  // Simple URL routing to allow direct access to /links
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/links') {
      setActiveTab('link_hub');
    }
  }, []);

  const handleBook = (packageName: string) => {
    setSelectedPackage(packageName);
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero 
              onBookNow={() => handleBook('General Inquiry')} 
              onViewPortfolio={() => setActiveTab('portfolio')} 
            />
            <Services onBook={handleBook} />
            <PortfolioGrid />
            <div className="bg-brand-primary py-16 text-center text-white px-4">
              <h2 className="text-3xl font-serif mb-4">Ready to market your next deal?</h2>
              <button 
                onClick={() => handleBook('General Inquiry')}
                className="bg-brand-accent text-brand-dark px-8 py-3 rounded font-bold hover:bg-white transition-colors"
              >
                Get Started
              </button>
            </div>
          </>
        );
      case 'portfolio':
        return <PortfolioGrid />;
      case 'services':
        return <Services onBook={handleBook} />;
      case 'marketing': 
        return <SocialHub onBook={handleBook} />;
      case 'contact':
        return <Contact initialService={selectedPackage} />;
      case 'wholesale_engine':
        return <WholesaleEngine />;
      case 'card_studio':
        return <BusinessCardStudio />;
      case 'link_hub':
        return <LinkHub />;
      default:
        return <Hero onBookNow={() => handleBook('General Inquiry')} onViewPortfolio={() => setActiveTab('portfolio')} />;
    }
  };

  // The LinkHub should have its own minimal layout (no header/footer)
  if (activeTab === 'link_hub') {
    return <LinkHub />;
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;