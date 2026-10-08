import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product, onNavigateProduct }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSize, setShowQuickSize] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (size, e) => {
    e.stopPropagation();
    addToCart({
      ...product,
      selectedColor,
      selectedSize: size,
      quantity: 1
    });
    setShowQuickSize(false);
  };

  return (
    <div
      className="group relative flex flex-col bg-brand-surface/80 border border-brand-border hover:border-brand-secondary/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-card-rich"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSize(false);
      }}
    >
      {/* Top Image Container */}
      <div 
        onClick={() => onNavigateProduct(product.id)}
        className="relative aspect-[4/5] w-full overflow-hidden bg-brand-dark cursor-pointer"
      >
        {/* Primary Image */}
        <img
          src={product.images.primary}
          alt={product.name}
          className={`h-full w-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && product.images.secondary ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Image on Hover */}
        {product.images.secondary && (
          <img
            src={product.images.secondary}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          {product.badge && (
            <span className="px-3 py-1 text-[10px] font-heading font-bold tracking-wider uppercase rounded-md bg-brand-dark/95 text-brand-secondary border border-brand-primary/40 shadow-md backdrop-blur-md">
              {product.badge}
            </span>
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`pointer-events-auto p-2.5 rounded-full transition-all duration-200 backdrop-blur-md ${
              isWishlisted
                ? 'bg-brand-accent text-white scale-110 shadow-lg'
                : 'bg-brand-dark/70 text-brand-muted hover:text-white hover:bg-brand-dark'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* GSM & Fit Technical Tag */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="text-[10px] font-mono text-brand-chalk/90 bg-brand-dark/80 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
            {product.gsm} // {product.fit.split(' ')[0]}
          </span>
        </div>

        {/* Quick Add Overlay Drawer on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 right-3 left-3 z-10 flex flex-col items-center pointer-events-auto"
            >
              {!showQuickSize ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQuickSize(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white font-heading font-bold text-xs tracking-wider uppercase transition-colors shadow-glow-primary"
                >
                  <Plus className="w-3.5 h-3.5 text-brand-accent" />
                  <span>QUICK ADD</span>
                </button>
              ) : (
                <div className="w-full p-3 rounded-xl bg-brand-surface/98 border border-brand-border backdrop-blur-xl shadow-2xl flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] font-heading font-semibold text-brand-muted px-1">
                    <span>SELECT SIZE</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowQuickSize(false);
                      }}
                      className="hover:text-brand-light"
                    >
                      CANCEL
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={(e) => handleQuickAdd(sz, e)}
                        className="py-1.5 text-xs font-mono font-bold bg-brand-elevated hover:bg-brand-primary hover:text-white rounded-lg text-brand-light border border-brand-border transition-colors"
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Information */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Color Swatches */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-brand-muted">
              {product.category}
            </span>

            {/* Color Swatch Dots */}
            <div className="flex items-center gap-1.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c);
                  }}
                  title={c.name}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor.name === c.name
                      ? 'border-brand-primaryLight scale-125 ring-1 ring-brand-primaryLight/50'
                      : 'border-white/20 hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onNavigateProduct(product.id)}
            className="text-sm md:text-base font-display font-bold text-brand-light hover:text-brand-secondary cursor-pointer transition-colors leading-snug line-clamp-1"
          >
            {product.name}
          </h3>
        </div>

        {/* Price Row */}
        <div className="flex items-center justify-between pt-1.5 border-t border-brand-border/50">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-mono font-bold text-brand-light">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono text-brand-muted line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <span className="text-[11px] font-heading text-brand-secondary font-medium">
            {selectedColor.name}
          </span>
        </div>
      </div>
    </div>
  );
}
