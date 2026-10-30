import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCw, 
  MessageSquare, 
  ArrowRight,
  Flame,
  Layers,
  ChevronRight
} from 'lucide-react';
import ShowroomRack from '../components/showroom/ShowroomRack';
import { BRAND_CONFIG } from '../data/products';

export default function ShowroomPage({ onNavigateProduct, setActivePage }) {
  const openWhatsAppConcierge = () => {
    const text = encodeURIComponent(
      "Hi RADNUZ Studio Concierge! I'm browsing the Virtual Showroom and would like styling / sizing assistance."
    );
    window.open(`https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${text}`, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-brand-black">
      
      {/* 1. Showroom Top Breadcrumb & Status */}
      <div className="bg-[#0A0D1B] border-b border-brand-border/60 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-heading">
          <div className="flex items-center gap-2 text-brand-muted">
            <span 
              onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-brand-light cursor-pointer"
            >
              HOME
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-brand-borderLight" />
            <span className="text-brand-secondary font-bold">VIRTUAL SHOWROOM // MENSWEAR ATELIER</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-brand-muted">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE ATELIER RACK
            </span>
            <span>240 GSM HEAVYWEIGHT COLLECTION</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Showroom Clothing Rack (Full Experience) */}
      <ShowroomRack onNavigateProduct={onNavigateProduct} isFullPage={true} />

      {/* 3. Boutique Atelier Guarantees & Concierge Bar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-brand-border/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          <div className="p-6 rounded-2xl bg-brand-surface/60 border border-brand-border/60 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/30 text-brand-secondary shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-black text-brand-light uppercase tracking-wider">
                240 GSM Luxury Weight
              </h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                Every tee hung on our racks is woven with 100% combed French Terry cotton that maintains its boxy streetwear silhouette without sagging.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-brand-surface/60 border border-brand-border/60 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand-accent/10 border border-brand-accent/30 text-brand-accent shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-black text-brand-light uppercase tracking-wider">
                Screen-Grade Pigment
              </h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                Zero peeling, zero cracking. Cured under industrial heat press tested for 60+ machine washes while preserving museum-level vibrancy.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-brand-surface/60 border border-brand-border/60 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-black text-brand-light uppercase tracking-wider">
                WhatsApp Boutique Stylist
              </h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                Need help deciding on oversized drape or custom placement? Chat with our lead stylist directly on WhatsApp.
              </p>
              <button
                onClick={openWhatsAppConcierge}
                className="mt-2 text-xs font-heading font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group"
              >
                <span>Chat with Stylist</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Custom Studio Teaser inside Showroom */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-elevated via-brand-surface to-brand-dark border border-brand-border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest">
              CUSTOM BESPOKE ATELIER
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-light uppercase mt-1">
              WANT YOUR OWN GRAPHIC ON THE RACK?
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mt-2 leading-relaxed">
              Design a 1-of-1 240 GSM masterpiece with our custom 3D designer. Upload your artwork, adjust placement on front & back, and order on WhatsApp.
            </p>
          </div>
          <button
            onClick={() => {
              setActivePage('customize');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="relative z-10 px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white font-heading font-black text-xs uppercase tracking-wider shadow-glow-primary transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>LAUNCH 3D CUSTOMIZER</span>
          </button>
        </div>
      </section>

    </div>
  );
}
