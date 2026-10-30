import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  RotateCw, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Check, 
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Eye,
  Flame,
  Layers
} from 'lucide-react';
import { PRODUCTS, BRAND_CONFIG } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { 
  playHangerSlideSound, 
  playHangerClinkSound, 
  playTagFlipSound,
  playLightSwitchSound,
  setSoundEnabled,
  getSoundEnabled 
} from '../../utils/soundEffects';
import StudioLightingRig, { STUDIO_LIGHT_PRESETS } from './StudioLightingRig';

export default function ShowroomRack({ 
  onNavigateProduct, 
  onShopClick, 
  onCustomClick, 
  isFullPage = false, 
  isHero = false 
}) {
  const { addToCart } = useCart();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewSide, setViewSide] = useState('front'); // 'front' | 'back'
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(getSoundEnabled());
  const [filterType, setFilterType] = useState('all'); // 'all' | 'halfhand' | 'polo'
  const [studioLightMode, setStudioLightMode] = useState('warm'); // 'warm' | 'daylight' | 'cyber' | 'noir'
  const [isAdded, setIsAdded] = useState(false);
  const [isSwinging, setIsSwinging] = useState(false);

  // Filter available products
  const availableProducts = PRODUCTS.filter(p => {
    if (filterType === 'polo') return p.apparelType === 'polo';
    if (filterType === 'halfhand') return p.apparelType === 'halfhand' || !p.apparelType;
    return true;
  });

  const currentProduct = availableProducts[selectedIndex] || availableProducts[0] || PRODUCTS[0];

  // Reset side and color when selected product changes
  useEffect(() => {
    setViewSide('front');
    setSelectedColorIndex(0);
    setIsAdded(false);
  }, [selectedIndex, filterType]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playHangerClinkSound();
  };

  const handleSelectProduct = (index) => {
    if (index === selectedIndex) return;
    playHangerSlideSound();
    playHangerClinkSound();
    setSelectedIndex(index);
    setIsSwinging(true);
    setTimeout(() => setIsSwinging(false), 800);
  };

  const handleNext = () => {
    const nextIdx = (selectedIndex + 1) % availableProducts.length;
    handleSelectProduct(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (selectedIndex - 1 + availableProducts.length) % availableProducts.length;
    handleSelectProduct(prevIdx);
  };

  const handleFlipView = () => {
    playTagFlipSound();
    setViewSide(prev => prev === 'front' ? 'back' : 'front');
  };

  // Determine which image to show based on product type & front/back selection
  const getProductImage = (prod, side) => {
    if (!prod) return '';
    const imgObj = prod.images;
    // For single combined showcase image (like TVK polo or NTK showcase)
    if (prod.images.primary === prod.images.secondary) {
      return prod.images.primary;
    }
    // For products with separate front and back
    if (side === 'front') {
      return imgObj.secondary || imgObj.primary;
    }
    return imgObj.primary || imgObj.secondary;
  };

  const activeImage = getProductImage(currentProduct, viewSide);
  const isDualSidedAsset = currentProduct?.images?.primary !== currentProduct?.images?.secondary;

  const handleAddToCart = () => {
    const color = currentProduct.colors?.[selectedColorIndex] || currentProduct.colors?.[0] || { name: 'Onyx Black', hex: '#141416' };
    addToCart(currentProduct, selectedSize, color, 1);
    setIsAdded(true);
    playHangerClinkSound();
    setTimeout(() => setIsAdded(false), 2200);
  };

  const handleWhatsAppOrder = () => {
    const colorName = currentProduct.colors?.[selectedColorIndex]?.name || 'Standard';
    const message = encodeURIComponent(
      `Hi RADNUZ STUDIO, I picked this from the Virtual Showroom:\n\n` +
      `🔥 Product: ${currentProduct.name}\n` +
      `👕 Size: ${selectedSize}\n` +
      `🎨 Color: ${colorName}\n` +
      `💰 Price: ₹${currentProduct.price}\n\n` +
      `Please confirm stock & dispatch timeline.`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${message}`, '_blank');
  };

  return (
    <div className={`relative w-full overflow-hidden select-none bg-gradient-to-b from-[#090C16] via-[#0E1326] to-[#0A0D1B] text-brand-light ${isFullPage ? 'py-12 min-h-screen' : isHero ? 'pt-8 pb-16 md:pt-10 md:pb-20' : 'py-16 md:py-24'}`}>
      
      {/* 1. Atelier Showroom Spotlights & Industrial Wall Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Overhead directional cone lights */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-to-b from-amber-400/15 via-emerald-500/10 to-transparent blur-3xl opacity-80" />
        <div className="absolute -top-20 left-1/4 w-[350px] h-[400px] bg-cyan-500/10 blur-3xl opacity-60" />
        <div className="absolute -top-20 right-1/4 w-[350px] h-[400px] bg-amber-500/10 blur-3xl opacity-60" />

        {/* Concrete boutique wall micro-texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Polished showroom floor reflection line */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/80 via-brand-surface/40 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: RADNUZ FLAGSHIP ATELIER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-brand-border/60 gap-4">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-heading font-bold text-brand-secondary tracking-widest uppercase mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
              <span>RADNUZ FLAGSHIP ATELIER • CHENNAI</span>
              <span className="px-2 py-0.5 rounded bg-brand-accent/20 border border-brand-accent/40 text-[10px] text-brand-accent font-mono font-bold">
                MENSWEAR SHOWROOM
              </span>
            </div>
            
            {isHero ? (
              <>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-brand-light uppercase tracking-tight leading-none">
                  WEAR YOUR <span className="text-outline hover:text-brand-primaryLight transition-colors">STORY.</span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-brand-muted mt-2 max-w-2xl leading-relaxed">
                  Welcome to our flagship menswear boutique. Slide along our suspended industrial rail, pull any hanger to inspect the 240 GSM drop drape in the fitting spotlight, and flip to explore front & back prints.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  {onShopClick && (
                    <button
                      onClick={onShopClick}
                      className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-heading font-extrabold tracking-wider uppercase transition-all shadow-glow-primary active:scale-95"
                    >
                      EXPLORE ALL RAILS
                    </button>
                  )}
                  {onCustomClick && (
                    <button
                      onClick={onCustomClick}
                      className="px-4 py-2 rounded-xl bg-brand-surface hover:bg-brand-elevated border border-brand-border text-brand-light text-xs font-heading font-extrabold tracking-wider uppercase transition-all active:scale-95"
                    >
                      CUSTOM 1-OF-1 BENCH
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-brand-light uppercase tracking-tight">
                  STEP INSIDE <span className="text-outline hover:text-brand-primaryLight transition-colors">THE SHOWROOM</span>
                </h2>
                <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-xl">
                  Slide along our heavy-duty industrial chrome rack. Pick any hanger to inspect the 240 GSM drop drape, flip front & back, and order direct.
                </p>
              </>
            )}
          </div>

          {/* Controls: Studio Light Desk, Audio Toggle & Category Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Interactive Studio Lighting Desk */}
            <div className="flex items-center gap-1 bg-brand-surface/90 border border-brand-border/80 rounded-xl p-1 shadow-md">
              <span className="hidden sm:inline-flex items-center gap-1 pl-2 pr-1 text-[10px] font-mono font-bold text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                LIGHTS:
              </span>
              {Object.values(STUDIO_LIGHT_PRESETS).map((p) => {
                const isActive = studioLightMode === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      playLightSwitchSound();
                      setStudioLightMode(p.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-heading font-extrabold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-950 shadow-md font-black scale-105'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                    title={p.name}
                  >
                    <span className={`w-2 h-2 rounded-full ${p.indicatorColor} shadow-sm`} />
                    <span className="tracking-wider">{p.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-heading font-bold transition-all ${
                soundOn
                  ? 'bg-brand-surface border-brand-secondary/40 text-brand-secondary shadow-[0_0_15px_rgba(115,181,138,0.2)]'
                  : 'bg-brand-dark/80 border-brand-border text-brand-muted hover:text-brand-light'
              }`}
              title={soundOn ? 'Sound FX Enabled' : 'Sound FX Muted'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundOn ? 'AUDIO ON' : 'MUTED'}</span>
            </button>

            {/* Category Filter Pills */}
            <div className="flex items-center bg-brand-surface/90 border border-brand-border/80 rounded-xl p-1 gap-1">
              {[
                { id: 'all', label: 'ALL DROPS' },
                { id: 'halfhand', label: 'HALF-HAND (5)' },
                { id: 'polo', label: 'POLO (1)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playHangerSlideSound();
                    setFilterType(tab.id);
                    setSelectedIndex(0);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-heading font-bold transition-all ${
                    filterType === tab.id
                      ? 'bg-brand-primary text-white shadow-glow-primary'
                      : 'text-brand-muted hover:text-brand-light'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. THE MAIN SHOWROOM STAGE */}
        <div className="relative rounded-3xl border border-brand-border/80 bg-gradient-to-b from-[#0F1428]/95 via-[#0A0D1B]/95 to-[#05070E] p-4 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Physical Studio Lighting Rig (Truss, Spotlights, Softboxes, Astera Tubes) */}
          <StudioLightingRig activePresetKey={studioLightMode} />
          
          {/* Overhead Industrial Ceiling Mounts & Chrome Track Rail */}
          <div className="relative w-full mb-8 pt-2">
            {/* Ceiling Down-rod Flanges */}
            <div className="flex justify-between max-w-4xl mx-auto px-8 relative z-20">
              <div className="flex flex-col items-center">
                <div className="w-8 h-2.5 rounded bg-zinc-600 border border-zinc-400 shadow-md" />
                <div className="w-2 h-7 bg-gradient-to-r from-zinc-700 via-zinc-300 to-zinc-800" />
                <div className="w-4 h-2 rounded-full bg-zinc-400" />
              </div>
              <div className="hidden sm:flex flex-col items-center">
                <div className="w-8 h-2.5 rounded bg-zinc-600 border border-zinc-400 shadow-md" />
                <div className="w-2 h-7 bg-gradient-to-r from-zinc-700 via-zinc-300 to-zinc-800" />
                <div className="w-4 h-2 rounded-full bg-zinc-400" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-2.5 rounded bg-zinc-600 border border-zinc-400 shadow-md" />
                <div className="w-2 h-7 bg-gradient-to-r from-zinc-700 via-zinc-300 to-zinc-800" />
                <div className="w-4 h-2 rounded-full bg-zinc-400" />
              </div>
            </div>

            {/* Industrial Brushed Chrome Rail Pipe */}
            <div className="relative w-full h-3 rounded-full bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-900 shadow-[0_6px_16px_rgba(0,0,0,0.9)] border-t border-white/60">
              {/* Highlight Gleam along top of pipe */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-white/80" />
              {/* Metal end caps */}
              <div className="absolute -left-1.5 -top-1 w-3 h-5 rounded-sm bg-gradient-to-r from-zinc-600 to-zinc-400 border border-zinc-300" />
              <div className="absolute -right-1.5 -top-1 w-3 h-5 rounded-sm bg-gradient-to-r from-zinc-400 to-zinc-600 border border-zinc-300" />
            </div>

            {/* Subtle shadow cast by pipe onto wall behind */}
            <div className="w-full h-3 bg-black/50 blur-sm -mt-0.5" />
          </div>

          {/* 3. CLOTHING RACK: Horizontal Carousel of Hangers */}
          <div className="relative w-full overflow-x-auto no-scrollbar py-2 mb-8">
            <div className="flex items-start justify-center gap-4 sm:gap-6 md:gap-8 min-w-max px-4">
              {availableProducts.map((prod, idx) => {
                const isSelected = idx === selectedIndex;
                const prodThumb = getProductImage(prod, 'front');

                return (
                  <motion.div
                    key={prod.id}
                    onClick={() => handleSelectProduct(idx)}
                    whileHover={{ y: -6, scale: 1.02 }}
                    animate={
                      isSelected
                        ? { y: -10, scale: 1.05 }
                        : { y: 0, scale: 1 }
                    }
                    className={`relative cursor-pointer flex flex-col items-center transition-all duration-300 ${
                      isSelected ? 'z-30 opacity-100' : 'z-10 opacity-75 hover:opacity-100'
                    }`}
                  >
                    {/* Hanger Hook (Curves over the pipe) */}
                    <div className="relative -mt-5 mb-0.5 flex flex-col items-center">
                      <svg width="28" height="34" viewBox="0 0 28 34" fill="none" className="filter drop-shadow-sm">
                        <path
                          d="M14 34 V18 C14 11 18 6 22 6 C26 6 27 10 27 12 C27 14 25 15 24 15 C23 15 22 13 22 11 C20 10 18 11 18 15 V18"
                          stroke="url(#chromeHookGrad)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="chromeHookGrad" x1="0" y1="0" x2="28" y2="34" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F5F5F5" />
                            <stop offset="0.5" stopColor="#B0B0B0" />
                            <stop offset="1" stopColor="#555555" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Triangular Laser-Etched Black Wooden Hanger Bar */}
                      <div className="relative w-28 sm:w-36 h-6 -mt-2 bg-gradient-to-b from-[#2A231F] via-[#1A1614] to-[#0D0B0A] rounded-t-full border border-amber-900/40 shadow-lg flex items-center justify-center">
                        <span className="text-[7px] sm:text-[8px] font-mono font-bold tracking-[0.2em] text-amber-200/80 uppercase">
                          RADNUZ
                        </span>
                        {/* Brass hardware rivet */}
                        <div className="absolute top-1 left-3 w-1 h-1 rounded-full bg-amber-400/80" />
                        <div className="absolute top-1 right-3 w-1 h-1 rounded-full bg-amber-400/80" />
                      </div>
                    </div>

                    {/* Miniature T-Shirt Card on Hanger */}
                    <div className={`relative w-28 sm:w-36 aspect-[4/5] rounded-2xl overflow-hidden p-2 flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-gradient-to-b from-brand-elevated via-brand-surface to-brand-dark border-2 border-emerald-400 shadow-[0_0_25px_rgba(41,158,96,0.35)]'
                        : 'bg-brand-surface/70 border border-brand-border/60 hover:border-brand-muted/40'
                    }`}>
                      <img
                        src={prodThumb}
                        alt={prod.name}
                        className="w-full h-full object-contain filter drop-shadow-md pointer-events-none"
                      />

                      {/* Hanging price tag badge attached to collar */}
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-md border border-amber-400/40 text-[9px] font-mono font-bold text-amber-300">
                        ₹{prod.price}
                      </div>

                      {/* Active indicator ring */}
                      {isSelected && (
                        <div className="absolute bottom-1.5 inset-x-2 text-center py-0.5 rounded-full bg-emerald-500/20 text-[9px] font-heading font-extrabold text-emerald-300 uppercase tracking-widest border border-emerald-400/40">
                          SELECTED
                        </div>
                      )}
                    </div>

                    {/* Product Name Beneath Hanger */}
                    <span className={`text-[10px] font-heading font-bold mt-2 text-center max-w-[120px] truncate ${
                      isSelected ? 'text-brand-light' : 'text-brand-muted'
                    }`}>
                      {prod.name.split('//')[0]}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 4. THE INSPECTION SPOTLIGHT: Lifted T-Shirt Close-up & Try-On Stage */}
          <div className="relative mt-4 pt-6 border-t border-brand-border/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Interactive Hanging T-Shirt with Swing & 3D Flip */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              
              {/* Spotlight overhead beam background */}
              <div className="relative w-full max-w-md aspect-[4/5] flex flex-col items-center justify-center p-4">
                
                {/* Dynamic Spotlight Glow reflecting active studio lighting */}
                <div 
                  className="absolute inset-0 pointer-events-none rounded-3xl opacity-35 blur-3xl transition-all duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 50% 25%, ${STUDIO_LIGHT_PRESETS[studioLightMode]?.glowHex || '#FFB703'} 0%, transparent 70%)`
                  }}
                />
                
                {/* Visual Hanger in Spotlight (Enlarged) */}
                <div className="relative z-20 flex flex-col items-center -mb-6">
                  {/* Chrome hook hooked onto imaginary rail */}
                  <svg width="40" height="48" viewBox="0 0 28 34" fill="none" className="filter drop-shadow-md">
                    <path
                      d="M14 34 V18 C14 11 18 6 22 6 C26 6 27 10 27 12 C27 14 25 15 24 15 C23 15 22 13 22 11 C20 10 18 11 18 15 V18"
                      stroke="url(#chromeHookGradLg)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="chromeHookGradLg" x1="0" y1="0" x2="28" y2="34" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFFFFF" />
                        <stop offset="0.4" stopColor="#C0C0C0" />
                        <stop offset="1" stopColor="#333333" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Luxury Wooden Hanger Bar */}
                  <div className="relative w-64 sm:w-80 h-9 -mt-3 bg-gradient-to-b from-[#2D241F] via-[#1B1613] to-[#0A0807] rounded-t-full border border-amber-600/40 shadow-xl flex items-center justify-center">
                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-amber-200/90 uppercase">
                      RADNUZ ATELIER // BOUTIQUE
                    </span>
                    <div className="absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div className="absolute top-2 right-6 w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                </div>

                {/* Animated Swinging T-Shirt Canvas */}
                <motion.div
                  key={`${currentProduct.id}-${viewSide}`}
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative z-10 w-full h-full max-h-[460px] flex items-center justify-center"
                >
                  <img
                    src={activeImage}
                    alt={`${currentProduct.name} - ${viewSide} view`}
                    className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
                  />

                  {/* Authentic Hanging Price Tag on Collar */}
                  <motion.div
                    initial={{ rotate: -8 }}
                    animate={{ rotate: [-6, -9, -6] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="absolute top-12 left-4 sm:left-8 z-30 flex flex-col items-center"
                  >
                    {/* Hanging String from Collar */}
                    <div className="w-[1.5px] h-8 bg-amber-200/60 shadow-sm" />
                    {/* Brass Eyelet */}
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-300 -mt-1 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-black" />
                    </div>
                    {/* Heavyweight Kraft Boutique Tag */}
                    <div className="w-24 bg-gradient-to-b from-[#181A22] to-[#0C0E14] border border-amber-500/50 rounded-lg p-2 shadow-2xl text-left -mt-0.5">
                      <div className="text-[7px] font-mono font-extrabold text-amber-400 tracking-wider uppercase">
                        RADNUZ TAG
                      </div>
                      <div className="text-[12px] font-display font-black text-white mt-0.5">
                        ₹{currentProduct.price}
                      </div>
                      <div className="text-[7px] font-mono text-zinc-400">
                        {currentProduct.gsm}
                      </div>
                      <div className="mt-1 pt-1 border-t border-zinc-700/80 flex items-center justify-between text-[6px] font-mono text-zinc-500">
                        <span>BARCODE</span>
                        <span className="tracking-widest">||| | ||</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Flip Front / Back Button */}
                {isDualSidedAsset && (
                  <button
                    onClick={handleFlipView}
                    className="absolute bottom-4 z-30 flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-surface/90 hover:bg-brand-elevated border border-brand-border text-xs font-heading font-bold text-brand-light shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 group"
                  >
                    <RotateCw className="w-4 h-4 text-brand-accent group-hover:rotate-180 transition-transform duration-500" />
                    <span>FLIP VIEW: {viewSide === 'front' ? 'SHOW BACKPRINT' : 'SHOW FRONT CHEST'}</span>
                  </button>
                )}
              </div>

              {/* Slider Pedals (Prev / Next) */}
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-brand-surface border border-brand-border hover:border-brand-light text-brand-light hover:bg-brand-elevated transition-all active:scale-95 shadow-md"
                  aria-label="Previous shirt on rack"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-semibold text-brand-muted">
                  RACK ITEM <span className="text-brand-light font-bold">{selectedIndex + 1}</span> OF {availableProducts.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-brand-surface border border-brand-border hover:border-brand-light text-brand-light hover:bg-brand-elevated transition-all active:scale-95 shadow-md"
                  aria-label="Next shirt on rack"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Spec Sheet, Sizing, and Quick Boutique Order Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
              <div>
                {/* Drop Badge & Rating */}
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-brand-accent/20 border border-brand-accent/40 text-[10px] font-mono font-bold text-brand-accent uppercase">
                    {currentProduct.badge || 'VIP DROP'}
                  </span>
                  <span className="text-xs font-mono text-brand-muted flex items-center gap-1">
                    <span className="text-amber-400 font-bold">★ 5.0</span> ({currentProduct.reviewsCount || 120} verified fit reviews)
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-light tracking-tight uppercase leading-snug">
                  {currentProduct.name}
                </h3>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-3xl sm:text-4xl font-display font-black text-white">
                    ₹{currentProduct.price}
                  </span>
                  {currentProduct.originalPrice && (
                    <span className="text-base font-mono text-zinc-500 line-through">
                      ₹{currentProduct.originalPrice}
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-400/40">
                    50% OFF VIP PRICE
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-brand-muted mt-3 leading-relaxed">
                  {currentProduct.description}
                </p>

                {/* Key Spec Callouts */}
                <div className="grid grid-cols-2 gap-2.5 mt-4">
                  <div className="p-2.5 rounded-xl bg-brand-surface/70 border border-brand-border/60">
                    <span className="block text-[10px] font-mono text-brand-muted uppercase">FABRIC DENSITY</span>
                    <span className="text-xs font-heading font-bold text-brand-chalk">{currentProduct.gsm} French Terry</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-brand-surface/70 border border-brand-border/60">
                    <span className="block text-[10px] font-mono text-brand-muted uppercase">STREETWEAR SILHOUETTE</span>
                    <span className="text-xs font-heading font-bold text-brand-chalk">{currentProduct.fit}</span>
                  </div>
                </div>

                {/* Color Swatches */}
                {currentProduct.colors && currentProduct.colors.length > 0 && (
                  <div className="mt-5">
                    <label className="block text-xs font-heading font-bold text-brand-muted uppercase tracking-wider mb-2">
                      COLORWAY // <span className="text-brand-light">{currentProduct.colors[selectedColorIndex]?.name}</span>
                    </label>
                    <div className="flex items-center gap-2.5">
                      {currentProduct.colors.map((color, idx) => (
                        <button
                          key={color.name}
                          onClick={() => {
                            playTagFlipSound();
                            setSelectedColorIndex(idx);
                          }}
                          className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                            selectedColorIndex === idx
                              ? 'border-brand-light scale-110 shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                              : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {selectedColorIndex === idx && (
                            <Check className={`w-3.5 h-3.5 ${color.hex === '#E8E8E4' ? 'text-black' : 'text-white'}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-heading font-bold text-brand-muted uppercase tracking-wider">
                      SELECT SIZE (STREETWEAR DRAPE)
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400">
                      Boxy Heavyweight Fit
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {currentProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => {
                          playTagFlipSound();
                          setSelectedSize(size);
                        }}
                        className={`py-2 rounded-xl text-xs font-heading font-bold transition-all ${
                          selectedSize === size
                            ? 'bg-brand-primary text-white border border-brand-primaryLight shadow-glow-primary scale-105'
                            : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-light hover:border-brand-borderLight'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Add to Bag & WhatsApp Direct Order */}
              <div className="pt-4 border-t border-brand-border/60 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Add to Bag Button */}
                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-3.5 px-4 rounded-xl font-heading font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                        : 'bg-brand-primary hover:bg-brand-primaryHover text-white shadow-glow-primary active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>ADDED TO BAG!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADD HANGER TO BAG</span>
                      </>
                    )}
                  </button>

                  {/* WhatsApp Quick Order */}
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-3.5 px-4 rounded-xl font-heading font-bold text-xs sm:text-sm uppercase tracking-wider bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>ORDER ON WHATSAPP</span>
                  </button>
                </div>

                {/* View Full Product Spec Link */}
                <button
                  onClick={() => onNavigateProduct && onNavigateProduct(currentProduct.id)}
                  className="w-full py-2.5 px-3 rounded-lg text-xs font-heading font-semibold text-brand-muted hover:text-brand-light hover:bg-brand-surface/60 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Full Product Dossier & Verified Reviews</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
