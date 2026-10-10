import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, ChevronDown } from 'lucide-react';

export default function Hero({ onShopClick, onCustomClick }) {
  return (
    <section className="relative min-h-[85vh] md:min-h-[92vh] w-full flex flex-col justify-between overflow-hidden pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Background Grid & Rich Ambient Glows */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-brand-primary/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-accent/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Center Stage: Huge Typography + 3D Layered Oversized Tee */}
      <div className="relative max-w-7xl mx-auto w-full flex-1 flex flex-col items-center justify-center my-auto z-10">
        {/* Giant Monolithic Background Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center select-none w-full"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/15 border border-brand-primary/30 text-xs font-heading font-semibold text-brand-secondary tracking-wider mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Heavyweight Streetwear Atelier</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter uppercase text-brand-light leading-none">
            WEAR YOUR <span className="text-outline hover:text-brand-primaryLight transition-colors cursor-default">STORY.</span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm md:text-base font-heading text-brand-muted max-w-xl mx-auto tracking-wide uppercase">
            Premium printed tees. Engineered for your identity.
          </p>
        </motion.div>

        {/* Centerpiece 3D/Physical Oversized T-Shirt Entrance Visual */}
        <div className="relative w-full max-w-lg md:max-w-xl my-4 sm:my-6 flex items-center justify-center">
          {/* Floating Aesthetic Chips */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -left-2 sm:left-4 top-1/4 z-20 hidden sm:flex items-center gap-2.5 px-3 py-2 bg-brand-surface/90 backdrop-blur-md rounded-xl border border-brand-border shadow-xl text-xs font-mono"
          >
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
            <div>
              <div className="text-brand-light font-bold">240 GSM</div>
              <div className="text-[9px] text-brand-muted">Drop-Shoulder Weave</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -right-2 sm:right-4 bottom-1/4 z-20 hidden sm:flex items-center gap-2.5 px-3 py-2 bg-brand-surface/90 backdrop-blur-md rounded-xl border border-brand-border shadow-xl text-xs font-mono"
          >
            <div className="w-2 h-2 rounded-full bg-brand-accent" />
            <div>
              <div className="text-brand-light font-bold">KORNIT HD DTG</div>
              <div className="text-[9px] text-brand-muted">Zero Cracking / 60+ Washes</div>
            </div>
          </motion.div>

          {/* Physically Entering Product Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ scale: 1.03, rotate: -1 }}
            className="relative w-full aspect-square max-w-[360px] sm:max-w-[440px] flex items-center justify-center cursor-pointer group"
            onClick={onCustomClick}
          >
            {/* Ambient Radial Backlight */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-primary/25 via-transparent to-brand-accent/25 blur-2xl group-hover:scale-110 transition-transform duration-500" />

            {/* Oversized Streetwear Tee Image */}
            <img
              src="https://res.cloudinary.com/dapilmiei/image/upload/v1791632970/aj-back_pblqgr.png"
              alt="RADNUZ Ajith Still 240 GSM Streetwear Oversized Tee"
              className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] z-10 transition-transform duration-500 group-hover:-translate-y-2"
            />

            {/* Interactive "DROP 01 LIVE" badge floating on tee */}
            <div className="absolute z-20 bottom-8 px-4 py-2 rounded-full bg-brand-surface/90 border border-brand-primary text-brand-secondary text-xs font-heading font-bold tracking-wider backdrop-blur-md shadow-2xl flex items-center gap-2 group-hover:bg-brand-primary group-hover:text-white transition-all">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
              <span>AJITH STILL // 240 GSM DROP 01 LIVE</span>
            </div>
          </motion.div>
        </div>

        {/* Direct Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mt-2"
        >
          <button
            onClick={onShopClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white font-heading font-extrabold text-xs tracking-wider uppercase transition-all shadow-glow-primary group"
          >
            <span>SHOP COLLECTION</span>
            <ArrowRight className="w-4 h-4 text-brand-accent group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onCustomClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-brand-surface hover:bg-brand-elevated border border-brand-border text-brand-light font-heading font-extrabold text-xs tracking-wider uppercase transition-all"
          >
            <Layers className="w-4 h-4 text-brand-secondary" />
            <span>CREATE YOUR TEE</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator & Manifesto Subtext */}
      <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full pt-8 border-t border-brand-border/40 text-xs font-mono text-brand-muted">
        <div className="flex items-center gap-2 text-brand-chalk">
          <span className="w-2 h-2 rounded-full bg-brand-primary" />
          <span>PRINT IT. WEAR IT. OWN IT.</span>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('marquee');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hidden sm:flex items-center gap-1 hover:text-brand-light transition-colors"
        >
          <span>EXPLORE DROP</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-brand-secondary" />
        </button>

        <div className="text-right">
          <span>WORLDWIDE EXPRESS DISPATCH</span>
        </div>
      </div>
    </section>
  );
}
