import React, { useState } from 'react';
import MockupCanvas from '../components/customizer/MockupCanvas';
import ControlPanel from '../components/customizer/ControlPanel';
import SizeGuideModal from '../components/common/SizeGuideModal';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../data/products';
import { Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';

export default function CustomizerPage({ setActivePage }) {
  const { addToCart, showToast } = useCart();

  // Garment Colors
  const tshirtColors = [
    { name: "Onyx Black", hex: "#141416" },
    { name: "Vintage Chalk", hex: "#E8E8E4" },
    { name: "Washed Charcoal", hex: "#2A2B30" },
    { name: "Sage Olive", hex: "#42493E" },
    { name: "Desert Sand", hex: "#C4B59D" },
    { name: "Crimson Maroon", hex: "#4D131D" }
  ];

  const [tshirtColor, setTshirtColor] = useState(tshirtColors[0]);
  const [view, setView] = useState('front'); // 'front' | 'back'
  const [size, setSize] = useState('L');
  const [fit, setFit] = useState('Boxy Oversized (240 GSM)');
  const [quantity, setQuantity] = useState(1);
  const [printPlacement, setPrintPlacement] = useState('front'); // 'front' | 'back' | 'both'
  const [showGuides, setShowGuides] = useState(true);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Artwork Customization State
  const [graphicImage, setGraphicImage] = useState(null);
  const [graphicPos, setGraphicPos] = useState({ x: 0, y: 0 });
  const [graphicScale, setGraphicScale] = useState(1);
  const [graphicRotation, setGraphicRotation] = useState(0);

  // Custom Text State
  const [customText, setCustomText] = useState('');
  const [textFont, setTextFont] = useState('display');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [textSize, setTextSize] = useState(20);

  // Add to Cart
  const handleAddToCart = () => {
    if (!graphicImage && !customText.trim()) {
      showToast("Please upload artwork or add custom text first!", "error");
      return;
    }

    const basePrice = 1199;
    const placementFee = printPlacement === 'both' ? 299 : 0;
    const itemPrice = basePrice + placementFee;

    const customItem = {
      id: 'custom-tee-1of1',
      name: customText ? `1-OF-1 TEE // "${customText.slice(0, 16)}"` : '1-OF-1 ATELIER CUSTOM TEE',
      price: itemPrice,
      isCustom: true,
      selectedColor: tshirtColor,
      selectedSize: size,
      quantity,
      fit,
      printPlacement,
      customText: customText.trim(),
      textFont,
      textColor,
      customPreviewUrl: graphicImage || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      graphicSpecs: {
        pos: graphicPos,
        scale: graphicScale,
        rotation: graphicRotation
      }
    };

    addToCart(customItem);
  };

  // Direct WhatsApp Order
  const handleDirectWhatsApp = () => {
    if (!graphicImage && !customText.trim()) {
      showToast("Please upload artwork or add custom text first!", "error");
      return;
    }

    const basePrice = 1199;
    const placementFee = printPlacement === 'both' ? 299 : 0;
    const totalCustomPrice = (basePrice + placementFee) * quantity;

    const msg = encodeURIComponent(
      `⚡ *RADNUZ STUDIO — CUSTOM 1-OF-1 ORDER* ⚡\n\n` +
      `Product: *Custom Heavyweight Tee (240 GSM)*\n` +
      `Garment Color: *${tshirtColor.name}*\n` +
      `Silhouette: *${fit}*\n` +
      `Size: *${size}*\n` +
      `Quantity: *${quantity}*\n` +
      `Print Location: *${printPlacement.toUpperCase()}*\n` +
      (customText ? `Custom Slogan: *"${customText}"* (${textFont} font)\n` : '') +
      `Artwork Attached: *${graphicImage ? "YES (Will share original high-res file here in chat)" : "Text Only"}*\n` +
      `Total Estimated: *₹${totalCustomPrice}*\n\n` +
      `Please confirm order and provide payment link / UPI instructions.`
    );

    window.open(`https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${msg}`, '_blank');
  };

  return (
    <div className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Studio Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-brand-border gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-volt uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier 1-of-1 Laboratory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-light tracking-tight uppercase">
            CUSTOM PRINT <span className="text-outline hover:text-brand-volt transition-colors cursor-default">STUDIO</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-brand-muted">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-surface rounded-lg border border-brand-border">
            <ShieldCheck className="w-4 h-4 text-brand-volt" />
            <span>Kornit 1200 DPI Pigment</span>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-surface hover:bg-brand-elevated text-brand-light rounded-lg border border-brand-border transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-brand-chalk" />
            <span>Size Chart</span>
          </button>
        </div>
      </div>

      {/* Main Studio 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Interactive Canvas Mockup (Span 7 cols) */}
        <div className="lg:col-span-7 sticky top-24">
          <MockupCanvas
            tshirtColor={tshirtColor}
            view={view}
            setView={setView}
            graphicImage={graphicImage}
            graphicPos={graphicPos}
            setGraphicPos={setGraphicPos}
            graphicScale={graphicScale}
            setGraphicScale={setGraphicScale}
            graphicRotation={graphicRotation}
            setGraphicRotation={setGraphicRotation}
            customText={customText}
            textFont={textFont}
            textColor={textColor}
            textSize={textSize}
            showGuides={showGuides}
            setShowGuides={setShowGuides}
          />
          <div className="flex items-center justify-between text-[11px] font-mono text-brand-muted mt-3 px-2">
            <span>TIP: Click and drag artwork directly on the tee to reposition</span>
            <span className="text-brand-volt font-semibold">FRONT & BACK 3D TOGGLE</span>
          </div>
        </div>

        {/* Right: Customization Controls (Span 5 cols) */}
        <div className="lg:col-span-5">
          <ControlPanel
            tshirtColor={tshirtColor}
            setTshirtColor={setTshirtColor}
            tshirtColors={tshirtColors}
            size={size}
            setSize={setSize}
            fit={fit}
            setFit={setFit}
            quantity={quantity}
            setQuantity={setQuantity}
            graphicImage={graphicImage}
            setGraphicImage={setGraphicImage}
            graphicScale={graphicScale}
            setGraphicScale={setGraphicScale}
            graphicRotation={graphicRotation}
            setGraphicRotation={setGraphicRotation}
            customText={customText}
            setCustomText={setCustomText}
            textFont={textFont}
            setTextFont={setTextFont}
            textColor={textColor}
            setTextColor={setTextColor}
            textSize={textSize}
            setTextSize={setTextSize}
            printPlacement={printPlacement}
            setPrintPlacement={setPrintPlacement}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            onAddToCart={handleAddToCart}
            onDirectWhatsApp={handleDirectWhatsApp}
          />
        </div>
      </div>

      {/* Sizing Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
