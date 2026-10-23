import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Sparkles, ShoppingBag, MessageSquare, Gift, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCTS, BRAND_CONFIG } from '../../data/products';
import { useCart } from '../../context/CartContext';

export default function DiwaliOfferPopup({ isOpen, onClose, onNavigateProduct }) {
  const { addToCart } = useCart();

  // Find the 3 combo products
  const thalaProduct = PRODUCTS.find(p => p.id === 'radnuz-ajith-still') || PRODUCTS[1];
  const thalapathyProduct = PRODUCTS.find(p => p.id === 'radnuz-cm-vijay') || PRODUCTS[2];
  const thalaThalapathyProduct = PRODUCTS.find(p => p.id === 'radnuz-thala-thalapathy') || PRODUCTS[3];

  useEffect(() => {
    if (isOpen) {
      // Golden & Festive Confetti burst
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#FBBF24', '#ffffff']
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [isOpen]);

  const handleWhatsAppClaim = () => {
    const text = encodeURIComponent(
      `🪔 *RADNUZ STUDIO — DIWALI COMBO OFFER CLAIM* 🪔\n\n` +
      `Hey Radnuz Team! I want to claim the Diwali Special Buy 2 Get 1 Free Combo:\n\n` +
      `1. *Thala (Ajith Still) 240 GSM Tee* — ₹549\n` +
      `2. *Thalapathy (CM Vijay) 240 GSM Tee* — ₹549\n` +
      `3. *Thala-Thalapathy Dual 240 GSM Tee* — 🎁 FREE (₹0!)\n\n` +
      `Total Deal Price: *₹1098* (Saved ₹549 + Free Express Shipping)\n\n` +
      `Please confirm my size allocation (M/L/XL) and send payment QR.`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${text}`, '_blank');
    onClose();
  };

  const handleAddComboToCart = () => {
    // Add Thala Tee
    if (thalaProduct) {
      addToCart({
        ...thalaProduct,
        selectedColor: thalaProduct.colors[0],
        selectedSize: 'L',
        quantity: 1
      });
    }

    // Add Thalapathy Tee
    if (thalapathyProduct) {
      addToCart({
        ...thalapathyProduct,
        selectedColor: thalapathyProduct.colors[0],
        selectedSize: 'L',
        quantity: 1
      });
    }

    // Add Thala Thalapathy Tee as 100% FREE (price 0)
    if (thalaThalapathyProduct) {
      addToCart({
        ...thalaThalapathyProduct,
        name: `${thalaThalapathyProduct.name} (DIWALI FREE GIFT)`,
        price: 0,
        originalPrice: 549,
        badge: '🎁 DIWALI FREE GIFT',
        selectedColor: thalaThalapathyProduct.colors[0],
        selectedSize: 'L',
        quantity: 1,
        isCustom: true // Ensure it has a unique cart entry
      });
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-amber-500/40 bg-brand-surface shadow-2xl my-auto"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              aria-label="Close offer popup"
              className="absolute right-3.5 top-3.5 z-20 rounded-full p-2 bg-black/60 text-brand-muted hover:text-white transition-colors border border-white/10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Glowing festive background decoration */}
            <div className="absolute -top-24 -left-24 w-56 h-56 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="p-6 sm:p-8 relative z-10 text-center">
              {/* Festive Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-red-500/20 to-amber-500/20 border border-amber-500/50 mb-3 shadow-glow-primary">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-[11px] font-heading font-black uppercase tracking-widest text-amber-300">
                  🪔 DIWALI MEGA DHAMAKA COMBO
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white leading-tight">
                BUY <span className="text-amber-400">THALA</span> & <span className="text-red-400">THALAPATHY</span> TEE,
                <br />
                GET <span className="underline decoration-amber-400 decoration-wavy text-emerald-400">THALA-THALAPATHY TEE FREE!</span>
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-brand-muted max-w-md mx-auto">
                Buy 2 Iconic 240 GSM Streetwear Tees & Get the Dual Tribute Masterpiece 100% Free with Free Shipping!
              </p>

              {/* 3-Tee Product Showcase Visual */}
              <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3 items-center">
                {/* 1. Thala Tee */}
                <div 
                  onClick={() => {
                    onClose();
                    onNavigateProduct?.('radnuz-ajith-still');
                  }}
                  className="group relative flex flex-col items-center p-2 sm:p-3 rounded-2xl bg-brand-elevated/80 border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer"
                >
                  <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black mb-2">
                    <img 
                      src={thalaProduct?.images?.primary} 
                      alt="Thala T-shirt"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/80 text-white">
                      1ST TEE
                    </div>
                  </div>
                  <span className="text-[11px] font-heading font-bold text-white truncate w-full">Thala Tee</span>
                  <span className="text-xs font-mono font-bold text-amber-400">₹549</span>
                </div>

                {/* 2. Thalapathy Tee */}
                <div 
                  onClick={() => {
                    onClose();
                    onNavigateProduct?.('radnuz-cm-vijay');
                  }}
                  className="group relative flex flex-col items-center p-2 sm:p-3 rounded-2xl bg-brand-elevated/80 border border-white/10 hover:border-red-400/50 transition-all cursor-pointer"
                >
                  <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black mb-2">
                    <img 
                      src={thalapathyProduct?.images?.primary} 
                      alt="Thalapathy T-shirt"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/80 text-white">
                      2ND TEE
                    </div>
                  </div>
                  <span className="text-[11px] font-heading font-bold text-white truncate w-full">Thalapathy Tee</span>
                  <span className="text-xs font-mono font-bold text-red-400">₹549</span>
                </div>

                {/* 3. Thala Thalapathy Duo Tee (FREE) */}
                <div 
                  onClick={() => {
                    onClose();
                    onNavigateProduct?.('radnuz-thala-thalapathy');
                  }}
                  className="group relative flex flex-col items-center p-2 sm:p-3 rounded-2xl bg-gradient-to-b from-amber-500/20 to-emerald-500/10 border-2 border-amber-400 shadow-glow-primary hover:scale-[1.03] transition-all cursor-pointer ring-2 ring-amber-400/30"
                >
                  <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black mb-2">
                    <img 
                      src={thalaThalapathyProduct?.images?.primary} 
                      alt="Thala Thalapathy Duo T-shirt"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute top-1 left-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500 text-black text-center shadow-md animate-pulse">
                      🎁 100% FREE
                    </div>
                  </div>
                  <span className="text-[11px] font-heading font-bold text-emerald-300 truncate w-full">Duo Tee</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-brand-muted line-through">₹549</span>
                    <span className="text-xs font-mono font-black text-emerald-400">FREE ₹0</span>
                  </div>
                </div>
              </div>

              {/* Price Calculation Pill */}
              <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-brand-muted">
                  Total Worth: <span className="line-through">₹1,647</span>
                </span>
                <span className="text-amber-300 font-bold">
                  Combo Deal: <strong className="text-base text-white font-black">₹1,098</strong> (Save ₹549)
                </span>
              </div>

              {/* Actions */}
              <div className="mt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={handleWhatsAppClaim}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-black text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-600/30 group"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
                  <span>CLAIM DIWALI COMBO ON WHATSAPP (₹1,098)</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddComboToCart}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-heading font-black text-xs tracking-wider uppercase transition-all shadow-md"
                >
                  <Gift className="w-4 h-4" />
                  <span>ADD ALL 3 TEES TO BAG (DUO TEE FREE)</span>
                </button>
              </div>

              {/* Dismiss */}
              <button
                type="button"
                onClick={onClose}
                className="mt-3 text-xs font-heading font-bold uppercase tracking-wider text-brand-muted hover:text-white transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
