import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, Send, ShieldCheck, RefreshCw, Zap, FileText, Lock, Truck, HelpCircle, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/products';
import { useCart } from '../../context/CartContext';

export default function Footer({ setActivePage, onOpenPolicyModal }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    setSubscribed(true);
    showToast("Subscribed! Use code RADNUZ10 for 10% off your first drop.", "success");
    setEmail('');
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent("Hi RADNUZ Studio! I have a query about WhatsApp ordering / custom sizing.");
    window.open(`https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${text}`, '_blank');
  };

  const handleOpenPolicy = (tab = 'whatsapp') => {
    if (typeof onOpenPolicyModal === 'function') {
      onOpenPolicyModal(tab);
    }
  };

  return (
    <footer className="w-full bg-brand-dark/95 border-t border-brand-border text-brand-muted pt-16 pb-12">
      {/* 1. Direct WhatsApp Ordering Spotlight Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-surface via-brand-dark to-brand-surface border border-brand-primary/40 p-6 sm:p-8 lg:p-10 shadow-card-rich">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/40 text-brand-secondary text-[11px] font-heading font-black tracking-widest uppercase">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>DIRECT WHATSAPP ORDERING ATELIER // ZERO MIDDLEMEN</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-brand-light uppercase tracking-tight">
                WE PROCESS EVERY ORDER PERSONALLY VIA WHATSAPP
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted max-w-2xl font-body leading-relaxed">
                No third-party checkout glitches, payment gateway fees, or automated chatbots. Browse your pieces, click checkout, and converse directly with our studio team on WhatsApp. Receive instant tax invoices, UPI QR verification, and real-time courier tracking.
              </p>

              {/* 3 Steps Mini Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="flex items-center gap-2.5 text-xs text-brand-light bg-brand-black/50 p-2.5 rounded-xl border border-brand-border/60">
                  <span className="w-5 h-5 rounded-full bg-brand-primary text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                  <span>Select Drop & Size</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-brand-light bg-brand-black/50 p-2.5 rounded-xl border border-brand-border/60">
                  <span className="w-5 h-5 rounded-full bg-brand-primary text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                  <span>WhatsApp Summary Sent</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-brand-light bg-brand-black/50 p-2.5 rounded-xl border border-brand-border/60">
                  <span className="w-5 h-5 rounded-full bg-brand-primary text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                  <span>UPI Pay & 24h Dispatch</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white text-xs font-heading font-black tracking-wider uppercase transition-all shadow-glow-primary group"
              >
                <MessageSquare className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
                <span>OPEN ATELIER CHAT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleOpenPolicy('whatsapp')}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-elevated hover:bg-brand-border text-brand-light border border-brand-border text-xs font-heading font-bold uppercase transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-brand-secondary" />
                <span>HOW WHATSAPP ORDERS WORK</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-12 border-b border-brand-border/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center shrink-0 text-brand-secondary">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-brand-light uppercase tracking-wider">
                240 GSM Heavyweight French Terry
              </h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed font-body">
                Engineered with 100% combed long-staple cotton for architectural drape, zero neck bacon, and lifetime durability.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center shrink-0 text-brand-secondary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-brand-light uppercase tracking-wider">
                Museum-Grade DTG Pigment
              </h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed font-body">
                Printed using Japanese Kornit industrial pigment ink. Breathable hand-feel with 60+ tested wash cycles with zero cracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center shrink-0 text-brand-secondary">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-brand-light uppercase tracking-wider">
                Custom 1-of-1 Atelier
              </h4>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed font-body">
                Upload your graphics, choose placements, and produce genuine bespoke fashion pieces delivered right to your door.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Columns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-brand-border/60">
          {/* Brand Manifesto Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/radnuz-logo.png"
                alt="RADNUZ"
                className="h-8 md:h-9 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]"
              />
            </div>

            <p className="text-sm text-brand-muted leading-relaxed max-w-sm font-body">
              An authentic culture streetwear atelier bridging subcultural graphics, bold typography, and heavy architectural silhouettes. Wear your story without compromise.
            </p>

            <div className="pt-2">
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-surface hover:bg-brand-elevated border border-brand-primary/40 text-brand-light text-xs font-heading font-bold transition-all group shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-brand-secondary group-hover:scale-110 transition-transform" />
                <span>WHATSAPP: +{BRAND_CONFIG.businessWhatsApp}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-brand-accent group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-widest text-brand-light">
              Exploration
            </h4>
            <ul className="space-y-2 text-xs font-medium font-body">
              <li>
                <button onClick={() => { setActivePage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-secondary transition-colors text-left">
                  Shop All Drops
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('customize'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-secondary transition-colors flex items-center gap-1.5 text-left">
                  <span>Custom Studio</span>
                  <span className="text-[9px] font-mono bg-brand-accent text-white px-1.5 rounded font-bold">1-OF-1</span>
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('checkout'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-secondary transition-colors text-left">
                  Order & Invoice
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-secondary transition-colors text-left">
                  Brand Manifesto
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-widest text-brand-light">
              Store & Policies
            </h4>
            <ul className="space-y-2.5 text-xs font-medium font-body">
              <li>
                <button
                  onClick={() => handleOpenPolicy('whatsapp')}
                  className="hover:text-brand-secondary transition-colors flex items-center gap-2 text-left"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                  <span>WhatsApp Order Process</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenPolicy('shipping')}
                  className="hover:text-brand-secondary transition-colors flex items-center gap-2 text-left"
                >
                  <Truck className="w-3.5 h-3.5 text-brand-muted shrink-0" />
                  <span>Shipping & Tracking Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenPolicy('refunds')}
                  className="hover:text-brand-secondary transition-colors flex items-center gap-2 text-left"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-brand-muted shrink-0" />
                  <span>5-Day Replacement Guarantee</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenPolicy('privacy')}
                  className="hover:text-brand-secondary transition-colors flex items-center gap-2 text-left"
                >
                  <Lock className="w-3.5 h-3.5 text-brand-muted shrink-0" />
                  <span>Privacy Policy (Zero Spam)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenPolicy('terms')}
                  className="hover:text-brand-secondary transition-colors flex items-center gap-2 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-brand-muted shrink-0" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Drop Alerts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-widest text-brand-light">
              Get Drop Priority
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed font-body">
              Subscribe for early access to limited 50-piece capsule drops and receive 10% off your first order.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center bg-brand-surface border border-brand-border rounded-xl overflow-hidden focus-within:border-brand-primary transition-colors shadow-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-3.5 py-2.5 text-xs text-brand-light placeholder-brand-muted focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-primary text-white hover:bg-brand-primaryLight transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-mono text-brand-secondary font-semibold">
                  Welcome to the syndicate. Voucher code: RADNUZ10
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Giant Brand Wordmark & Interactive Legal Links */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-heading font-medium text-brand-muted">
          <div>
            RADNUZ STUDIO © 2026 // ALL RIGHTS RESERVED
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => handleOpenPolicy('terms')}
              className="hover:text-brand-light transition-colors uppercase cursor-pointer"
            >
              TERMS & CONDITIONS
            </button>
            <span className="text-brand-border hidden sm:inline">•</span>
            <button
              onClick={() => handleOpenPolicy('privacy')}
              className="hover:text-brand-light transition-colors uppercase cursor-pointer"
            >
              PRIVACY POLICY
            </button>
            <span className="text-brand-border hidden sm:inline">•</span>
            <button
              onClick={() => handleOpenPolicy('shipping')}
              className="hover:text-brand-light transition-colors uppercase cursor-pointer"
            >
              SHIPPING POLICY
            </button>
            <span className="text-brand-border hidden sm:inline">•</span>
            <button
              onClick={() => handleOpenPolicy('refunds')}
              className="hover:text-brand-light transition-colors uppercase cursor-pointer"
            >
              RETURNS & EXCHANGES
            </button>
            <span className="text-brand-border hidden sm:inline">•</span>
            <button
              onClick={() => handleOpenPolicy('whatsapp')}
              className="text-brand-secondary hover:text-white transition-colors uppercase cursor-pointer font-bold"
            >
              WHATSAPP ORDER GUIDE
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
