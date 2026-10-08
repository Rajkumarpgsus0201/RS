import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Move, ZoomIn, Eye, EyeOff, Layers, RefreshCcw } from 'lucide-react';

export default function MockupCanvas({
  tshirtColor,
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

  // Font class mapping (with Outfit, Exo, Quicksand, Script)
  const fontClasses = {
    'display': 'font-display font-black uppercase tracking-tight',
    'gothic': 'font-serif font-black tracking-wider uppercase',
    'sans': 'font-heading font-bold uppercase tracking-wide',
    'script': 'font-script font-bold tracking-normal',
    'mono': 'font-mono font-medium tracking-tight'
  };

  return (
    <div className="relative w-full h-[450px] sm:h-[540px] md:h-[600px] bg-brand-surface/90 rounded-3xl border border-brand-border flex flex-col items-center justify-center p-4 overflow-hidden select-none shadow-card-rich">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-30" />
      <div className="absolute top-5 left-5 flex items-center gap-2 font-heading text-[11px] text-brand-secondary font-semibold uppercase tracking-wider">
        <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
        <span>CANVAS LIVE // 1200 DPI DTG ATELIER</span>
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
        <div className="w-px h-4 bg-brand-border mx-0.5" />
        <button
          onClick={() => setShowGuides(!showGuides)}
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            showGuides ? 'text-brand-secondary bg-brand-primary/20' : 'text-brand-muted hover:text-brand-light'
          }`}
          title="Toggle Printable Boundaries"
        >
          {showGuides ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      {/* Realistic T-Shirt Garment Rendering Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-[4/5] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* T-Shirt SVG with Dynamic Fabric Color & Shading */}
        <svg
          viewBox="0 0 500 560"
          className="w-full h-full drop-shadow-2xl transition-all duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Fabric Shading Gradient */}
            <linearGradient id="fabricShading" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#000000" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
            </linearGradient>

            {/* Natural Sleeve Fold Shadow */}
            <radialGradient id="armpitShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
            </radialGradient>
          </defs>

          {/* Heavyweight Oversized T-Shirt Body Silhouette */}
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

          {/* Shading Layer */}
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
            fill="url(#fabricShading)"
          />

          {/* Collar Ribbing */}
          {view === 'front' ? (
            <path
              d="M 160 30 Q 250 85 340 30 Q 250 65 160 30 Z"
              fill={tshirtColor.hex}
              stroke="#000000"
              strokeWidth="2"
              strokeOpacity="0.3"
            />
          ) : (
            <path
              d="M 160 30 Q 250 45 340 30 Q 250 35 160 30 Z"
              fill={tshirtColor.hex}
              stroke="#000000"
              strokeWidth="2"
              strokeOpacity="0.3"
            />
          )}

          {/* Drop Shoulder Seams */}
          <path d="M 160 30 L 135 160" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 3" />
          <path d="M 340 30 L 365 160" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 3" />

          {/* Bottom Hem Stitching */}
          <path d="M 140 505 Q 250 520 360 505" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="2 2" />

          {/* Subtle Chest/Body Center Guideline (Faint) */}
          <line x1="250" y1="90" x2="250" y2="480" stroke="#ffffff" strokeOpacity="0.04" strokeDasharray="4 4" />
        </svg>

        {/* Printable Area Container */}
        <div
          className={`absolute ${
            view === 'front'
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
                  <Move className="w-4 h-4 opacity-40 text-brand-secondary" />
                </div>
                <span className="text-[10px] font-heading font-semibold text-brand-muted uppercase tracking-wider">
                  Drag Artwork or Text Here
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Transformation Quick Helpers */}
      {(graphicImage || customText) && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-brand-dark/95 backdrop-blur-md p-2.5 rounded-2xl border border-brand-border text-xs font-mono text-brand-muted shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <ZoomIn className="w-3.5 h-3.5 text-brand-secondary" />
              <span>Scale: {Math.round(graphicScale * 100)}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5 text-brand-accent" />
              <span>Angle: {graphicRotation}°</span>
            </div>
          </div>
          <button
            onClick={() => {
              setGraphicPos({ x: 0, y: 0 });
              setGraphicScale(1);
              setGraphicRotation(0);
            }}
            className="flex items-center gap-1 text-[11px] font-heading font-bold text-brand-secondary hover:text-white transition-colors"
          >
            <RefreshCcw className="w-3 h-3" />
            <span>RESET</span>
          </button>
        </div>
      )}
    </div>
  );
}
