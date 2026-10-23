import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Share2, Copy, MessageSquare, Truck, ShieldCheck, RefreshCw, HelpCircle, ChevronDown, Star, Sparkles, Check, ArrowRight, Clock, Flame, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, BRAND_CONFIG, getProductShareUrl } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SizeGuideModal from '../components/common/SizeGuideModal';
import ProductCard from '../components/common/ProductCard';

export default function ProductDetailPage({ productId, onNavigateProduct, setActivePage }) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(product.images.primary);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleShareProduct = async (e) => {
    e?.stopPropagation?.();
    const url = getProductShareUrl(product);
    if (navigator.share && /mobile|android|iphone/i.test(navigator.userAgent || '')) {
      try {
        await navigator.share({
          title: `${product.name} | RADNUZ STUDIO`,
          text: `Check out ${product.name} on RADNUZ STUDIO!`,
          url
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      window.prompt('Copy product link:', url);
    }
  };
  const [activeAccordion, setActiveAccordion] = useState('fabric'); // 'fabric' | 'care' | 'shipping'

  // Update selectedImage and color when productId changes
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.images.primary);
      setSelectedColor(product.colors[0]);
    }
  }, [product.id]);

  const isWishlisted = isInWishlist(product.id);

  // Gallery image list (deduplicated unique views)
  const galleryImages = Array.from(new Set([
    product.images.primary,
    product.images.secondary,
    product.images.model,
    product.images.detail
  ].filter(Boolean)));

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity
    });
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `⚡ *RADNUZ STUDIO — DIRECT ORDER* ⚡\n\n` +
      `Product: *${product.name}*\n` +
      `Size: *${selectedSize}*\n` +
      `Color: *${selectedColor.name}*\n` +
      `Quantity: *${quantity}*\n` +
      `Price: *₹${product.price * quantity}*\n\n` +
      `Please verify availability and share payment link / QR.`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${text}`, '_blank');
  };

  const handleReserveWhatsApp = () => {
    const text = encodeURIComponent(
      `⚡ *RADNUZ STUDIO — IN-LOAD PRE-RESERVATION (BATCH 02)* ⚡\n\n` +
      `Product: *${product.name}*\n` +
      `Category: *${product.category}*\n` +
      `Weight/Fit: *${product.gsm} // ${product.fit}*\n` +
      `Selected Size: *${selectedSize}*\n` +
      `Color: *${selectedColor.name}*\n` +
      `Quantity: *${quantity}*\n` +
      `Estimated Total: *₹${product.price * quantity}*\n` +
      `Current Factory Stage: *${product.loadStatus || 'In Assembly Pipeline'}*\n` +
      `Expected Arrival ETA: *${product.eta || 'Drop 02'}*\n\n` +
      `Hey Radnuz team, please pre-reserve this piece for me! Notify me on WhatsApp as soon as this load lands.`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${text}`, '_blank');
  };

  // Related products from same category or featured
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.isFeatured)).slice(0, 3);

  return (
    <div className="py-8 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-heading font-semibold text-brand-muted mb-8 uppercase">
        <button onClick={() => setActivePage('home')} className="hover:text-brand-light">Home</button>
        <span>/</span>
        <button onClick={() => setActivePage('shop')} className="hover:text-brand-light">{product.category}</button>
        <span>/</span>
        <span className="text-brand-secondary font-bold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Grid: Gallery (Left) + Details (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Multi-Image Editorial Gallery (Span 7 cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnail Strip (Only show when there are multiple distinct images) */}
          {galleryImages.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0 md:w-20">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative aspect-[4/5] w-16 md:w-full rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === imgUrl
                      ? 'border-brand-primaryLight ring-2 ring-brand-primary/30'
                      : 'border-brand-border hover:border-brand-muted opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} angle ${idx + 1}`}
                    draggable="false"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Large Stage Image with Anti-Download Protection */}
          <div 
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            data-protected-image="true"
            className="relative flex-1 aspect-[4/5] rounded-3xl overflow-hidden bg-brand-surface border border-brand-border group shadow-card-rich select-none protected-container"
          >
            <img
              src={selectedImage}
              alt={product.name}
              draggable="false"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
              {product.badge && (
                <span className="px-3.5 py-1 text-xs font-heading font-bold uppercase rounded-lg bg-brand-dark/95 text-brand-secondary border border-brand-primary/40 backdrop-blur-md shadow-md">
                  {product.badge}
                </span>
              )}
              {galleryImages.length <= 1 && (
                <span className="px-3 py-1 text-[11px] font-heading font-bold uppercase rounded-lg bg-brand-primary text-white border border-brand-primaryLight/40 backdrop-blur-md shadow-glow-primary">
                  ⚡ COMPLETE FRONT & BACK VIEW
                </span>
              )}
              <span className="px-3 py-0.5 text-[10px] font-mono text-brand-chalk/90 bg-brand-dark/80 rounded-md backdrop-blur-sm border border-white/10">
                {product.gsm} // {product.fit}
              </span>
            </div>

            {/* Anti-Download Shield & Watermark Tag */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-none select-none px-2.5 py-1 rounded bg-brand-black/60 backdrop-blur-md text-[9px] font-mono text-white/50 border border-white/10 uppercase tracking-widest">
              🔒 RADNUZ ARCHIVE PROTECTED
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 z-20 p-3 rounded-full transition-all backdrop-blur-md ${
                isWishlisted
                  ? 'bg-brand-accent text-white scale-110 shadow-lg'
                  : 'bg-brand-dark/70 text-brand-muted hover:text-white hover:bg-brand-dark'
              }`}
              aria-label="Toggle Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            {/* Direct Share Button */}
            <button
              onClick={handleShareProduct}
              className="absolute top-16 right-4 z-20 p-3 rounded-full transition-all backdrop-blur-md bg-brand-dark/70 text-brand-muted hover:text-white hover:bg-brand-dark border border-white/10"
              aria-label="Share direct product link"
              title={`Share / Copy Link (radunz.shop/${product.slug})`}
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right: Sticky Product Information & Checkout Actions (Span 5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Header / Titles */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-heading text-brand-secondary uppercase tracking-wider font-bold">
                  {product.category} Capsule
                </span>
                <span className="text-brand-muted text-xs">•</span>
                <div className="flex items-center gap-1 text-xs font-heading text-brand-chalk">
                  <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                  <span>{product.rating} ({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-brand-light tracking-tight uppercase leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl sm:text-3xl font-mono font-black text-brand-light">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base font-mono text-brand-muted line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-heading font-bold bg-brand-accent/20 text-brand-accent rounded-lg border border-brand-accent/30">
                      SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-body">
              {product.description}
            </p>

            {/* Colorway Swatches */}
            <div className="pt-2 border-t border-brand-border">
              <div className="flex items-center justify-between text-xs font-heading mb-2.5">
                <span className="text-brand-muted uppercase tracking-wider">Garment Color</span>
                <span className="text-brand-light font-bold">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    title={c.name}
                    className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all ${
                      selectedColor.name === c.name
                        ? 'border-brand-primaryLight scale-110 shadow-lg ring-2 ring-brand-primary/30'
                        : 'border-brand-border hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {selectedColor.name === c.name && (
                      <Check className={`w-4 h-4 ${c.name === 'Vintage Chalk' ? 'text-black' : 'text-brand-secondary'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-heading mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-brand-muted uppercase tracking-wider font-semibold">Select Size</span>
                  {product.isUpcoming ? (
                    <span className="text-[10px] text-brand-secondary font-bold bg-brand-primary/20 px-2 py-0.5 rounded-md flex items-center gap-1 border border-brand-primary/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
                      <span>BATCH 02 LOAD // RESERVE NOW</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-brand-secondary font-bold bg-brand-primary/20 px-2 py-0.5 rounded-md">
                      Only 3 left in {selectedSize}!
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-brand-chalk hover:text-brand-secondary flex items-center gap-1 transition-colors font-semibold"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 text-xs font-mono font-bold rounded-xl border transition-all ${
                      selectedSize === sz
                        ? 'bg-brand-primary text-white border-brand-primary shadow-glow-primary'
                        : 'bg-brand-elevated text-brand-light border-brand-border hover:border-brand-muted'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Load Pipeline Tracker Box if product is upcoming */}
            {product.isUpcoming && (
              <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-brand-primary/40 shadow-glow-primary/10 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                    <span className="text-xs font-heading font-extrabold uppercase text-brand-secondary tracking-wider">
                      PRODUCTION LOAD STATUS
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-brand-chalk px-2.5 py-0.5 rounded-md bg-brand-dark/90 border border-brand-secondary/30">
                    DROP ETA: {product.eta || 'Drop 02'}
                  </span>
                </div>

                <div className="text-xs text-brand-muted">
                  Current Factory Stage: <span className="text-brand-light font-bold font-mono">{product.loadStatus}</span>
                </div>

                {/* 4-Stage Progress Visualizer */}
                <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                  <div className="p-2 rounded-xl bg-brand-elevated border border-emerald-500/30">
                    <div className="text-[10px] font-heading font-bold text-emerald-400">STAGE 01</div>
                    <div className="text-[9px] font-mono text-brand-muted mt-0.5">Yarn Knit ✓</div>
                  </div>
                  <div className="p-2 rounded-xl bg-brand-elevated border border-emerald-500/30">
                    <div className="text-[10px] font-heading font-bold text-emerald-400">STAGE 02</div>
                    <div className="text-[9px] font-mono text-brand-muted mt-0.5">Graphics ✓</div>
                  </div>
                  <div className="p-2 rounded-xl bg-brand-primary/20 border border-brand-primaryLight shadow-sm">
                    <div className="text-[10px] font-heading font-bold text-brand-secondary flex items-center justify-center gap-1">
                      <span>STAGE 03</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                    </div>
                    <div className="text-[9px] font-mono text-brand-light font-bold mt-0.5">In Load ⚡</div>
                  </div>
                  <div className="p-2 rounded-xl bg-brand-surface border border-brand-border/60 opacity-60">
                    <div className="text-[10px] font-heading font-bold text-brand-muted">STAGE 04</div>
                    <div className="text-[9px] font-mono text-brand-muted mt-0.5">Public Drop</div>
                  </div>
                </div>

                <p className="text-[11px] font-mono text-brand-chalk/80 leading-relaxed border-t border-brand-border/60 pt-2.5">
                  💡 <strong className="text-brand-light">₹0 Advance Required:</strong> Reserve your size now. The Radnuz concierge team will contact you on WhatsApp with high-res photos the moment stock touches down.
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-heading text-brand-muted uppercase tracking-wider font-semibold">Quantity</span>
              <div className="flex items-center bg-brand-elevated rounded-xl border border-brand-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-xs font-mono text-brand-muted hover:text-brand-light"
                >
                  -
                </button>
                <span className="px-3 text-xs font-mono font-bold text-brand-light">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-xs font-mono text-brand-muted hover:text-brand-light"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions: Add to Cart & Buy/Pre-Reserve via WhatsApp */}
            {product.isUpcoming ? (
              <div className="space-y-3 pt-4">
                <button
                  onClick={handleReserveWhatsApp}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white font-heading font-extrabold text-xs tracking-wider uppercase transition-all shadow-glow-accent group"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>PRE-RESERVE ON WHATSAPP (₹0 ADVANCE)</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white font-heading font-extrabold text-xs tracking-wider uppercase transition-all shadow-glow-primary"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-secondary" />
                  <span>ADD TO BAG FOR DROP ALERT (₹{product.price * quantity})</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white font-heading font-extrabold text-xs tracking-wider uppercase transition-all shadow-glow-primary group"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-accent" />
                  <span>ADD TO BAG — ₹{product.price * quantity}</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white font-heading font-extrabold text-xs tracking-wider uppercase transition-all shadow-glow-accent"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>DIRECT ORDER VIA WHATSAPP</span>
                </button>
              </div>
            )}

            {/* Direct Share Link Bar */}
            <div className="p-3.5 rounded-xl bg-brand-elevated border border-brand-border flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[11px] font-mono text-brand-muted uppercase tracking-wider shrink-0">Direct Link:</span>
                <span className="text-xs font-mono font-bold text-brand-secondary truncate">
                  radunz.shop/{product.slug}
                </span>
              </div>
              <button
                type="button"
                onClick={handleShareProduct}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-surface hover:bg-brand-primary/20 text-brand-light hover:text-white border border-brand-border text-xs font-heading font-bold uppercase tracking-wider transition-all"
                title="Copy direct share link"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-brand-secondary" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-heading font-semibold text-brand-muted">
              <div className="flex items-center gap-2 p-3 bg-brand-surface rounded-xl border border-brand-border">
                <Truck className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-brand-surface rounded-xl border border-brand-border">
                <ShieldCheck className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>60+ Wash Guarantee</span>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="border-t border-brand-border divide-y divide-brand-border pt-4">
              {/* Tab 1: Fabric & Fit */}
              <div className="py-3">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'fabric' ? null : 'fabric')}
                  className="w-full flex items-center justify-between text-xs font-heading font-bold text-brand-light uppercase"
                >
                  <span>FABRIC & SILHOUETTE SPECIFICATIONS</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'fabric' ? 'rotate-180 text-brand-secondary' : ''}`} />
                </button>
                {activeAccordion === 'fabric' && (
                  <div className="mt-2.5 text-xs text-brand-muted space-y-1.5 font-body">
                    <p>• Weight: 240 GSM Luxury French Terry</p>
                    <p>• Composition: 100% Combed Compact Cotton</p>
                    <p>• Silhouette: Drop-shoulder boxy drape with reinforced neck</p>
                    <p>• Treatment: Pre-shrunk & silicone softened</p>
                  </div>
                )}
              </div>

              {/* Tab 2: Print & Care */}
              <div className="py-3">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'care' ? null : 'care')}
                  className="w-full flex items-center justify-between text-xs font-heading font-bold text-brand-light uppercase"
                >
                  <span>PRINT & WASHING CARE</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'care' ? 'rotate-180 text-brand-secondary' : ''}`} />
                </button>
                {activeAccordion === 'care' && (
                  <div className="mt-2.5 text-xs text-brand-muted space-y-1.5 font-body">
                    <p>• Wash inside-out in cold water (30°C max)</p>
                    <p>• Do not tumble dry; hang dry in shade</p>
                    <p>• Do not iron directly on printed graphics</p>
                    <p>• Do not use chlorine bleach or abrasive detergents</p>
                  </div>
                )}
              </div>

              {/* Tab 3: Shipping & Returns */}
              <div className="py-3">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full flex items-center justify-between text-xs font-heading font-bold text-brand-light uppercase"
                >
                  <span>SHIPPING & RETURNS</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'shipping' ? 'rotate-180 text-brand-secondary' : ''}`} />
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="mt-2.5 text-xs text-brand-muted space-y-1.5 font-body">
                    <p>• Dispatches within 24–48 hours from Mumbai hub</p>
                    <p>• Standard delivery: 3–5 business days across India</p>
                    <p>• 7-day hassle-free replacement for sizing or defects</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Drops Section */}
      <div className="mt-24 pt-12 border-t border-brand-border">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-heading text-brand-secondary uppercase tracking-wider font-bold">Similar Drops</span>
            <h3 className="text-2xl font-display font-black text-brand-light uppercase mt-1">
              YOU MAY ALSO WEAR
            </h3>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="flex items-center gap-1.5 text-xs font-heading font-bold text-brand-secondary hover:text-white transition-colors"
          >
            <span>VIEW ALL ARCHIVE</span>
            <ArrowRight className="w-4 h-4 text-brand-accent" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {relatedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onNavigateProduct={onNavigateProduct}
            />
          ))}
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
