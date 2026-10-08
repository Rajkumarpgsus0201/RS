import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Navbar({ activePage, setActivePage, onOpenSearch, onOpenMobileMenu }) {
  const { totalItems, setIsDrawerOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', page: 'shop', badge: null },
    { name: 'Custom Studio', page: 'customize', badge: '1-OF-1' },
    { name: 'Featured Drops', page: 'home', section: 'featured' },
    { name: 'The Atelier', page: 'about', badge: null },
  ];

  const handleNavClick = (link) => {
    setActivePage(link.page);
    if (link.section && link.page === 'home') {
      const el = document.getElementById(link.section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-dark/95 backdrop-blur-xl border-b border-brand-border/80 shadow-2xl py-3.5'
          : 'bg-brand-black/70 backdrop-blur-md border-b border-brand-border/40 py-4 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            {/* Official RADNUZ Chrome Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/radnuz-logo.png"
                alt="RADNUZ"
                className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_12px_rgba(255,255,255,0.18)]"
              />
              <span className="text-[9px] font-heading font-bold tracking-[0.25em] text-brand-muted uppercase hidden lg:block border-l border-brand-border/60 pl-2.5">
                STUDIO // 240 GSM
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activePage === link.page && !link.section;
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`relative px-4 py-2 rounded-lg text-xs font-heading font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'text-brand-light'
                    : 'text-brand-muted hover:text-brand-light hover:bg-brand-elevated/40'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.name}
                  {link.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-brand-accent text-white rounded">
                      {link.badge}
                    </span>
                  )}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-brand-primary/20 rounded-lg border border-brand-primary/40 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Search, Wishlist, Cart, Mobile Menu, Admin) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-2 text-xs font-heading font-medium text-brand-muted hover:text-brand-light bg-brand-surface hover:bg-brand-elevated border border-brand-border rounded-lg transition-colors"
            title="Search Archive"
          >
            <Search className="w-4 h-4 text-brand-secondary" />
            <span className="hidden lg:inline">Search...</span>
            <span className="hidden lg:inline text-[10px] bg-brand-dark px-1.5 py-0.5 rounded border border-brand-border text-brand-muted font-mono">⌘K</span>
          </button>

          {/* Wishlist Link / Trigger */}
          <button
            onClick={() => setActivePage('wishlist')}
            className="relative p-2.5 text-brand-muted hover:text-brand-light bg-brand-surface hover:bg-brand-elevated border border-brand-border rounded-lg transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4 text-brand-muted hover:text-brand-accent transition-colors" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-brand-accent text-white text-[10px] font-mono font-bold flex items-center justify-center shadow-md">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative flex items-center gap-2 py-2 px-3.5 bg-brand-primary hover:bg-brand-primaryLight text-white font-heading font-bold text-xs rounded-lg transition-all shadow-glow-primary group"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-mono text-xs font-bold bg-brand-accent text-white px-1.5 py-0.2 rounded-full text-[10px]">{totalItems}</span>
            <span className="hidden sm:inline font-heading tracking-wider text-[11px] font-bold">BAG</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={onOpenMobileMenu}
            className="p-2.5 text-brand-light bg-brand-surface border border-brand-border rounded-lg md:hidden hover:bg-brand-elevated"
            aria-label="Toggle Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
