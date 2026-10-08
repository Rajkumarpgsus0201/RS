import React from 'react';
import { Star, CheckCircle2, Camera } from 'lucide-react';
import { LOOKBOOK_REVIEWS } from '../../data/products';

export default function LookbookSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-6 border-b border-brand-border">
        <div>
          <span className="text-xs font-heading font-semibold uppercase tracking-widest text-brand-secondary">
            Street Culture // Fit Checks
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-light tracking-tight uppercase mt-1">
            ON THE <span className="text-outline hover:text-brand-primaryLight transition-colors cursor-default">STREETS</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-heading text-brand-muted">
          <Camera className="w-4 h-4 text-brand-secondary" />
          <span>TAG @RADNUZ.STUDIO TO BE FEATURED</span>
        </div>
      </div>

      {/* Lookbook Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {LOOKBOOK_REVIEWS.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-brand-surface border border-brand-border rounded-3xl overflow-hidden group hover:border-brand-primary/60 transition-all duration-300 shadow-card-rich"
          >
            {/* Fit Photo */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-dark">
              <img
                src={item.fitImage}
                alt={`${item.author} fit check`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-brand-dark/90 backdrop-blur-md border border-brand-border text-[11px] font-mono text-brand-secondary font-semibold">
                {item.sizeOrdered}
              </div>
            </div>

            {/* Review Card Body */}
            <div className="p-6 flex flex-col justify-between flex-1 gap-4">
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-2.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-brand-chalk leading-relaxed italic font-body">
                  "{item.text}"
                </p>
              </div>

              {/* Author and Product */}
              <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-light font-heading">
                    <span>{item.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary" />
                  </div>
                  <span className="text-[10px] font-mono text-brand-muted">{item.location}</span>
                </div>

                <span className="text-[10px] font-heading font-semibold text-brand-muted uppercase text-right truncate max-w-[140px]">
                  {item.product.split('//')[0]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
