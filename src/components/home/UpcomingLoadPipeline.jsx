import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MessageSquare, ArrowRight, Sparkles, CheckCircle2, Flame, ShieldAlert } from 'lucide-react';
import { PRODUCTS, BRAND_CONFIG } from '../../data/products';

export default function UpcomingLoadPipeline({ onNavigateProduct, onShopClick, onSelectCategory }) {
  const waitingCapsules = [
    {
      id: "radnuz-load-hoodie-380",
      name: "CUSTOM STREETWEAR HOODIE // 380 GSM",
      category: "Hoodies",
      gsm: "380 GSM",
      fit: "Oversized Fleece Fit",
      price: 1899,
      loadStatus: "Acid Wash & Stone-Tumble Curing",
      eta: "Drop 02 • Dropping Soon",
      description: "Ultra-thick 380 GSM French Terry cotton fleece with double-layered structured hood and kangaroo pocket. Zero dummy stock — reserve on WhatsApp."
    },
    {
      id: "radnuz-load-hoodie-420",
      name: "MONUMENTAL DISTRESSED HOODIE // 420 GSM",
      category: "Hoodies",
      gsm: "420 GSM",
      fit: "Monumental Heavy Fit",
      price: 2199,
      loadStatus: "Hand-Distressing & Hardware Assembly",
      eta: "Drop 02 • Dropping Soon",
      description: "Heavyweight 420 GSM acid-washed fleece hoodie. Custom stone wash distress pattern and thermal insulation."
    },
    {
      id: "radnuz-load-fullhand-260",
      name: "ARCHITECTURAL FULL-HAND TEE // 260 GSM",
      category: "Full-Hand T-Shirts",
      gsm: "260 GSM",
      fit: "Long-Sleeve Boxy Fit",
      price: 1199,
      loadStatus: "Ribbed Cuffs & Seam Assembly",
      eta: "Drop 02 • Dropping Soon",
      description: "Heavyweight 260 GSM full-hand long sleeve tee with non-deforming 2x2 ribbed cuffs and drop-shoulder drape."
    }
  ];

  const handleWhatsAppVIP = () => {
    const text = encodeURIComponent(
      `⚡ *RADNUZ STUDIO — VIP DROP 02 ACCESS REQUEST* ⚡\n\n` +
      `Hey Radnuz team, please add my number to the Batch 02 VIP Drop list.\n` +
      `I want early reservation access for the upcoming heavyweight Hoodies & Full-Hand tees currently in the load.\n\n` +
      `Please confirm my spot!`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${text}`, '_blank');
  };

  const handleQuickReserve = (item, e) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `⚡ *RADNUZ STUDIO — IN-LOAD PRE-RESERVE* ⚡\n\n` +
      `Product: *${item.name}*\n` +
      `Category: *${item.category}*\n` +
      `Weight/Fit: *${item.gsm} // ${item.fit}*\n` +
      `Expected Arrival: *${item.eta}*\n` +
      `Current Stage: *${item.loadStatus}*\n` +
      `Estimated Price: *₹${item.price}*\n\n` +
      `Please pre-reserve this piece for me. Message me on WhatsApp the moment this load lands!`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${text}`, '_blank');
  };

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/40 text-brand-secondary text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
            <span>FACTORY PIPELINE // BATCH 02 IN THE LOAD</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-brand-light tracking-tight uppercase">
            OTHERS IN THE LOAD <span className="text-brand-secondary">// DROPPING SOON</span>
          </h2>

          <p className="text-sm sm:text-base text-brand-muted max-w-2xl font-body">
            Heavyweight cotton knitting, custom acid washes & reflective streetwear graphics currently under manufacturing & transit. Reserve your size now before public sell-out.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleWhatsAppVIP}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-heading font-extrabold uppercase tracking-wider transition-all shadow-glow-accent"
          >
            <MessageSquare className="w-4 h-4" />
            <span>JOIN WHATSAPP VIP LIST</span>
          </button>
          <button
            onClick={() => onSelectCategory ? onSelectCategory('⚡ In The Load // Dropping Soon') : onShopClick()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-surface hover:bg-brand-elevated text-brand-light border border-brand-border text-xs font-heading font-bold uppercase transition-all"
          >
            <span>VIEW ALL PIPELINE ({upcomingProducts.length})</span>
            <ArrowRight className="w-4 h-4 text-brand-secondary" />
          </button>
        </div>
      </div>

      {/* Production Stage Milestone Tracker Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-brand-surface border border-brand-border mb-12 shadow-card-rich relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border/80">
            <div>
              <span className="text-[11px] font-mono text-brand-secondary uppercase tracking-widest font-bold">LIVE FACTORY TRACKING</span>
              <h3 className="text-lg sm:text-xl font-heading font-extrabold text-brand-light uppercase mt-0.5">
                Batch 02 Production Status: Assembly & Curing
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-elevated border border-brand-border text-xs font-mono text-brand-chalk">
              <Clock className="w-3.5 h-3.5 text-brand-secondary animate-pulse" />
              <span>Target Public Drop: October 18 - 25, 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-brand-elevated/80 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-heading font-bold text-emerald-400">STEP 01</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-sm font-heading font-bold text-brand-light uppercase">Fabric Spinning & Knitting</h4>
              <p className="text-xs text-brand-muted mt-1">240-420 GSM 100% French Terry combed loops spun and pre-shrunk.</p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-elevated/80 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-heading font-bold text-emerald-400">STEP 02</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-sm font-heading font-bold text-brand-light uppercase">Screen & Acid Wash</h4>
              <p className="text-xs text-brand-muted mt-1">Hand-distressed acid dip, 3M reflective ink & Japanese typography cured.</p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-primary/20 border-2 border-brand-primaryLight shadow-glow-primary/20 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-heading font-extrabold text-brand-secondary flex items-center gap-1.5">
                  <span>STEP 03 // CURRENT</span>
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                </span>
                <Flame className="w-4 h-4 text-brand-accent" />
              </div>
              <h4 className="text-sm font-heading font-extrabold text-brand-light uppercase">Curing, Hardware & Transit</h4>
              <p className="text-xs text-brand-chalk/90 mt-1">Double-stitched seams, heavy metal zippers & shipment load arriving.</p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-elevated/40 border border-brand-border/60 opacity-70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-heading font-bold text-brand-muted">STEP 04</span>
                <span className="text-[10px] font-mono text-brand-muted uppercase">DROPPING</span>
              </div>
              <h4 className="text-sm font-heading font-bold text-brand-light uppercase">Quality Check & Dispatch</h4>
              <p className="text-xs text-brand-muted mt-1">VIP pre-reservations fulfilled first, remainder released on web shop.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of In-Load Waiting Capsules (NO dummy stock photos) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {waitingCapsules.map((item) => (
          <div
            key={item.id}
            className="group relative bg-gradient-to-br from-brand-surface via-brand-dark to-brand-elevated rounded-3xl border-2 border-brand-primary/40 hover:border-brand-primaryLight transition-all duration-300 overflow-hidden flex flex-col justify-between p-6 sm:p-7 shadow-card-rich"
          >
            <div className="space-y-4">
              {/* Header tags */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-[10px] font-heading font-extrabold uppercase rounded-lg bg-brand-primary text-white shadow-glow-primary">
                  ⚡ IN THE LOAD
                </span>
                <span className="px-2.5 py-1 text-[10px] font-mono font-bold text-brand-secondary bg-brand-dark/90 rounded-md border border-brand-secondary/30">
                  {item.eta}
                </span>
              </div>

              {/* Stage Card */}
              <div className="p-3 rounded-xl bg-brand-dark/80 border border-white/10 font-mono text-xs">
                <div className="text-[10px] text-brand-muted uppercase">Factory Stage</div>
                <div className="text-brand-light font-bold flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  <span>{item.loadStatus}</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-heading font-bold text-brand-secondary uppercase tracking-wider">
                  {item.category} • {item.gsm}
                </div>
                <h3 className="text-lg sm:text-xl font-display font-black text-brand-light uppercase mt-1">
                  {item.name}
                </h3>
                <p className="text-xs text-brand-muted mt-2 font-body leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex items-baseline gap-2 pt-2 border-t border-brand-border/60">
                <span className="text-xl font-mono font-black text-brand-light">₹{item.price}</span>
                <span className="text-[10px] font-mono text-brand-secondary bg-brand-primary/20 px-2.5 py-0.5 rounded-md ml-auto font-bold">
                  ₹0 UPFRONT ADVANCE
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6">
              <button
                onClick={(e) => handleQuickReserve(item, e)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-xs font-heading font-extrabold uppercase tracking-wider transition-all shadow-glow-accent"
              >
                <MessageSquare className="w-4 h-4" />
                <span>PRE-RESERVE ON WHATSAPP</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
