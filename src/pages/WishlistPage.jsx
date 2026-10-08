import React from 'react';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/common/ProductCard';

export default function WishlistPage({ onNavigateProduct, setActivePage }) {
  const { wishlist } = useWishlist();

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="py-8 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="pb-6 mb-8 border-b border-brand-border">
        <span className="text-xs font-mono text-brand-volt uppercase tracking-widest">
          Saved Favorites
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-light tracking-tight uppercase mt-1">
          YOUR <span className="text-outline hover:text-brand-volt transition-colors cursor-default">WISHLIST</span> ({wishlistedProducts.length})
        </h1>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20 bg-brand-surface rounded-3xl border border-brand-border p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-elevated border border-brand-border flex items-center justify-center mx-auto text-brand-muted">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-display font-bold text-brand-light">NO SAVED PIECES YET</h2>
          <p className="text-xs text-brand-muted max-w-sm mx-auto">
            Click the heart icon on any drop in our collection to save your favorite cuts for later.
          </p>
          <button
            onClick={() => setActivePage('shop')}
            className="px-8 py-3 bg-brand-volt text-brand-black font-heading font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white transition-colors"
          >
            EXPLORE ARCHIVE
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {wishlistedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigateProduct={onNavigateProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
