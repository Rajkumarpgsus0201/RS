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
            Apparel Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-light tracking-tight uppercase mt-1">
            EXPLORE <span className="text-outline hover:text-brand-primaryLight transition-colors cursor-default">CORE CUTS</span>
          </h2>
        </div>
        <p className="text-xs font-heading text-brand-muted uppercase max-w-xs">
          Engineered 240 GSM half-hand tees, 260 GSM full-hand tees & 380 GSM hoodies
        </p>
      </div>

      {/* Asymmetric Editorial Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
        {/* Card 1: Half-Hand T-Shirts (Span 7 cols) - REAL AJITH STILL BACK IMAGE */}
        <div
          onClick={() => onSelectCategory('Half-Hand T-Shirts')}
          className="group relative md:col-span-7 h-[360px] md:h-[440px] rounded-3xl overflow-hidden bg-brand-surface border border-brand-border cursor-pointer transition-all duration-500 hover:border-brand-primary/80 shadow-card-rich"
        >
          <img
            src="https://res.cloudinary.com/dapilmiei/image/upload/v1791632970/aj-back_pblqgr.png"
            alt="Half-Hand T-Shirts Live Drops"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-dark/40 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 text-[11px] font-heading font-bold uppercase rounded-lg bg-brand-primary text-white shadow-glow-primary">
              240 GSM // 3 DROPS LIVE NOW
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-heading text-brand-secondary uppercase tracking-wider font-semibold">Ajith Still • CM Vijay • Thala Thalapathy</span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-light uppercase group-hover:text-brand-secondary transition-colors">
                HALF-HAND SIGNATURE TEES
              </h3>
              <p className="text-xs text-brand-muted mt-1 max-w-sm hidden sm:block">
                Oversized boxy drop-shoulder half sleeve tees crafted from 240 GSM French Terry combed cotton.
              </p>
            </div>
            <div className="w-11 h-11 rounded-full bg-brand-primary/30 border border-brand-primary/50 flex items-center justify-center text-white group-hover:bg-brand-primary group-hover:scale-110 transition-all shrink-0 ml-4 shadow-glow-primary">
              <ArrowUpRight className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>

        {/* Card 2: Custom 1-of-1 Atelier (Span 5 cols) - REAL CM VIJAY IMAGE */}
        <div
          onClick={onCustomClick}
          className="group relative md:col-span-5 h-[360px] md:h-[440px] rounded-3xl overflow-hidden bg-brand-surface border border-brand-border cursor-pointer transition-all duration-500 hover:border-brand-primary/80 shadow-card-rich"
        >
          <img
            src="https://res.cloudinary.com/dapilmiei/image/upload/v1791632962/cm_gcqjgp.png"
            alt="Custom Atelier 1-of-1"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-dark/40 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 text-[11px] font-heading font-bold uppercase rounded-lg bg-brand-primary text-white shadow-glow-primary">
              1-OF-1 BESPOKE LAB
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-heading text-brand-secondary uppercase tracking-wider font-semibold">Custom Apparel</span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-light uppercase group-hover:text-brand-secondary transition-colors">
                CUSTOMIZE YOUR TEE
              </h3>
              <p className="text-xs text-brand-muted mt-1 max-w-xs">
                Upload your graphics, position text on 3D canvas, and order directly on WhatsApp.
              </p>
            </div>
            <div className="w-11 h-11 rounded-full bg-brand-accent text-white flex items-center justify-center transition-transform group-hover:rotate-45 shrink-0 ml-4 shadow-glow-accent">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Card 3: Full-Hand T-Shirts (Span 6 cols) - REAL THALA THALAPATHY IMAGE */}
        <div
          onClick={() => onSelectCategory('Full-Hand T-Shirts')}
          className="group relative md:col-span-6 h-[300px] rounded-2xl overflow-hidden bg-brand-surface border border-brand-border cursor-pointer transition-all duration-500 hover:border-brand-secondary/70 shadow-card-rich"
        >
          <img
            src="https://res.cloudinary.com/dapilmiei/image/upload/v1791632970/TT-back_vsxvub.png"
            alt="Full-Hand T-Shirts In Load"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-dark/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-[10px] font-heading font-bold uppercase rounded-lg bg-brand-dark/90 text-brand-secondary border border-brand-secondary/30">
              260 GSM // IN PRODUCTION LOAD
            </span>
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-heading font-semibold text-brand-secondary uppercase">Ribbed Wrist Cuffs</span>
              <h4 className="text-xl sm:text-2xl font-display font-black text-brand-light uppercase group-hover:text-brand-secondary transition-colors">
                FULL-HAND TEES // IN LOAD
              </h4>
              <p className="text-xs text-brand-muted mt-0.5">Heavyweight architectural long sleeve cuts currently in sewing pipeline.</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </div>
        </div>

        {/* Card 4: Heavyweight Hoodies (Span 6 cols) - SLEEK WAITING CARD NO DUMMY IMAGES */}
        <div
          onClick={() => onSelectCategory('Hoodies')}
          className="group relative md:col-span-6 h-[300px] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-surface via-brand-dark to-brand-elevated border-2 border-brand-primary/40 cursor-pointer transition-all duration-500 hover:border-brand-primaryLight shadow-card-rich flex flex-col justify-between p-6"
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 text-[10px] font-heading font-bold uppercase rounded-lg bg-brand-accent text-white shadow-glow-accent animate-pulse">
              ⏳ WAITING IN LOAD // DROP 02
            </span>
            <span className="text-[10px] font-mono text-brand-secondary">
              FACTORY PIPELINE
            </span>
          </div>

          <div>
            <span className="text-[10px] font-heading font-bold text-brand-secondary uppercase tracking-widest">
              380 GSM - 420 GSM FRENCH TERRY FLEECE
            </span>
            <h4 className="text-xl sm:text-2xl font-display font-black text-brand-light uppercase group-hover:text-brand-secondary transition-colors mt-0.5">
              HOODIES // WAITING IN THE LOAD
            </h4>
            <p className="text-xs text-brand-muted mt-1 max-w-sm">
              Real heavyweight hoodies currently undergoing acid wash & curing load. Tap to pre-reserve on WhatsApp!
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-brand-border/60">
            <span className="text-[11px] font-mono text-brand-accent font-bold">
              ⚡ TAP TO PRE-RESERVE (₹0 ADVANCE)
            </span>
            <ArrowUpRight className="w-5 h-5 text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
