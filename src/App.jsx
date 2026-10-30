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

// Data
import { PRODUCTS, findProductBySlugOrId } from './data/products';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CustomizerPage from './pages/CustomizerPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import WishlistPage from './pages/WishlistPage';
import ShowroomPage from './pages/ShowroomPage';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'showroom' | 'shop' | 'product' | 'customize' | 'checkout' | 'about' | 'wishlist'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Policy Modal state
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [policyModalTab, setPolicyModalTab] = useState('whatsapp');

  const handleOpenPolicy = (tab = 'whatsapp') => {
    setPolicyModalTab(tab);
    setIsPolicyModalOpen(true);
  };

  // 1. URL Routing Support: Separate direct links like radunz.shop/thala-tshirt
  useEffect(() => {
    const handleUrlRoute = () => {
      const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
      const searchParams = new URLSearchParams(window.location.search);
      const productQuery = searchParams.get('product') || searchParams.get('p');

      const target = productQuery || rawPath;

      if (target) {
        // Standard pages
        const validPages = ['shop', 'showroom', 'about', 'customize', 'checkout', 'wishlist'];
        if (validPages.includes(target.toLowerCase())) {
          setActivePage(target.toLowerCase());
          return;
        }

        // Product matching by slug, id, or alias (e.g. thala-tshirt, thalapathy-tshirt)
        const matchedProduct = findProductBySlugOrId(target);
        if (matchedProduct) {
          setSelectedProductId(matchedProduct.id);
          setActivePage('product');
          return;
        }
      }

      // Default root
      if (!rawPath) {
        setActivePage('home');
      }
    };

    handleUrlRoute();

    // Listen for browser Back/Forward navigation
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
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

  // Global Image Protection: Block image right-click save, dragging, and save shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => {
      if (
        e.target.tagName === 'IMG' ||
        e.target.closest('img') ||
        e.target.closest('.protected-container') ||
        e.target.closest('[data-protected-image]')
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG' || e.target.closest('img')) {
        e.preventDefault();
        return false;
      }
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigateToProduct = (productId, replace = false) => {
    const prod = PRODUCTS.find(p => p.id === productId);
    setSelectedProductId(productId);
    setActivePage('product');

    // Update browser URL to individual product link (e.g. /thala-tshirt)
    const slug = prod ? (prod.slug || prod.id) : productId;
    const url = `/${slug}`;
    if (window.location.pathname !== url) {
      if (replace) {
        window.history.replaceState({ page: 'product', productId }, '', url);
      } else {
        window.history.pushState({ page: 'product', productId }, '', url);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    const url = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== url) {
      window.history.pushState({ page }, '', url);
    }
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

            {activePage === 'showroom' && (
              <ShowroomPage
                onNavigateProduct={navigateToProduct}
                setActivePage={handlePageChange}
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
              handlePageChange('checkout');
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

          {/* 6. Legal Policies Modal */}
          <PolicyModal
            isOpen={isPolicyModalOpen}
            onClose={() => setIsPolicyModalOpen(false)}
            initialTab={policyModalTab}
          />

          {/* 8. Notification Toasts */}
          <Toast />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
