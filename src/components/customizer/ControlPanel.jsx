import React, { useState } from 'react';
import { Upload, Type, Palette, Sliders, Sparkles, ShoppingBag, MessageSquare, HelpCircle, Check, Trash2, ArrowRight } from 'lucide-react';
import { PRESET_CUSTOM_GRAPHICS, BRAND_CONFIG } from '../../data/products';
import { useCart } from '../../context/CartContext';

export default function ControlPanel({
  tshirtColor,
  setTshirtColor,
  tshirtColors,
  size,
  setSize,
  fit,
  setFit,
  quantity,
  setQuantity,
  graphicImage,
  setGraphicImage,
  graphicScale,
  setGraphicScale,
  graphicRotation,
  setGraphicRotation,
  customText,
  setCustomText,
  textFont,
  setTextFont,
  textColor,
  setTextColor,
  textSize,
  setTextSize,
  printPlacement,
  setPrintPlacement,
  onOpenSizeGuide,
  onAddToCart,
  onDirectWhatsApp
}) {
  const [activeTab, setActiveTab] = useState('garment'); // 'garment' | 'graphic' | 'text'
  const [selectedPresetId, setSelectedPresetId] = useState(null);

  // File Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit. Please upload an optimized image.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setGraphicImage(uploadEvent.target.result);
        setSelectedPresetId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (preset) => {
    setGraphicImage(preset.svgUrl);
    setSelectedPresetId(preset.id);
  };

  const handleRemoveGraphic = () => {
    setGraphicImage(null);
    setSelectedPresetId(null);
  };

  // Base pricing logic
  const basePrice = 1199;
  const placementFee = printPlacement === 'both' ? 299 : 0;
  const unitPrice = basePrice + placementFee;
  const totalPrice = unitPrice * quantity;

  const fontOptions = [
    { id: 'display', name: 'Outfit Luxury', sample: 'RADNUZ' },
    { id: 'sans', name: 'Exo Bold', sample: 'CULTURE' },
    { id: 'script', name: 'Artisan Script', sample: 'Handcrafted' },
    { id: 'gothic', name: 'Gothic Black', sample: 'DISORDER' },
    { id: 'mono', name: 'Raw Monospace', sample: 'SYS_01' }
  ];

  const textColors = [
    { name: 'Pure White', hex: '#FFFFFF' },
    { name: 'Heritage Gold', hex: '#FFB703' },
    { name: 'Sunset Amber', hex: '#FA6800' },
    { name: 'Emerald Jewel', hex: '#299E60' },
    { name: 'Onyx Black', hex: '#0A0D1B' },
    { name: 'Silver Slate', hex: '#A0A0AA' }
  ];

  return (
    <div className="flex flex-col bg-brand-surface border border-brand-border rounded-3xl p-6 md:p-8 shadow-card-rich justify-between">
      {/* Studio Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-brand-secondary">
                Atelier 1-of-1 Studio
              </span>
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-brand-primary text-white rounded">
                PRO DTG
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-display font-black text-brand-light tracking-tight mt-1">
              CUSTOMIZE YOUR HEAVYWEIGHT TEE
            </h2>
          </div>
        </div>

        {/* Studio Tab Navigation */}
        <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-brand-dark rounded-2xl border border-brand-border my-6">
          <button
            onClick={() => setActiveTab('garment')}
            className={`flex items-center justify-center gap-1.5 py-2.5 text-xs font-heading font-bold rounded-xl transition-colors ${
              activeTab === 'garment'
                ? 'bg-brand-primary text-white shadow-glow-primary'
                : 'text-brand-muted hover:text-brand-light'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>GARMENT</span>
          </button>

          <button
            onClick={() => setActiveTab('graphic')}
            className={`flex items-center justify-center gap-1.5 py-2.5 text-xs font-heading font-bold rounded-xl transition-colors ${
              activeTab === 'graphic'
                ? 'bg-brand-primary text-white shadow-glow-primary'
                : 'text-brand-muted hover:text-brand-light'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>ARTWORK</span>
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className={`flex items-center justify-center gap-1.5 py-2.5 text-xs font-heading font-bold rounded-xl transition-colors ${
              activeTab === 'text'
                ? 'bg-brand-primary text-white shadow-glow-primary'
                : 'text-brand-muted hover:text-brand-light'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>CUSTOM TEXT</span>
          </button>
        </div>

        {/* Tab 1: Garment Specifications */}
        {activeTab === 'garment' && (
          <div className="space-y-5">
            {/* Color Swatches */}
            <div>
              <div className="flex items-center justify-between text-xs font-heading mb-2">
                <span className="text-brand-muted uppercase tracking-wider">Garment Color</span>
                <span className="text-brand-light font-bold">{tshirtColor.name}</span>
              </div>
              <div className="grid grid-cols-6 gap-2.5">
                {tshirtColors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setTshirtColor(c)}
                    title={c.name}
                    className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${
                      tshirtColor.name === c.name
                        ? 'border-brand-primaryLight scale-105 shadow-md ring-2 ring-brand-primary/30'
                        : 'border-brand-border/80 hover:border-white/40'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {tshirtColor.name === c.name && (
                      <Check className={`w-4 h-4 ${c.name === 'Vintage Chalk' ? 'text-black' : 'text-brand-secondary'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Fit Style */}
            <div>
              <span className="text-xs font-heading uppercase text-brand-muted tracking-wider block mb-2">
                Garment Silhouette
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFit('Boxy Oversized (240 GSM)')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    fit.includes('Boxy')
                      ? 'border-brand-primary bg-brand-primary/10'
                      : 'border-brand-border bg-brand-dark/50 hover:border-brand-muted'
                  }`}
                >
                  <div className="font-display font-bold text-xs text-brand-light">BOXY OVERSIZED</div>
                  <div className="text-[10px] font-mono text-brand-secondary mt-0.5">240 GSM // Drop-Shoulder</div>
                </button>

                <button
                  onClick={() => setFit('Standard Street Fit (220 GSM)')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    fit.includes('Standard')
                      ? 'border-brand-primary bg-brand-primary/10'
                      : 'border-brand-border bg-brand-dark/50 hover:border-brand-muted'
                  }`}
                >
                  <div className="font-display font-bold text-xs text-brand-light">STANDARD STREET</div>
                  <div className="text-[10px] font-mono text-brand-secondary mt-0.5">220 GSM // Classic drape</div>
                </button>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs font-heading mb-2">
                <span className="text-brand-muted uppercase tracking-wider">Select Size</span>
                <button
                  onClick={onOpenSizeGuide}
                  className="text-brand-secondary hover:underline flex items-center gap-1 font-semibold"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSize(sz)}
                    className={`py-2.5 text-xs font-mono font-bold rounded-xl border transition-all ${
                      size === sz
                        ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                        : 'bg-brand-elevated text-brand-light border-brand-border hover:border-brand-muted'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Print Placement */}
            <div>
              <span className="text-xs font-heading uppercase text-brand-muted tracking-wider block mb-2">
                Print Location
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'front', label: 'Front Chest', price: 'Included' },
                  { id: 'back', label: 'Back Spine', price: 'Included' },
                  { id: 'both', label: 'Front + Back', price: '+₹299' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPrintPlacement(p.id)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      printPlacement === p.id
                        ? 'border-brand-primary bg-brand-primary/10'
                        : 'border-brand-border bg-brand-dark/50 hover:border-brand-muted'
                    }`}
                  >
                    <div className="text-xs font-heading font-bold text-brand-light">{p.label}</div>
                    <div className="text-[10px] font-mono text-brand-secondary mt-0.5">{p.price}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Graphic & Image Upload */}
        {activeTab === 'graphic' && (
          <div className="space-y-5">
            {/* File Upload Box */}
            <div>
              <span className="text-xs font-heading uppercase text-brand-muted tracking-wider block mb-2">
                Upload High-Resolution Artwork
              </span>
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-brand-border hover:border-brand-primary rounded-2xl cursor-pointer bg-brand-dark/40 hover:bg-brand-dark transition-all group shadow-sm">
                <Upload className="w-8 h-8 text-brand-secondary group-hover:scale-110 mb-2 transition-transform" />
                <span className="text-xs font-bold text-brand-light font-heading">
                  {graphicImage ? "CHANGE UPLOADED FILE" : "CLICK TO BROWSE OR DRAG ARTWORK"}
                </span>
                <span className="text-[10px] font-mono text-brand-muted mt-1">
                  Supports PNG, JPG, WEBP, SVG (Max 10MB // 300+ DPI recommended)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {graphicImage && (
                <div className="flex items-center justify-between mt-2.5 px-3.5 py-2.5 bg-brand-elevated rounded-xl border border-brand-border text-xs font-mono">
                  <span className="text-brand-secondary flex items-center gap-1.5 font-bold">
                    <Check className="w-3.5 h-3.5" /> Artwork Loaded on Mockup
                  </span>
                  <button
                    onClick={handleRemoveGraphic}
                    className="text-brand-muted hover:text-brand-accent transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              )}
            </div>

            {/* Streetwear Graphic Presets */}
            <div>
              <span className="text-xs font-heading uppercase text-brand-muted tracking-wider block mb-2">
                Or Pick a Streetwear Graphic Preset
              </span>
              <div className="grid grid-cols-4 gap-2.5">
                {PRESET_CUSTOM_GRAPHICS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border transition-all ${
                      selectedPresetId === preset.id
                        ? 'border-brand-primary ring-2 ring-brand-primary/40 scale-105 shadow-md'
                        : 'border-brand-border hover:border-brand-muted'
                    }`}
                  >
                    <img
                      src={preset.svgUrl}
                      alt={preset.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                      <span className="text-[8px] font-heading font-semibold text-brand-light leading-tight truncate">
                        {preset.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Transform Sliders */}
            {graphicImage && (
              <div className="space-y-3 pt-2 border-t border-brand-border">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-brand-muted">
                    <span>Artwork Scale</span>
                    <span className="text-brand-light font-bold">{Math.round(graphicScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="1.8"
                    step="0.05"
                    value={graphicScale}
                    onChange={(e) => setGraphicScale(parseFloat(e.target.value))}
                    className="w-full accent-brand-primary cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-brand-muted">
                    <span>Rotation</span>
                    <span className="text-brand-light font-bold">{graphicRotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="5"
                    value={graphicRotation}
                    onChange={(e) => setGraphicRotation(parseInt(e.target.value))}
                    className="w-full accent-brand-primary cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Custom Slogan / Text Engine */}
        {activeTab === 'text' && (
          <div className="space-y-5">
            {/* Slogan Input */}
            <div>
              <span className="text-xs font-heading uppercase text-brand-muted tracking-wider block mb-2">
                Custom Text / Slogan
              </span>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g. CULTURE // 2026"
                maxLength={36}
                className="w-full bg-brand-dark border border-brand-border rounded-2xl px-4 py-3 text-sm text-brand-light placeholder-brand-muted focus:outline-none focus:border-brand-primary font-bold shadow-sm"
              />
              <span className="text-[10px] font-mono text-brand-muted mt-1 block text-right">
                {customText.length}/36 CHARACTERS
              </span>
            </div>

            {/* Font Style */}
            <div>
              <span className="text-xs font-heading uppercase text-brand-muted tracking-wider block mb-2">
                Font Family (Outfit / Exo / Artisan)
              </span>
              <div className="grid grid-cols-2 gap-2">
                {fontOptions.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setTextFont(font.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      textFont === font.id
                        ? 'border-brand-primary bg-brand-primary/10'
                        : 'border-brand-border bg-brand-dark/50 hover:border-brand-muted'
                    }`}
                  >
                    <div className="text-sm font-bold text-brand-light leading-none">{font.sample}</div>
                    <div className="text-[10px] font-heading font-medium text-brand-muted mt-1">{font.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Text Color Swatches */}
            <div>
              <div className="flex justify-between text-xs font-heading mb-2 text-brand-muted">
                <span>Text Pigment</span>
                <span className="text-brand-light font-semibold">{textColor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {textColors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setTextColor(c.hex)}
                    title={c.name}
                    className={`w-7 h-7 rounded-lg border-2 transition-all ${
                      textColor === c.hex
                        ? 'border-brand-primaryLight scale-110 shadow-sm ring-1 ring-brand-primary'
                        : 'border-white/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Text Size Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1 text-brand-muted">
                <span>Text Size</span>
                <span className="text-brand-light font-bold">{textSize}px</span>
              </div>
              <input
                type="range"
                min="14"
                max="36"
                step="1"
                value={textSize}
                onChange={(e) => setTextSize(parseInt(e.target.value))}
                className="w-full accent-brand-primary cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Pricing Summary & Action Buttons */}
      <div className="pt-6 mt-6 border-t border-brand-border space-y-4">
        {/* Quantity and Live Price Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-heading text-brand-muted uppercase font-semibold">Qty</span>
            <div className="flex items-center bg-brand-dark rounded-xl border border-brand-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-1.5 text-xs font-mono text-brand-muted hover:text-brand-light"
              >
                -
              </button>
              <span className="px-3 text-xs font-mono font-bold text-brand-light">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-1.5 text-xs font-mono text-brand-muted hover:text-brand-light"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-heading text-brand-muted uppercase block font-medium">
              Total ({quantity} Tee{quantity > 1 ? 's' : ''})
            </span>
            <span className="text-xl font-mono font-black text-brand-light">
              ₹{totalPrice}
            </span>
          </div>
        </div>

        {/* Dual Actions: Add to Bag & Direct WhatsApp Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={onAddToCart}
            className="flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white font-heading font-extrabold text-xs tracking-wider uppercase transition-all shadow-glow-primary"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ADD TO BAG</span>
          </button>

          <button
            onClick={onDirectWhatsApp}
            className="flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white font-heading font-extrabold text-xs tracking-wider uppercase transition-all shadow-glow-accent"
          >
            <MessageSquare className="w-4 h-4" />
            <span>ORDER ON WHATSAPP</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] font-heading text-brand-muted text-center">
          <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
          <span>Each piece is hand-pressed & inspected. Ships in 24-48 hours.</span>
        </div>
      </div>
    </div>
  );
}
