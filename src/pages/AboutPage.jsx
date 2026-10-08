import React from 'react';
import { Sparkles, ShieldCheck, Zap, RefreshCw, ArrowRight, Layers } from 'lucide-react';
import { BRAND_CONFIG } from '../data/products';

export default function AboutPage({ setActivePage }) {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-20">
      {/* Manifesto Hero */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-elevated border border-brand-border text-xs font-mono font-semibold text-brand-volt uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Atelier Manifesto</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-brand-light uppercase tracking-tighter leading-none">
          WEAR YOUR IDENTITY. <br />
          <span className="text-outline hover:text-brand-volt transition-colors cursor-default">ZERO COMPROMISE.</span>
        </h1>

        <p className="text-base sm:text-lg font-heading text-brand-muted max-w-2xl mx-auto leading-relaxed">
          RADNUZ was founded on a simple observation: fast fashion made T-shirts disposable. Thin 160 GSM cotton, peeling plastic prints, sagging collars, and generic mall templates. We built RADNUZ to reject all of it.
        </p>
      </div>

      {/* Editorial Image & Craftsmanship Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-brand-surface border border-brand-border">
          <img
            src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop"
            alt="RADNUZ Craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs font-mono text-brand-volt uppercase tracking-wider">Engineering Focus</span>
            <h3 className="text-2xl font-display font-black text-brand-light uppercase mt-0.5">
              240 GSM HEAVYWEIGHT FRENCH TERRY
            </h3>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-brand-surface rounded-2xl border border-brand-border space-y-2">
            <span className="text-xs font-mono text-brand-volt uppercase font-bold">01 // Architectural Drape</span>
            <h4 className="text-lg font-display font-bold text-brand-light uppercase">The Boxy Drop-Shoulder Fit</h4>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Standard commercial tees drape clingingly over the body. Our 240 GSM combed cotton has structural integrity: it falls straight down from the dropped shoulder seam, creating that coveted Japanese brutalist box silhouette.
            </p>
          </div>

          <div className="p-6 bg-brand-surface rounded-2xl border border-brand-border space-y-2">
            <span className="text-xs font-mono text-brand-volt uppercase font-bold">02 // Digital Pigment Chemistry</span>
            <h4 className="text-lg font-display font-bold text-brand-light uppercase">Kornit Direct-to-Garment</h4>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Cheap promotional screen printing leaves a thick rubber patch that feels like a plasticky sweat trap. We utilize industrial 1200 DPI Kornit pigment printing where the ink fuses directly into the cotton threads. Breathable, vibrant, and soft to the touch.
            </p>
          </div>

          <div className="p-6 bg-brand-surface rounded-2xl border border-brand-border space-y-2">
            <span className="text-xs font-mono text-brand-volt uppercase font-bold">03 // The Anti-Roll Ribbed Collar</span>
            <h4 className="text-lg font-display font-bold text-brand-light uppercase">Engineered for 60+ Washes</h4>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              We hate collar baconing as much as you do. Our collar is reinforced with high-resilience elastane ribbing and double-needle chain stitching so it stays tight and sharp after dozens of washes.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table: Standard T-Shirts vs RADNUZ Heavyweight */}
      <div className="bg-brand-surface border border-brand-border rounded-3xl p-8 sm:p-12">
        <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-light uppercase mb-8 text-center">
          RADNUZ STANDARDS VS COMMERCIAL MALL TEES
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-brand-border text-brand-muted uppercase">
              <tr>
                <th className="py-4 px-4">Feature</th>
                <th className="py-4 px-4 text-brand-volt font-bold text-sm font-heading">RADNUZ™ STUDIO</th>
                <th className="py-4 px-4 text-brand-muted">Standard Mall T-Shirt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              <tr>
                <td className="py-4 px-4 font-bold text-brand-light">Fabric Weight</td>
                <td className="py-4 px-4 text-brand-volt font-bold">240 GSM Heavyweight</td>
                <td className="py-4 px-4 text-brand-muted">150 - 180 GSM Lightweight</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-brand-light">Cotton Grade</td>
                <td className="py-4 px-4 text-brand-light">100% Combed Long-Staple</td>
                <td className="py-4 px-4 text-brand-muted">Carded / Mixed Recycled Yarn</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-brand-light">Print Technology</td>
                <td className="py-4 px-4 text-brand-volt font-bold">12-Pass Kornit HD DTG</td>
                <td className="py-4 px-4 text-brand-muted">Cheap Plastisol / Heat Transfer Vinyl</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-brand-light">Shrinkage Control</td>
                <td className="py-4 px-4 text-brand-light">Pre-shrunk 0% alteration</td>
                <td className="py-4 px-4 text-brand-muted">Shrinks 5-8% after first hot wash</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-brand-light">Custom 1-of-1 Atelier</td>
                <td className="py-4 px-4 text-brand-volt font-bold">Yes, Interactive 3D Designer</td>
                <td className="py-4 px-4 text-brand-muted">Mass-produced identical inventory</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Call to Action */}
      <div className="text-center py-12 space-y-6">
        <h3 className="text-3xl sm:text-4xl font-display font-black text-brand-light uppercase">
          READY TO ELEVATE YOUR WARDROBE?
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setActivePage('shop')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-volt hover:bg-white text-brand-black font-heading font-black text-xs uppercase tracking-wider transition-all shadow-glow-volt"
          >
            EXPLORE THE ARCHIVE
          </button>
          <button
            onClick={() => setActivePage('customize')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-elevated hover:bg-brand-border border border-brand-border text-brand-light font-heading font-black text-xs uppercase tracking-wider transition-all"
          >
            CREATE 1-OF-1 CUSTOM TEE
          </button>
        </div>
      </div>
    </div>
  );
}
