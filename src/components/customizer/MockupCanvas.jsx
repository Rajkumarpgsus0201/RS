import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Move, ZoomIn, Eye, EyeOff, Layers, RefreshCcw } from 'lucide-react';

export default function MockupCanvas({
  tshirtColor,
  apparelType = 'halfhand', // 'halfhand' | 'fullhand' | 'hoodie'
  view, // 'front' | 'back'
  setView,
  graphicImage,
  graphicPos,
  setGraphicPos,
  graphicScale,
  setGraphicScale,
  graphicRotation,
  setGraphicRotation,
  customText,
  textFont,
  textColor,
  textSize,
  showGuides,
  setShowGuides
}) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle Dragging Graphic
  const handleMouseDown = (e) => {
    if (!graphicImage && !customText) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - graphicPos.x,
      y: e.clientY - graphicPos.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setGraphicPos({
      x: Math.max(-100, Math.min(100, e.clientX - dragStart.x)),
      y: Math.max(-100, Math.min(100, e.clientY - dragStart.y))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Font class mapping
  const fontClasses = {
    'display': 'font-display font-black uppercase tracking-tight',
    'gothic': 'font-serif font-black tracking-wider uppercase',
    'sans': 'font-heading font-bold uppercase tracking-wide',
    'script': 'font-script font-bold tracking-normal',
    'mono': 'font-mono font-medium tracking-tight'
  };

  const apparelLabels = {
    halfhand: '240 GSM HALF-HAND TEE',
    fullhand: '260 GSM FULL-HAND TEE',
    hoodie: '380 GSM STREETWEAR HOODIE'
  };

  return (
    <div className="relative w-full h-[450px] sm:h-[540px] md:h-[600px] bg-brand-surface/90 rounded-3xl border border-brand-border flex flex-col items-center justify-center p-4 overflow-hidden select-none shadow-card-rich">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-30" />
      <div className="absolute top-5 left-5 flex items-center gap-2 font-heading text-[11px] text-brand-secondary font-semibold uppercase tracking-wider">
        <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
        <span>CANVAS LIVE // {apparelLabels[apparelType] || '1200 DPI DTG ATELIER'}</span>
      </div>

      {/* Top Controls (View Switcher & Guide Toggle) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-brand-dark/95 backdrop-blur-md p-1.5 rounded-xl border border-brand-border shadow-md">
        <button
          onClick={() => setView('front')}
          className={`px-3.5 py-1.5 text-xs font-heading font-bold rounded-lg transition-colors ${
            view === 'front'
              ? 'bg-brand-primary text-white shadow-glow-primary'
              : 'text-brand-muted hover:text-brand-light'
          }`}
        >
          FRONT
        </button>
        <button
          onClick={() => setView('back')}
          className={`px-3.5 py-1.5 text-xs font-heading font-bold rounded-lg transition-colors ${
            view === 'back'
              ? 'bg-brand-primary text-white shadow-glow-primary'
              : 'text-brand-muted hover:text-brand-light'
          }`}
        >
          BACK
        </button>
        <div className="w-[1px] h-4 bg-brand-border mx-1" />
        <button
          onClick={() => setShowGuides(!showGuides)}
          title={showGuides ? "Hide Printable Zone Guides" : "Show Printable Zone Guides"}
          className={`p-1.5 rounded-lg transition-colors ${
            showGuides ? 'text-brand-secondary bg-brand-elevated' : 'text-brand-muted hover:text-brand-light'
          }`}
        >
          {showGuides ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      {/* Interactive Drag & Drop Apparel Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[430px] aspect-[4/5] flex items-center justify-center cursor-default"
      >
        {/* Photorealistic Garment Silhouette Vector */}
        <svg
          viewBox="0 0 500 560"
          className="w-full h-full filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)] transition-all duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Fabric Crease Shading */}
            <linearGradient id="fabricShading" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#000000" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
            </linearGradient>

            {/* Armpit Shadow */}
            <radialGradient id="armpitShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
            </radialGradient>
          </defs>

          {/* 1. HALF-HAND T-SHIRT SILHOUETTE */}
          {apparelType === 'halfhand' && (
            <>
              <path
                d="M 160 30 
                   Q 250 55 340 30 
                   L 470 120 
                   L 415 190 
                   L 365 160 
                   L 360 520 
                   Q 250 535 140 520 
                   L 135 160 
                   L 85 190 
                   L 30 120 
                   Z"
                fill={tshirtColor.hex}
                stroke="#000000"
                strokeWidth="2"
                strokeOpacity="0.4"
              />
              <path
                d="M 160 30 Q 250 55 340 30 L 470 120 L 415 190 L 365 160 L 360 520 Q 250 535 140 520 L 135 160 L 85 190 L 30 120 Z"
                fill="url(#fabricShading)"
              />
              {/* Collar */}
              {view === 'front' ? (
                <path d="M 160 30 Q 250 85 340 30 Q 250 65 160 30 Z" fill={tshirtColor.hex} stroke="#000" strokeWidth="2" strokeOpacity="0.3" />
              ) : (
                <path d="M 160 30 Q 250 45 340 30 Q 250 35 160 30 Z" fill={tshirtColor.hex} stroke="#000" strokeWidth="2" strokeOpacity="0.3" />
              )}
              {/* Drop Shoulder Seams */}
              <path d="M 160 30 L 135 160" stroke="#000" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 3" />
              <path d="M 340 30 L 365 160" stroke="#000" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 3" />
            </>
          )}

          {/* 2. FULL-HAND T-SHIRT SILHOUETTE (LONG SLEEVE) */}
          {apparelType === 'fullhand' && (
            <>
              <path
                d="M 160 30 
                   Q 250 55 340 30 
                   L 470 120 
                   L 435 390 
                   L 390 385 
                   L 365 160 
                   L 360 520 
                   Q 250 535 140 520 
                   L 135 160 
                   L 110 385 
                   L 65 390 
                   L 30 120 
                   Z"
                fill={tshirtColor.hex}
                stroke="#000000"
                strokeWidth="2"
                strokeOpacity="0.4"
              />
              <path
                d="M 160 30 Q 250 55 340 30 L 470 120 L 435 390 L 390 385 L 365 160 L 360 520 Q 250 535 140 520 L 135 160 L 110 385 L 65 390 L 30 120 Z"
                fill="url(#fabricShading)"
              />
              {/* Collar */}
              {view === 'front' ? (
                <path d="M 160 30 Q 250 85 340 30 Q 250 65 160 30 Z" fill={tshirtColor.hex} stroke="#000" strokeWidth="2" strokeOpacity="0.3" />
              ) : (
                <path d="M 160 30 Q 250 45 340 30 Q 250 35 160 30 Z" fill={tshirtColor.hex} stroke="#000" strokeWidth="2" strokeOpacity="0.3" />
              )}
              {/* Ribbed Wrist Cuffs */}
              <rect x="390" y="375" width="45" height="15" rx="3" fill={tshirtColor.hex} stroke="#000" strokeWidth="1.5" strokeOpacity="0.35" />
              <rect x="65" y="375" width="45" height="15" rx="3" fill={tshirtColor.hex} stroke="#000" strokeWidth="1.5" strokeOpacity="0.35" />
              {/* Sleeve Seam Details */}
              <path d="M 160 30 L 135 160" stroke="#000" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 3" />
              <path d="M 340 30 L 365 160" stroke="#000" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 3" />
            </>
          )}

          {/* 3. HOODIE SILHOUETTE (HEAVYWEIGHT FLEECE) */}
          {apparelType === 'hoodie' && (
            <>
              {/* Main Body with full sleeves */}
              <path
                d="M 155 45 
                   Q 250 65 345 45 
                   L 475 125 
                   L 435 395 
                   L 385 390 
                   L 365 160 
                   L 360 525 
                   Q 250 540 140 525 
                   L 135 160 
                   L 115 390 
                   L 65 395 
                   L 25 125 
                   Z"
                fill={tshirtColor.hex}
                stroke="#000000"
                strokeWidth="2"
                strokeOpacity="0.45"
              />
              <path
                d="M 155 45 Q 250 65 345 45 L 475 125 L 435 395 L 385 390 L 365 160 L 360 525 Q 250 540 140 525 L 135 160 L 115 390 L 65 395 L 25 125 Z"
                fill="url(#fabricShading)"
              />
              {/* Structured Hood Around Neck */}
              <path
                d="M 145 50 Q 250 -15 355 50 Q 250 15 145 50 Z"
                fill={tshirtColor.hex}
                stroke="#000"
                strokeWidth="2"
                strokeOpacity="0.5"
              />
              {/* Front Kangaroo Pouch Pocket (Front View Only) */}
              {view === 'front' && (
                <>
                  <path
                    d="M 180 390 L 320 390 L 345 495 L 155 495 Z"
                    fill={tshirtColor.hex}
                    stroke="#000"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                  />
                  {/* Pocket Side Slits */}
                  <path d="M 180 390 L 155 435" stroke="#000" strokeWidth="2" strokeOpacity="0.45" />
                  <path d="M 320 390 L 345 435" stroke="#000" strokeWidth="2" strokeOpacity="0.45" />
                </>
              )}
              {/* Ribbed Wrist Cuffs */}
              <rect x="385" y="380" width="50" height="15" rx="3" fill={tshirtColor.hex} stroke="#000" strokeWidth="1.5" strokeOpacity="0.4" />
              <rect x="65" y="380" width="50" height="15" rx="3" fill={tshirtColor.hex} stroke="#000" strokeWidth="1.5" strokeOpacity="0.4" />
              {/* Ribbed Bottom Waistband */}
              <rect x="140" y="505" width="220" height="20" rx="3" fill={tshirtColor.hex} stroke="#000" strokeWidth="1.5" strokeOpacity="0.3" />
            </>
          )}

          {/* Bottom Hem Stitching */}
          <path d="M 140 505 Q 250 520 360 505" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="2 2" />
        </svg>

        {/* Printable Area Container */}
        <div
          className={`absolute ${
            apparelType === 'hoodie' && view === 'front'
              ? 'top-[20%] w-[46%] h-[42%]'
              : view === 'front'
              ? 'top-[22%] w-[48%] h-[50%]'
              : 'top-[16%] w-[52%] h-[60%]'
          } rounded-xl transition-all flex flex-col items-center justify-center overflow-hidden ${
            showGuides ? 'border-2 border-dashed border-brand-secondary/70 bg-brand-primary/[0.04]' : ''
          }`}
          onMouseDown={handleMouseDown}
        >
          {/* Printable Bounds Label */}
          {showGuides && (
            <div className="absolute top-1.5 left-2 text-[8px] font-mono text-brand-secondary font-bold uppercase tracking-wider bg-brand-dark/90 px-1.5 py-0.5 rounded pointer-events-none shadow-sm">
              {view === 'front' ? 'Chest Print Zone' : 'Spine Print Zone'} (12" x 16")
            </div>
          )}

          {/* Graphic Element & Custom Text Overlay */}
          <div
            style={{
              transform: `translate(${graphicPos.x}px, ${graphicPos.y}px) scale(${graphicScale}) rotate(${graphicRotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
            className="flex flex-col items-center justify-center text-center max-w-full max-h-full"
          >
            {/* Custom Uploaded Graphic or Selected Preset */}
            {graphicImage && (
              <div className="relative group max-w-[170px] max-h-[170px]">
                <img
                  src={graphicImage}
                  alt="Custom Print Artwork"
                  className="w-full h-full object-contain filter drop-shadow-md pointer-events-none mix-blend-multiply dark:mix-blend-screen"
                />
              </div>
            )}

            {/* Custom Slogan / Text Overlay */}
            {customText && (
              <div
                className={`mt-2 ${fontClasses[textFont] || fontClasses.display} leading-none break-words px-2`}
                style={{
                  color: textColor,
                  fontSize: `${textSize}px`,
                  textShadow: '0 2px 8px rgba(0,0,0,0.7)'
                }}
              >
                {customText}
              </div>
            )}

            {/* Empty Canvas Indicator */}
            {!graphicImage && !customText && (
              <div className="flex flex-col items-center justify-center text-center p-3 pointer-events-none">
                <div className="w-8 h-8 rounded-full border border-dashed border-white/20 flex items-center justify-center text-brand-muted mb-1.5">
                  <Move className="w-4 h-4 text-brand-secondary" />
                </div>
                <span className="text-[10px] font-mono font-bold text-brand-light uppercase tracking-wider">
                  PRINT AREA READY
                </span>
                <span className="text-[9px] text-brand-muted">
                  Upload artwork or add text
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 text-[10px] font-mono text-brand-muted">
        <Move className="w-3.5 h-3.5 text-brand-secondary" />
        <span>Click & drag your artwork inside the dashed zone</span>
      </div>
    </div>
  );
}
