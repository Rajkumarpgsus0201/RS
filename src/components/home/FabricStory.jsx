import React from 'react';
import { Layers, ShieldCheck, Droplets, Zap, CheckCircle2 } from 'lucide-react';

export default function FabricStory() {
  const specs = [
    {
      title: "240 GSM HEAVYWEIGHT",
      value: "100% Combed French Terry",
      desc: "Architectural drop-shoulder drape that preserves its silhouette throughout the day rather than clinging."
    },
    {
      title: "KORNIT DIGITAL DTG",
      value: "12-Pass Pigment Ink",
      desc: "Water-based biodegradable pigment inks that bond directly to cotton fibers for zero heavy rubber feel."
    },
    {
      title: "DOUBLE-RIBBED COLLAR",
      value: "Lycra Reinforced",
      desc: "Engineered collar construction that stays crisp and prevents rolling or baconing across 60+ wash cycles."
    },
    {
      title: "PRE-SHRUNK DRAPE",
      value: "0% Post-Wash Shrinkage",
      desc: "Bio-washed and pre-laundered at high temperature to eliminate unexpected post-purchase size changes."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="bg-brand-surface border border-brand-border rounded-3xl p-8 sm:p-12 overflow-hidden relative shadow-card-rich">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-brand-border">
          <div>
            <span className="text-xs font-heading font-semibold uppercase tracking-widest text-brand-secondary">
              Material Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-light tracking-tight uppercase mt-1">
              THE 240 GSM <span className="text-outline hover:text-brand-primaryLight transition-colors cursor-default">STANDARD</span>
            </h2>
          </div>
          <p className="text-xs font-heading text-brand-muted uppercase max-w-xs">
            We rejected paper-thin mall blanks. Every piece is engineered like armour.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-brand-elevated/80 border border-brand-border hover:border-brand-primary/60 transition-all group shadow-sm"
            >
              <span className="text-[10px] font-mono text-brand-accent uppercase font-bold tracking-wider block mb-1.5">
                SPEC 0{i + 1}
              </span>
              <h4 className="text-base font-display font-black text-brand-light uppercase group-hover:text-brand-secondary transition-colors">
                {item.title}
              </h4>
              <div className="text-xs font-heading text-brand-secondary font-semibold mt-1">
                {item.value}
              </div>
              <p className="text-xs text-brand-muted mt-2.5 leading-relaxed font-body">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
