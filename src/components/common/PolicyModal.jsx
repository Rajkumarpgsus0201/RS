import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, ShieldCheck, FileText, Truck, RefreshCw, ExternalLink, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/products';

export default function PolicyModal({ isOpen, onClose, initialTab = 'whatsapp' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  if (!isOpen) return null;

  const openWhatsApp = () => {
    const text = encodeURIComponent("Hi RADNUZ Studio! I have a question regarding WhatsApp orders / store policies.");
    window.open(`https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${text}`, '_blank');
  };

  const tabs = [
    { id: 'whatsapp', label: 'WhatsApp Order Guide', icon: MessageSquare, badge: 'KEY MODEL' },
    { id: 'privacy', label: 'Privacy Policy', icon: Lock },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
    { id: 'refunds', label: 'Replacements & Returns', icon: RefreshCw },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-brand-surface border border-brand-border rounded-3xl shadow-card-rich flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border bg-brand-dark/60 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-heading font-black uppercase tracking-widest text-brand-secondary bg-brand-primary/20 px-2 py-0.5 rounded border border-brand-primary/30">
                  RADNUZ LEGAL & OPERATIONAL POLICIES
                </span>
                <span className="text-[10px] font-mono text-brand-muted hidden sm:inline">v2026.1</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-black text-brand-light uppercase tracking-tight mt-1">
                TRANSPARENCY & POLICIES
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-brand-muted hover:text-brand-light hover:bg-brand-elevated rounded-xl transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-3 border-b border-brand-border bg-brand-surface overflow-x-auto no-scrollbar shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-heading font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-glow-primary'
                      : 'text-brand-muted hover:text-brand-light hover:bg-brand-dark'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-black ${
                      isActive ? 'bg-white/20 text-white' : 'bg-brand-accent/20 text-brand-accent'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="p-6 overflow-y-auto flex-1 font-body text-xs sm:text-sm text-brand-muted space-y-6 leading-relaxed">
            {/* TAB: WHATSAPP ORDER GUIDE */}
            {activeTab === 'whatsapp' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-primary/20 via-brand-dark to-brand-primary/10 border border-brand-primary/40 space-y-2">
                  <div className="flex items-center gap-2 text-brand-secondary font-heading font-black text-xs uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4 text-brand-secondary" />
                    <span>WHY RADNUZ OPERATES 100% VIA DIRECT WHATSAPP ORDERING</span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-light font-medium">
                    At RADNUZ STUDIO, we skip corporate middleman gateways and impersonal shopping bots. Every piece is an architectural garment or bespoke 1-of-1 print crafted with intention. Direct WhatsApp ordering guarantees human fit advisory, zero checkout bugs, instant invoice generation, and personalized concierge care.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-heading font-black text-brand-light uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                    How The Order Flow Works (3 Easy Steps)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-primary text-white font-mono font-bold flex items-center justify-center text-xs">
                        01
                      </div>
                      <h4 className="text-xs font-heading font-bold text-brand-light uppercase">
                        Select & Customize
                      </h4>
                      <p className="text-xs text-brand-muted">
                        Pick your preferred drop, size (S-XXL), and color, or upload your artwork in the Custom Studio.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-primary text-white font-mono font-bold flex items-center justify-center text-xs">
                        02
                      </div>
                      <h4 className="text-xs font-heading font-bold text-brand-light uppercase">
                        WhatsApp Dispatch
                      </h4>
                      <p className="text-xs text-brand-muted">
                        Hit "Place Order on WhatsApp". Your complete invoice, size specs, and delivery address are automatically compiled.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-primary text-white font-mono font-bold flex items-center justify-center text-xs">
                        03
                      </div>
                      <h4 className="text-xs font-heading font-bold text-brand-light uppercase">
                        UPI Pay & Dispatch
                      </h4>
                      <p className="text-xs text-brand-muted">
                        Our team verifies fabric availability, shares our verified UPI QR code, and dispatches your order with real-time tracking within 24-48h.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-heading font-black text-brand-light uppercase tracking-wider">
                    Frequently Asked Questions about WhatsApp Ordering
                  </h3>
                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-xl bg-brand-dark/70 border border-brand-border/70">
                      <span className="font-heading font-bold text-xs text-brand-light block mb-1">
                        Q: Is it safe to pay via WhatsApp?
                      </span>
                      <p className="text-xs text-brand-muted">
                        Yes, 100%. Payments are made directly to our verified RADNUZ Studio business bank / UPI accounts (Google Pay, PhonePe, Paytm, BHIM, Net Banking). No credit card details are ever stored on 3rd party servers.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-brand-dark/70 border border-brand-border/70">
                      <span className="font-heading font-bold text-xs text-brand-light block mb-1">
                        Q: Can I download an invoice for my order?
                      </span>
                      <p className="text-xs text-brand-muted">
                        Absolutely! On the Checkout page, right beside the WhatsApp button, click <strong>"Download Invoice"</strong> to instantly download or print an official tax invoice receipt with Order ID, customer details, and price breakdown.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-brand-dark/70 border border-brand-border/70">
                      <span className="font-heading font-bold text-xs text-brand-light block mb-1">
                        Q: Can I change my size or address after placing the order?
                      </span>
                      <p className="text-xs text-brand-muted">
                        Since you are directly connected with our team on WhatsApp, you can immediately text any corrections to your stylist before the garment is printed or packed!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PRIVACY POLICY */}
            {activeTab === 'privacy' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-brand-dark border border-brand-border">
                  <p className="text-xs text-brand-light font-medium">
                    At <strong>RADNUZ STUDIO</strong>, we respect your privacy. Because we operate through a direct WhatsApp model, we collect only the essential logistical information required to deliver your streetwear garments safely to your doorstep.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    1. Information We Collect
                  </h4>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-brand-muted">
                    <li><strong>Contact Details:</strong> Your full name, mobile number, and WhatsApp handle to communicate order status and delivery updates.</li>
                    <li><strong>Delivery Address:</strong> Complete postal address, city, and pin code required for our third-party express couriers (Delhivery, Bluedart, DTDC).</li>
                    <li><strong>Custom Studio Uploads:</strong> Digital artwork or images uploaded for bespoke 1-of-1 DTG printing. We do not use your personal uploaded designs for other customers or commercial drops.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    2. Absolute Zero Spam Guarantee
                  </h4>
                  <p className="text-xs text-brand-muted">
                    We will <strong>never sell, lease, or distribute</strong> your contact details to third-party telemarketers, data brokers, or promotional spam networks. Any WhatsApp message you receive from RADNUZ Studio will strictly relate to your active orders, size consultations, or drop priority alerts if you have specifically subscribed.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    3. WhatsApp End-to-End Encryption
                  </h4>
                  <p className="text-xs text-brand-muted">
                    All conversations, custom mockup exchanges, and delivery discussions between you and the official RADNUZ concierge are protected under WhatsApp's end-to-end encryption protocols.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    4. Data Deletion
                  </h4>
                  <p className="text-xs text-brand-muted">
                    You have full right to request deletion of your order records or phone number from our contact list anytime by simply messaging <strong>"DELETE MY DATA"</strong> to our official WhatsApp line.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: TERMS & CONDITIONS */}
            {activeTab === 'terms' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-brand-dark border border-brand-border">
                  <p className="text-xs text-brand-light font-medium">
                    By browsing RADNUZ STUDIO and submitting orders through our WhatsApp portal, you agree to these terms of service tailored to limited-run streetwear and custom apparel.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    1. Limited Capsule Drops & Inventory Reservation
                  </h4>
                  <p className="text-xs text-brand-muted">
                    Due to the artisanal production of our 240 GSM French Terry blanks and high-density Japanese screenprints, drops are released in strictly limited batches (typically 50-100 units). Generating an order reserves your piece for <strong>2 hours</strong> pending UPI payment receipt. If unpaid after this window, pieces return to active stock.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    2. Bespoke 1-of-1 Custom Orders
                  </h4>
                  <p className="text-xs text-brand-muted">
                    When ordering through our Custom Studio, you confirm that you hold necessary intellectual rights or authorization for artwork submitted. RADNUZ Studio reserves the right to decline graphics containing hate speech, illegal material, or explicit harassment.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    3. Garment Specifications & Care Guide
                  </h4>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-brand-muted">
                    <li>Fabric: 240 GSM 100% Combed Compact Cotton with Terry loop inner.</li>
                    <li>Sizing: Oversized boxy streetwear drape. Standard sizing tolerances allow for ±0.75 inches due to manual tailoring.</li>
                    <li>Wash Care: Machine wash cold (inside-out) on delicate cycle. Air dry flat. Do not iron directly over DTG or screenprinted graphics.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    4. Pricing & Tax Invoices
                  </h4>
                  <p className="text-xs text-brand-muted">
                    All prices quoted in Indian Rupees (INR ₹) are inclusive of all applicable taxes. Official tax invoices with unique Order IDs are generated immediately upon checkout and downloadable directly.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: SHIPPING & DELIVERY */}
            {activeTab === 'shipping' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-brand-dark border border-brand-border text-center">
                    <span className="text-[10px] font-mono text-brand-muted uppercase block">Dispatch Window</span>
                    <strong className="text-sm font-heading text-brand-light mt-1 block">24 - 48 Hours</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-brand-dark border border-brand-border text-center">
                    <span className="text-[10px] font-mono text-brand-muted uppercase block">Metro Delivery</span>
                    <strong className="text-sm font-heading text-brand-secondary mt-1 block">3 - 5 Days</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-brand-dark border border-brand-border text-center">
                    <span className="text-[10px] font-mono text-brand-muted uppercase block">Free Shipping</span>
                    <strong className="text-sm font-heading text-brand-accent mt-1 block">Orders &gt; ₹1,499</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    1. Shipping Partners & Packaging
                  </h4>
                  <p className="text-xs text-brand-muted">
                    Every RADNUZ package is shipped in our custom tamper-proof matte black atmospheric polybags with silica moisture guards. We partner with India's leading express logistics providers: <strong>Delhivery Express, Bluedart Air, and DTDC Priority</strong>.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    2. Real-Time Tracking Link on WhatsApp
                  </h4>
                  <p className="text-xs text-brand-muted">
                    As soon as your parcel leaves our Mumbai logistics hub, our automated system posts your live Air Waybill (AWB) number and direct tracking link directly into your existing WhatsApp chat thread.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    3. Delivery Fees
                  </h4>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-brand-muted">
                    <li>Orders above ₹1,499 enjoy <strong>100% FREE express shipping</strong> across all pin codes in India.</li>
                    <li>Standard flat fee of ₹99 is applicable for orders below ₹1,499.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB: REPLACEMENTS & RETURNS */}
            {activeTab === 'refunds' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-brand-dark border border-brand-border">
                  <p className="text-xs text-brand-light font-medium">
                    We stand 100% behind our fabric engineering and print craftsmanship. If something is not right with your order, our WhatsApp team resolves it swiftly.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    1. 100% Free Replacement for Defects / Transit Damage
                  </h4>
                  <p className="text-xs text-brand-muted">
                    If your tee arrives with any structural fabric defect, stitching flaw, or print imperfection, send a short photo or video to our WhatsApp concierge within <strong>5 days</strong> of delivery. We will immediately dispatch a fresh replacement at zero additional charge.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    2. Sizing Exchange Policy
                  </h4>
                  <p className="text-xs text-brand-muted">
                    Streetwear drape is personal. If you need a size exchange (e.g. from Large to XL):
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-brand-muted">
                    <li>Notify us on WhatsApp within <strong>5 calendar days</strong> of receiving the package.</li>
                    <li>Garment must remain unworn, unwashed, and with brand tags intact.</li>
                    <li>Reverse pickup will be scheduled by our logistics team.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-black text-brand-light uppercase tracking-wider">
                    3. Custom 1-of-1 Orders
                  </h4>
                  <p className="text-xs text-brand-muted">
                    Because bespoke 1-of-1 tees are made with individual customer artwork, they cannot be exchanged for sizing preferences once printed. However, if there is any print alignment or material defect, our full replacement warranty applies unconditionally.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer / WhatsApp Contact CTA */}
          <div className="p-4 sm:p-5 bg-brand-dark/80 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="text-center sm:text-left">
              <span className="text-[11px] font-heading font-bold text-brand-light block">
                Have specific questions about sizing or custom orders?
              </span>
              <span className="text-[10px] text-brand-muted font-body">
                Official Atelier WhatsApp Hotline: +{BRAND_CONFIG.businessWhatsApp}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={openWhatsApp}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white text-xs font-heading font-black uppercase transition-all shadow-glow-primary"
              >
                <MessageSquare className="w-3.5 h-3.5 text-brand-accent" />
                <span>CHAT WITH ATELIER</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-brand-elevated hover:bg-brand-border text-brand-light text-xs font-heading font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
