import React, { useState } from 'react';
import MockupCanvas from '../components/customizer/MockupCanvas';
import ControlPanel from '../components/customizer/ControlPanel';
import SizeGuideModal from '../components/common/SizeGuideModal';
import MockupShareModal from '../components/customizer/MockupShareModal';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../data/products';
import { generateMockupImage, downloadMockupFile, copyMockupToClipboard } from '../utils/mockupGenerator';
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

  // Apparel Type: 'halfhand' | 'fullhand' | 'hoodie'
  const [apparelType, setApparelType] = useState('halfhand');
  const [tshirtColor, setTshirtColor] = useState(tshirtColors[0]);
  const [view, setView] = useState('front'); // 'front' | 'back'
  const [size, setSize] = useState('L');
  const [fit, setFit] = useState('Half-Hand Boxy (240 GSM)');
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

  // Mockup Share Modal State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [generatedMockupDataUrl, setGeneratedMockupDataUrl] = useState(null);
  const [generatedMockupBlob, setGeneratedMockupBlob] = useState(null);
  const [shareOrderMessage, setShareOrderMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Dynamic Base Price
  const getBasePrice = () => {
    if (apparelType === 'hoodie') return 1899;
    if (apparelType === 'fullhand') return 1199;
    return 999;
  };

  const getApparelName = () => {
    if (apparelType === 'hoodie') return '1-OF-1 CUSTOM HOODIE // 380 GSM';
    if (apparelType === 'fullhand') return '1-OF-1 CUSTOM FULL-HAND TEE // 260 GSM';
    return '1-OF-1 CUSTOM HALF-HAND TEE // 240 GSM';
  };

  // Add to Cart
  const handleAddToCart = async () => {
    if (!graphicImage && !customText.trim()) {
      showToast("Please upload artwork or add custom text first!", "error");
      return;
    }

    const basePrice = getBasePrice();
    const placementFee = printPlacement === 'both' ? 299 : 0;
    const itemPrice = basePrice + placementFee;
    const defaultName = getApparelName();

    showToast("Generating composite mockup...", "info");

    // Generate accurate mockup picture preview
    let previewUrl = graphicImage || "https://res.cloudinary.com/dapilmiei/image/upload/v1791632970/aj-back_pblqgr.png";
    try {
      const { dataUrl } = await generateMockupImage({
        apparelType,
        tshirtColor,
        view,
        graphicImage,
        graphicPos,
        graphicScale,
        graphicRotation,
        customText,
        textFont,
        textColor,
        textSize
      });
      previewUrl = dataUrl;
    } catch (e) {
      console.warn("Mockup generation fallback:", e);
    }

    const customItem = {
      id: `custom-${apparelType}-1of1-${Date.now()}`,
      name: customText ? `${defaultName} // "${customText.slice(0, 16)}"` : defaultName,
      price: itemPrice,
      isCustom: true,
      apparelType,
      selectedColor: tshirtColor,
      selectedSize: size,
      quantity,
      fit,
      printPlacement,
      customText: customText.trim(),
      textFont,
      textColor,
      customPreviewUrl: previewUrl,
      graphicSpecs: {
        pos: graphicPos,
        scale: graphicScale,
        rotation: graphicRotation
      }
    };

    addToCart(customItem);
    showToast("Added custom design to your bag!", "success");
  };

  // Direct WhatsApp Order: Generate Mockup Image, Auto-Download & Open Share Guide
  const handleDirectWhatsApp = async () => {
    if (!graphicImage && !customText.trim()) {
      showToast("Please upload artwork or add custom text first!", "error");
      return;
    }

    setIsGenerating(true);
    showToast("Rendering your custom design picture...", "info");

    try {
      const basePrice = getBasePrice();
      const placementFee = printPlacement === 'both' ? 299 : 0;
      const totalCustomPrice = (basePrice + placementFee) * quantity;
      const apparelTitle = getApparelName();

      // 1. Generate High-Res Mockup Image
      const { blob, dataUrl } = await generateMockupImage({
        apparelType,
        tshirtColor,
        view,
        graphicImage,
        graphicPos,
        graphicScale,
        graphicRotation,
        customText,
        textFont,
        textColor,
        textSize
      });

      setGeneratedMockupDataUrl(dataUrl);
      setGeneratedMockupBlob(blob);

      // 2. Auto-Download the picture to customer's phone/PC
      const safeFilename = `RADNUZ-Custom-${apparelType.toUpperCase()}-Design.png`;
      downloadMockupFile(blob, safeFilename);

      // 3. Auto-Copy image to clipboard for instant pasting
      copyMockupToClipboard(blob);

      // 4. Build Formatted WhatsApp Order Text
      const rawMsg = 
`⚡ *RADNUZ STUDIO — CUSTOM 1-OF-1 ORDER* ⚡

Product: *${apparelTitle}*
Garment Color: *${tshirtColor.name}*
Silhouette: *${fit}*
Size: *${size}*
Quantity: *${quantity}*
Print Location: *${printPlacement.toUpperCase()}*
${customText ? `Custom Slogan: *"${customText}"* (${textFont} font)\n` : ''}📸 *Design Mockup Picture: Downloaded to device & attaching in this chat!*
Total Estimated: *₹${totalCustomPrice}*

Please check the customized mockup picture attached in this chat and share payment QR!`;

      setShareOrderMessage(rawMsg);
      setIsShareModalOpen(true);
      showToast("Custom design picture saved to your device!", "success");
    } catch (err) {
      console.error("Failed to generate mockup:", err);
      showToast("Could not generate mockup image. Opening WhatsApp chat...", "error");
      const fallbackUrl = `https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${encodeURIComponent("Hi RADNUZ, I want to place a custom 1-of-1 order.")}`;
      window.open(fallbackUrl, '_blank');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Studio Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-brand-border gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-secondary uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>Atelier 1-of-1 Laboratory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-light tracking-tight uppercase">
            CUSTOM PRINT <span className="text-outline hover:text-brand-primaryLight transition-colors cursor-default">STUDIO</span>
          </h1>
          <p className="text-xs text-brand-muted font-body mt-1">
            Choose between 240 GSM Half-Hand Tees, 260 GSM Full-Hand Tees, or 380 GSM Heavyweight Hoodies.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-brand-muted">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-surface rounded-lg border border-brand-border">
            <ShieldCheck className="w-4 h-4 text-brand-secondary" />
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
            apparelType={apparelType}
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
            <span>TIP: Click and drag artwork directly on the garment to reposition</span>
            <span className="text-brand-secondary font-semibold">FRONT & BACK 3D TOGGLE</span>
          </div>
        </div>

        {/* Right: Customization Controls (Span 5 cols) */}
        <div className="lg:col-span-5">
          <ControlPanel
            tshirtColor={tshirtColor}
            setTshirtColor={setTshirtColor}
            tshirtColors={tshirtColors}
            apparelType={apparelType}
            setApparelType={setApparelType}
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

      {/* Mockup Share Modal with Auto-Downloaded Picture & WhatsApp Guide */}
      <MockupShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        mockupDataUrl={generatedMockupDataUrl}
        mockupBlob={generatedMockupBlob}
        orderMessage={shareOrderMessage}
        apparelTitle={getApparelName()}
        price={getBasePrice() + (printPlacement === 'both' ? 299 : 0)}
      />
    </div>
  );
}
