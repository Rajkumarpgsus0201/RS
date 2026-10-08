import React from 'react';

export default function Marquee() {
  const items = [
    "PRINT IT",
    "WEAR IT",
    "OWN IT",
    "REPEAT",
    "240 GSM HEAVYWEIGHT",
    "AUTHENTIC CULTURE",
    "HIGH-DEF DTG PIGMENT",
    "ZERO COMPROMISE",
    "LUXURY ATELIER"
  ];

  return (
    <div id="marquee" className="w-full bg-brand-dark py-4 border-y border-brand-border overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center mx-5 font-display font-black text-xl sm:text-2xl md:text-3xl text-brand-light/95 uppercase tracking-tight">
            <span>{item}</span>
            <span className="mx-6 text-brand-accent font-mono text-sm">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
