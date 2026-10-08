import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BRAND_CONFIG } from '../../data/products';

export default function CartDrawer({ onProceedCheckout }) {
  const {
    cartItems,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
    discount,
    discountAmount,
    shippingFee,
    total,
    freeShippingProgress,
    amountNeededForFreeShip,
    isFreeShippingByThreshold,
    couponCode,
    setCouponCode,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyCoupon(inputCode);
      setInputCode('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Slide-out Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md bg-brand-surface border-l border-brand-border h-full flex flex-col justify-between overflow-hidden z-10 shadow-2xl"
        >
          {/* Top Bar */}
          <div className="p-5 border-b border-brand-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-secondary" />
                <h2 className="text-base font-display font-bold text-brand-light tracking-wide uppercase">
                  YOUR BAG ({totalItems})
                </h2>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 text-brand-muted hover:text-brand-light bg-brand-elevated rounded-lg hover:bg-brand-border transition-colors"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="mt-4 p-3.5 bg-brand-elevated/80 rounded-xl border border-brand-border">
              <div className="flex items-center justify-between text-xs font-heading font-semibold mb-1.5">
                <span className="flex items-center gap-1.5 text-brand-chalk">
                  <Truck className="w-3.5 h-3.5 text-brand-secondary" />
                  {isFreeShippingByThreshold ? (
                    <span className="text-brand-secondary">Unlocked: Free Express Shipping!</span>
                  ) : (
                    <span>Add ₹{amountNeededForFreeShip} more for Free Shipping</span>
                  )}
                </span>
                <span className="text-brand-muted font-mono">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-2 bg-brand-dark rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShippingProgress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary"
                />
              </div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-elevated border border-brand-border flex items-center justify-center text-brand-muted">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-brand-light">YOUR BAG IS EMPTY</h3>
                  <p className="text-xs text-brand-muted max-w-xs mt-1 font-body">
                    Heavyweight drops and custom 1-of-1 creations are waiting for you.
                  </p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-6 py-3 bg-brand-primary hover:bg-brand-primaryLight text-white font-heading font-bold text-xs tracking-wider uppercase rounded-xl transition-colors shadow-glow-primary"
                >
                  DISCOVER DROPS
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="flex gap-4 p-3.5 bg-brand-elevated/70 rounded-2xl border border-brand-border hover:border-brand-primary/40 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-brand-dark shrink-0 border border-brand-border/40">
                    <img
                      src={item.customPreviewUrl || item.images?.primary || item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                    {item.isCustom && (
                      <span className="absolute bottom-1 left-1 right-1 text-[8px] font-heading font-extrabold bg-brand-accent text-white text-center py-0.5 rounded">
                        1-OF-1
                      </span>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs md:text-sm font-display font-bold text-brand-light truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-brand-muted hover:text-brand-accent p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Specs */}
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-brand-dark rounded text-[10px] font-mono text-brand-chalk border border-brand-border">
                          {item.selectedSize}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-mono text-brand-muted">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
                            style={{ backgroundColor: item.selectedColor?.hex || '#141416' }}
                          />
                          {item.selectedColor?.name || 'Black'}
                        </span>
                      </div>

                      {/* Custom text tag if present */}
                      {item.customText && (
                        <div className="mt-1 text-[10px] font-heading text-brand-secondary truncate">
                          Text: "{item.customText}"
                        </div>
                      )}
                    </div>

                    {/* Price and Quantity Controller */}
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-brand-border/40">
                      <div className="flex items-center bg-brand-dark rounded-lg border border-brand-border">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="p-1.5 text-brand-muted hover:text-brand-light hover:bg-brand-border/50"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-bold text-brand-light">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="p-1.5 text-brand-muted hover:text-brand-light hover:bg-brand-border/50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-mono font-bold text-brand-chalk">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Summary & Actions */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-brand-elevated border-t border-brand-border space-y-4">
              {/* Promo Code Input */}
              <div>
                {discount.code ? (
                  <div className="flex items-center justify-between p-2.5 bg-brand-surface rounded-xl border border-brand-primary/40 text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-brand-secondary font-semibold">
                      <Tag className="w-3.5 h-3.5 text-brand-accent" />
                      CODE: {discount.code} APPLIED
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-brand-muted hover:text-brand-accent text-[10px] uppercase font-bold"
                    >
                      REMOVE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="PROMO CODE (e.g. RADNUZ10)"
                      className="flex-1 bg-brand-surface border border-brand-border rounded-xl px-3 py-2 text-xs font-heading text-brand-light uppercase placeholder-brand-muted focus:outline-none focus:border-brand-primary"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-primary hover:bg-brand-primaryLight border border-brand-primary rounded-xl text-xs font-heading font-bold text-white transition-colors shadow-sm"
                    >
                      APPLY
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculation Row */}
              <div className="space-y-1.5 text-xs font-mono text-brand-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-brand-light">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-brand-secondary font-bold">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className={shippingFee === 0 ? "text-brand-secondary font-bold" : "text-brand-light"}>
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-brand-border text-sm font-bold text-brand-light font-heading">
                  <span>TOTAL ESTIMATED</span>
                  <span className="font-mono text-base text-brand-light font-bold">₹{total}</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  onProceedCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white font-heading font-extrabold text-xs tracking-wider uppercase transition-all shadow-glow-primary group"
              >
                <span>PROCEED TO ORDER</span>
                <ArrowRight className="w-4 h-4 text-brand-accent group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center">
                <span className="text-[10px] font-heading text-brand-muted">
                  Instant WhatsApp Order Available at Checkout
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
