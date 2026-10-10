import React, { useState } from 'react';
import { ArrowRight, Sparkles, MessageSquare, Clock } from 'lucide-react';
import { PRODUCTS, BRAND_CONFIG } from '../../data/products';
import ProductCard from '../common/ProductCard';

export default function FeaturedCollection({ onNavigateProduct, onShopClick }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filters = [
    { label: 'ALL', id: 'ALL' },
    { label: 'HALF-HAND', id: 'HALF' },
    { label: 'HOODIES (IN LOAD)', id: 'HOODIE' },
    { label: 'FULL-HAND (IN LOAD)', id: 'FULL' }
  ];

  const featuredList = PRODUCTS.filter(p => p.isFeatured);

  const filteredProducts = activeFilter === 'ALL'
    ? featuredList
    : featuredList.filter(p => {
        if (activeFilter === 'HALF') return p.category.toLowerCase().includes('half');
        if (activeFilter === 'FULL') return p.category.toLowerCase().includes('full');
        if (activeFilter === 'HOODIE') return p.category.toLowerCase().includes('hoodie');
        return true;
      });

  return (
    <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-brand-border">
        <div>
          <div className="flex items-center gap-2 text-xs font-heading font-semibold text-brand-secondary uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Curated Drops // Custom Atelier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-light tracking-tight uppercase">
            FEATURED <span className="text-outline hover:text-brand-primaryLight transition-colors cursor-default">ARCHIVE</span>
          </h2>
          <p className="text-sm text-brand-muted mt-1 max-w-lg">
            Heavyweight 240 GSM half-hand tees, 260 GSM full-hand tees & 380 GSM fleece hoodies.
          </p>
        </div>

        {/* Filter Pills and View All Link */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all ${
                activeFilter === f.id
                  ? 'bg-brand-primary text-white shadow-glow-primary'
                  : 'bg-brand-surface text-brand-muted hover:text-brand-light border border-brand-border'
              }`}
            >
              {f.label}
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

      {/* Product Cards Grid or Waiting Load Message */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigateProduct={onNavigateProduct}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 sm:p-14 rounded-3xl bg-brand-surface border-2 border-brand-primary/40 text-center space-y-4 shadow-card-rich">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/20 border border-brand-primary text-brand-secondary text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
            <span>{activeFilter === 'HOODIE' ? 'HOODIES' : 'FULL-HAND TEES'} IN THE LOAD // BATCH 02</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-light uppercase">
            {activeFilter === 'HOODIE' ? '380-420 GSM HOODIES ARE CURRENTLY IN PRODUCTION LOAD' : '260 GSM FULL-HAND TEES IN PRODUCTION LOAD'}
          </h3>

          <p className="text-xs sm:text-sm text-brand-muted max-w-xl mx-auto font-body leading-relaxed">
            {activeFilter === 'HOODIE' 
              ? 'Real heavyweight French Terry Fleece hoodies are currently undergoing factory acid wash & curing load. No dummy stock photos — reserve your piece now on WhatsApp before the public drop!' 
              : 'Long sleeve heavyweight tees with architectural ribbed cuffs currently in sewing & curing pipeline. Pre-reserve on WhatsApp!'}
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                const text = encodeURIComponent(
                  `⚡ *RADNUZ STUDIO — ${activeFilter === 'HOODIE' ? 'HOODIE' : 'FULL-HAND'} DROP NOTIFY* ⚡\n\n` +
                  `Hey Radnuz team, please add me to the Batch 02 VIP alert list for ${activeFilter === 'HOODIE' ? 'Hoodies' : 'Full-Hand Tees'}.`
                );
                window.open(`https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${text}`, '_blank');
              }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-heading font-extrabold uppercase tracking-wider transition-all shadow-glow-accent"
            >
              <MessageSquare className="w-4 h-4" />
              <span>PRE-RESERVE ON WHATSAPP (₹0 ADVANCE)</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
