import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../common/ProductCard';

export default function FeaturedCollection({ onNavigateProduct, onShopClick }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filters = ['ALL', 'STREETWEAR', 'ANIME', 'MINIMAL'];

  const featuredList = PRODUCTS.filter(p => p.isFeatured).slice(0, 6);

  const filteredProducts = activeFilter === 'ALL'
    ? featuredList
    : featuredList.filter(p => p.category.toUpperCase() === activeFilter);

  return (
    <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-heading font-semibold text-brand-secondary uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Curated Capsule // Drop 01</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-light tracking-tight uppercase">
            FEATURED <span className="text-outline hover:text-brand-primaryLight transition-colors cursor-default">ARCHIVE</span>
          </h2>
          <p className="text-sm text-brand-muted mt-1 max-w-lg">
            High-density graphics and 240 GSM pre-shrunk French Terry cotton. Engineered for long-term silhouette retention.
          </p>
        </div>

        {/* Filter Pills and View All Link */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all ${
                activeFilter === f
                  ? 'bg-brand-primary text-white shadow-glow-primary'
                  : 'bg-brand-surface text-brand-muted hover:text-brand-light border border-brand-border'
              }`}
            >
              {f}
            </button>
          ))}

          <button
            onClick={onShopClick}
            className="inline-flex items-center gap-1.5 ml-2 text-xs font-heading font-bold text-brand-secondary hover:text-white transition-colors"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-accent" />
          </button>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onNavigateProduct={onNavigateProduct}
          />
        ))}
      </div>
    </section>
  );
}
