import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, Sliders, ShoppingBag, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

export default function CustomTeeTeaser({ onCustomClick }) {
  const steps = [
    {
      num: "01",
      title: "UPLOAD ARTWORK",
      desc: "Upload PNG, JPG, or pick from our archive. High-density 1200 DPI Kornit pigment rendering.",
      icon: <Upload className="w-5 h-5 text-brand-secondary" />
    },
    {
      num: "02",
      title: "LIVE CUSTOMIZE",
      desc: "Drag, scale, and rotate on the 3D tee canvas. Add slogans and choose front/back placement.",
      icon: <Sliders className="w-5 h-5 text-brand-secondary" />
    },
    {
      num: "03",
      title: "INSTANT DISPATCH",
      desc: "Order via WhatsApp or bag checkout. Hand-pressed on our 240 GSM heavy blank within 48 hours.",
      icon: <ShoppingBag className="w-5 h-5 text-brand-secondary" />
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-brand-primary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-brand-accent/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative bg-brand-surface/95 border border-brand-border rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-card-rich backdrop-blur-xl">
        {/* Subtle Corner Watermarks */}
        <div className="absolute top-6 left-8 font-heading text-xs text-brand-muted uppercase font-semibold hidden sm:block">
          STUDIO ATELIER // PROTOCOL 1-OF-1
        </div>
        <div className="absolute top-6 right-8 font-heading text-xs text-brand-secondary font-bold uppercase hidden sm:block">
          LIVE CANVAS READY
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Content & 3-Step Flow */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/15 border border-brand-primary/30 text-xs font-heading font-semibold text-brand-secondary uppercase mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                <span>Bespoke 1-of-1 Lab</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-brand-light uppercase tracking-tight leading-none">
                YOUR DESIGN. <br />
                <span className="text-brand-secondary">YOUR TEE.</span>
              </h2>
              <p className="text-sm sm:text-base text-brand-muted mt-4 max-w-xl leading-relaxed font-body">
                Break away from off-the-rack conformity. Design your bespoke graphic tee on our signature 240 GSM luxury French Terry blank with museum-grade digital pigment inks.
              </p>
            </div>

            {/* Steps Workflow */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {steps.map((s) => (
                <div key={s.num} className="p-5 rounded-2xl bg-brand-elevated/70 border border-brand-border hover:border-brand-primary/60 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-brand-accent">{s.num}</span>
                    <div className="p-2 rounded-xl bg-brand-surface border border-brand-border">
                      {s.icon}
                    </div>
                  </div>
                  <h4 className="text-xs font-heading font-extrabold text-brand-light uppercase tracking-wider">
                    {s.title}
                  </h4>
                  <p className="text-[11px] text-brand-muted mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onCustomClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white font-heading font-extrabold text-xs tracking-wider uppercase transition-all shadow-glow-primary group"
              >
                <Layers className="w-4 h-4" />
                <span>CREATE YOUR TEE NOW</span>
                <ArrowRight className="w-4 h-4 text-brand-accent group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Interactive 3D Mockup Teaser Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={onCustomClick}
              className="relative w-full max-w-sm aspect-[4/5] bg-brand-elevated/90 rounded-3xl border border-brand-border p-6 flex flex-col items-center justify-center cursor-pointer group shadow-2xl hover:border-brand-primary transition-all"
            >
              {/* Floating Print Zone Overlay Demo */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop"
                  alt="Custom Printed T-Shirt Mockup"
                  className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* Simulated Custom Slogan on Chest */}
                <div className="absolute top-[32%] px-3.5 py-2 bg-brand-dark/90 border border-dashed border-brand-secondary rounded-xl text-center backdrop-blur-sm shadow-xl group-hover:scale-110 transition-transform">
                  <span className="text-[10px] font-heading text-brand-secondary font-bold tracking-widest uppercase block">
                    [ YOUR ARTWORK HERE ]
                  </span>
                  <span className="text-[9px] font-mono text-brand-muted uppercase">
                    1200 DPI DTG PRINT
                  </span>
                </div>

                {/* Floating Specs */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between p-3 bg-brand-surface/98 rounded-xl border border-brand-border text-[11px] font-heading font-semibold backdrop-blur-md">
                  <span className="text-brand-light">240 GSM French Terry</span>
                  <span className="text-brand-accent font-bold">LAUNCH ATELIER →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
