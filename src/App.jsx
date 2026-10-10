import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import MobileMenu from './components/layout/MobileMenu';
import Footer from './components/layout/Footer';

// Common Components
import Toast from './components/common/Toast';
import SearchModal from './components/common/SearchModal';
import CartDrawer from './components/cart/CartDrawer';
import PolicyModal from './components/common/PolicyModal';
import CommunityPopup from './components/common/CommunityPopup';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CustomizerPage from './pages/CustomizerPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import WishlistPage from './pages/WishlistPage';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'shop' | 'product' | 'customize' | 'checkout' | 'about' | 'wishlist'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Policy Modal state
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [policyModalTab, setPolicyModalTab] = useState('whatsapp');
  const [isCommunityPopupOpen, setIsCommunityPopupOpen] = useState(false);

  const handleOpenPolicy = (tab = 'whatsapp') => {
    setPolicyModalTab(tab);
    setIsPolicyModalOpen(true);
  };

  // Show the community invite when a visitor enters the site.
  useEffect(() => {
    setIsCommunityPopupOpen(true);
  }, []);

  // Keyboard shortcut: Cmd+K or Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateToProduct = (productId) => {
    setSelectedProductId(productId);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-brand-black text-brand-light relative selection:bg-brand-primary selection:text-white">
          {/* Floating Glassmorphic Navigation */}
          <Navbar
            activePage={activePage}
            setActivePage={handlePageChange}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />

          {/* 3. Page Route Rendering */}
          <main className="flex-1 w-full">
            {activePage === 'home' && (
              <HomePage
                setActivePage={handlePageChange}
                onNavigateProduct={navigateToProduct}
                setSelectedCategory={setSelectedCategory}
              />
            )}

            {activePage === 'shop' && (
              <ShopPage
                onNavigateProduct={navigateToProduct}
                initialCategory={selectedCategory}
              />
            )}

            {activePage === 'product' && (
              <ProductDetailPage
                productId={selectedProductId}
                onNavigateProduct={navigateToProduct}
                setActivePage={handlePageChange}
              />
            )}

            {activePage === 'customize' && (
              <CustomizerPage
                setActivePage={handlePageChange}
              />
            )}

            {activePage === 'checkout' && (
              <CheckoutPage
                setActivePage={handlePageChange}
                onOpenPolicyModal={handleOpenPolicy}
              />
            )}

            {activePage === 'about' && (
              <AboutPage
                setActivePage={handlePageChange}
              />
            )}

            {activePage === 'wishlist' && (
              <WishlistPage
                onNavigateProduct={navigateToProduct}
                setActivePage={handlePageChange}
              />
            )}

          </main>

          {/* 4. Global Streetwear Footer */}
          <Footer 
            setActivePage={handlePageChange} 
            onOpenPolicyModal={handleOpenPolicy}
          />

          {/* 5. Modals & Overlays */}
          <CartDrawer
            onProceedCheckout={() => {
              setActivePage('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectProduct={navigateToProduct}
          />

          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            setActivePage={handlePageChange}
            activePage={activePage}
            onOpenPolicyModal={handleOpenPolicy}
          />

          {/* 6. Legal & WhatsApp Policies Modal */}
          <PolicyModal
            isOpen={isPolicyModalOpen}
            onClose={() => setIsPolicyModalOpen(false)}
            initialTab={policyModalTab}
          />

          <CommunityPopup
            isOpen={isCommunityPopupOpen}
            onClose={() => setIsCommunityPopupOpen(false)}
          />

          {/* 7. Notification Toasts */}
          <Toast />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
