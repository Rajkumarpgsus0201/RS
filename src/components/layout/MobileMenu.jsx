import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, MessageSquare, Sparkles, Heart, ShoppingBag, ShieldCheck } from 'lucide-react';
import { BRAND_CONFIG, CATEGORIES } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function MobileMenu({ isOpen, onClose, setActivePage, activePage }) {
  const { totalItems, setIsDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();

  if (!isOpen) return null;

  const navigateTo = (page) => {
    setActivePage(page);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent("Hi RADNUZ Studio, I have a question regarding your oversized heavyweight tees and custom prints.");
    window.open(`https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex md:hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-sm bg-brand-surface border-r border-brand-border h-full flex flex-col justify-between overflow-y-auto z-10 p-6 no-scrollbar"
        >
          {/* Top Bar */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-brand-border">
              <div className="flex items-center gap-2">
                <img
                  src="/radnuz-logo.png"
                  alt="RADNUZ"
                  className="h-7 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
                />
              </div>
              <button
                onClick={onClose}
                className="p-2 text-brand-muted hover:text-brand-light bg-brand-dark rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="flex items-center justify-between py-3 px-4 my-4 bg-brand-dark rounded-xl text-xs font-heading font-semibold text-brand-muted border border-brand-border/60">
              <span className="flex items-center gap-1.5 text-brand-secondary">
                <Sparkles className="w-3.5 h-3.5 text-brand-accent" /> 240 GSM HEAVYWEIGHT
              </span>
              <span className="text-brand-chalk">DROP 01</span>
            </div>

            {/* Main Navigation Links */}
            <nav className="space-y-1 my-4">
              <button
                onClick={() => navigateTo('home')}
                className="w-full flex items-center justify-between py-3.5 px-3 text-left font-display font-bold text-xl text-brand-light hover:text-brand-secondary border-b border-brand-border/40"
              >
                <span>HOME</span>
                <ArrowRight className="w-4 h-4 text-brand-muted" />
              </button>

              <button
                onClick={() => navigateTo('showroom')}
                className="w-full flex items-center justify-between py-3.5 px-3 text-left font-display font-bold text-xl text-emerald-400 hover:text-emerald-300 border-b border-brand-border/40"
              >
                <div className="flex items-center gap-2">
                  <span>VIRTUAL SHOWROOM</span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-md font-extrabold">3D RACK</span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={() => navigateTo('shop')}
                className="w-full flex items-center justify-between py-3.5 px-3 text-left font-display font-bold text-xl text-brand-light hover:text-brand-secondary border-b border-brand-border/40"
              >
                <span>SHOP ARCHIVE</span>
                <span className="text-xs font-heading font-bold text-white bg-brand-primary px-2 py-0.5 rounded-md">NEW</span>
              </button>

              <button
                onClick={() => navigateTo('customize')}
                className="w-full flex items-center justify-between py-3.5 px-3 text-left font-display font-bold text-xl text-brand-secondary hover:text-white border-b border-brand-border/40"
              >
                <div className="flex items-center gap-2">
                  <span>CUSTOM STUDIO</span>
                  <span className="text-[10px] font-mono bg-brand-accent text-white px-2 py-0.5 rounded-md font-extrabold">1-OF-1</span>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-accent" />
              </button>

              <button
                onClick={() => navigateTo('wishlist')}
                className="w-full flex items-center justify-between py-3.5 px-3 text-left font-display font-bold text-xl text-brand-light hover:text-brand-secondary border-b border-brand-border/40"
              >
                <span>SAVED WISHLIST</span>
                <span className="text-xs font-mono text-brand-chalk">({wishlistCount})</span>
              </button>

              <button
                onClick={() => navigateTo('about')}
                className="w-full flex items-center justify-between py-3.5 px-3 text-left font-display font-bold text-xl text-brand-light hover:text-brand-secondary"
              >
                <span>THE ATELIER MANIFESTO</span>
                <ArrowRight className="w-4 h-4 text-brand-muted" />
              </button>
            </nav>

            {/* Category Quick Chips */}
            <div className="my-6">
              <p className="text-[11px] font-heading font-semibold uppercase text-brand-muted tracking-wider mb-2.5">
                Browse Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigateTo('shop')}
                    className="px-3 py-1.5 rounded-xl text-xs font-heading font-semibold bg-brand-dark text-brand-chalk border border-brand-border hover:border-brand-primary"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-brand-border space-y-3">
            {/* Direct WhatsApp Concierge */}
            <button
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-dark hover:bg-brand-elevated text-brand-light text-xs font-heading font-bold border border-brand-primary/40 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-brand-secondary" />
              <span>WHATSAPP CONCIERGE HELP</span>
            </button>

            {/* Quick Bag Button */}
            <button
              onClick={() => {
                onClose();
                setIsDrawerOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white text-xs font-heading font-extrabold tracking-wider uppercase shadow-glow-primary"
            >
              <ShoppingBag className="w-4 h-4 text-brand-accent" />
              <span>OPEN BAG ({totalItems} ITEMS)</span>
            </button>

            {/* Quick Policy Triggers */}
            <div className="flex items-center justify-center gap-4 pt-2 text-[11px] font-heading text-brand-muted">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenPolicyModal) onOpenPolicyModal('whatsapp');
                }}
                className="hover:text-brand-secondary underline"
              >
                WhatsApp Guide
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenPolicyModal) onOpenPolicyModal('privacy');
                }}
                className="hover:text-brand-light underline"
              >
                Privacy & Terms
              </button>
            </div>

            <div className="text-center pt-1 text-[10px] font-heading text-brand-muted">
              RADNUZ STUDIO © 2026 // ALL RIGHTS RESERVED
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
