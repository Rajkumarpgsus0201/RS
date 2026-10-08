import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export default function CategorySection({ onSelectCategory, onCustomClick }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-6 border-b border-brand-border">
        <div>
          <span className="text-xs font-heading font-semibold uppercase tracking-widest text-brand-secondary">
            Aesthetic Taxonomy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-light tracking-tight uppercase mt-1">
            SHOP BY <span className="text-outline hover:text-brand-primaryLight transition-colors cursor-default">CATEGORY</span>
          </h2>
        </div>
        <p className="text-xs font-heading text-brand-muted uppercase max-w-xs">
          Explore our subcultural silhouettes and 1-of-1 customization lab
        </p>
      </div>

      {/* Asymmetric Editorial Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
        {/* Large Feature 1: Streetwear & Brutalism (Span 7 cols) */}
        <div
          onClick={() => onSelectCategory('Streetwear')}
          className="group relative md:col-span-7 h-[360px] md:h-[440px] rounded-3xl overflow-hidden bg-brand-surface border border-brand-border cursor-pointer transition-all duration-500 hover:border-brand-primary/80 shadow-card-rich"
        >
          <img
            src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop"
            alt="Streetwear Category"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-dark/40 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 text-[11px] font-heading font-bold uppercase rounded-lg bg-brand-dark/90 text-brand-secondary border border-brand-primary/30 shadow-md">
              DROP 01 // CORE
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-heading text-brand-secondary uppercase tracking-wider font-semibold">Subcultural Heavyweight</span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-light uppercase group-hover:text-brand-secondary transition-colors">
                STREETWEAR & CULTURE
              </h3>
              <p className="text-xs text-brand-muted mt-1 max-w-sm hidden sm:block">
                Japanese cyber-kanji, typography, and oversized drop-shoulder silhouettes.
              </p>
            </div>
            <div className="w-11 h-11 rounded-full bg-brand-primary/30 border border-brand-primary/50 flex items-center justify-center text-white group-hover:bg-brand-primary group-hover:scale-110 transition-all shrink-0 ml-4 shadow-glow-primary">
              <ArrowUpRight className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>

        {/* Tall Feature 2: Custom 1-of-1 Atelier (Span 5 cols) */}
        <div
          onClick={onCustomClick}
          className="group relative md:col-span-5 h-[360px] md:h-[440px] rounded-3xl overflow-hidden bg-brand-surface border border-brand-border cursor-pointer transition-all duration-500 hover:border-brand-primary/80 shadow-card-rich"
        >
          <img
            src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop"
            alt="Custom Atelier"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-dark/40 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 text-[11px] font-heading font-bold uppercase rounded-lg bg-brand-primary text-white shadow-glow-primary">
              1-OF-1 CUSTOM LAB
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-heading text-brand-secondary uppercase tracking-wider font-semibold">Bespoke Production</span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-light uppercase group-hover:text-brand-secondary transition-colors">
                CUSTOM 1-OF-1 TEE
              </h3>
              <p className="text-xs text-brand-muted mt-1 max-w-xs">
                Upload your files. Drag, scale, and inspect on our interactive 3D canvas.
              </p>
            </div>
            <div className="w-11 h-11 rounded-full bg-brand-accent text-white flex items-center justify-center transition-transform group-hover:rotate-45 shrink-0 ml-4 shadow-glow-accent">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Card 3: Anime Darkwear (Span 4 cols) */}
        <div
          onClick={() => onSelectCategory('Anime')}
          className="group relative md:col-span-4 h-[280px] rounded-2xl overflow-hidden bg-brand-surface border border-brand-border cursor-pointer transition-all duration-500 hover:border-brand-secondary/70 shadow-card-rich"
        >
          <img
            src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
            alt="Anime Darkwear"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-dark/30 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-heading font-semibold text-brand-secondary uppercase">Neo Tokyo</span>
              <h4 className="text-xl font-display font-black text-brand-light uppercase group-hover:text-brand-secondary transition-colors">
                ANIME DARKWEAR
              </h4>
            </div>
            <ArrowUpRight className="w-5 h-5 text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </div>
        </div>

        {/* Card 4: Minimal & Architecture (Span 4 cols) */}
        <div
          onClick={() => onSelectCategory('Minimal')}
          className="group relative md:col-span-4 h-[280px] rounded-2xl overflow-hidden bg-brand-surface border border-brand-border cursor-pointer transition-all duration-500 hover:border-brand-secondary/70 shadow-card-rich"
        >
          <img
            src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop"
            alt="Minimal Architecture"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-dark/30 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-heading font-semibold text-brand-secondary uppercase">Wireframes & Micro-type</span>
              <h4 className="text-xl font-display font-black text-brand-light uppercase group-hover:text-brand-secondary transition-colors">
                MINIMAL & ARCHITECTURE
              </h4>
            </div>
            <ArrowUpRight className="w-5 h-5 text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </div>
        </div>

        {/* Card 5: Acid Distressed & Trending (Span 4 cols) */}
        <div
          onClick={() => onSelectCategory('Trending')}
          className="group relative md:col-span-4 h-[280px] rounded-2xl overflow-hidden bg-brand-surface border border-brand-border cursor-pointer transition-all duration-500 hover:border-brand-secondary/70 shadow-card-rich"
        >
          <img
            src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop"
            alt="Acid Distressed"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-dark/30 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-heading font-semibold text-brand-secondary uppercase">Hand-Washed Vintage</span>
              <h4 className="text-xl font-display font-black text-brand-light uppercase group-hover:text-brand-secondary transition-colors">
                ACID & DISTRESSED
              </h4>
            </div>
            <ArrowUpRight className="w-5 h-5 text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
