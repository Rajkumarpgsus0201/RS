import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Studio Lighting Rig Configuration
 */
export const STUDIO_LIGHT_PRESETS = {
  warm: {
    id: 'warm',
    name: '3200K WARM ATELIER',
    shortName: 'WARM 3200K',
    glowHex: '#FFB703',
    beamClass: 'from-amber-400/25 via-amber-500/10 to-transparent',
    lensGlow: 'rgba(255, 183, 3, 0.95)',
    ambientHaze: 'rgba(255, 183, 3, 0.08)',
    spotlightCenter: 'radial-gradient(ellipse at 50% 0%, rgba(255, 183, 3, 0.28) 0%, rgba(250, 104, 0, 0.12) 40%, transparent 75%)',
    floorTint: 'rgba(255, 183, 3, 0.15)',
    tubeColor: 'from-amber-500 via-orange-500 to-amber-300',
    indicatorColor: 'bg-amber-400'
  },
  daylight: {
    id: 'daylight',
    name: '5600K DAYLIGHT STUDIO',
    shortName: 'DAYLIGHT 5600K',
    glowHex: '#E2F1FF',
    beamClass: 'from-blue-100/30 via-cyan-300/10 to-transparent',
    lensGlow: 'rgba(240, 248, 255, 0.98)',
    ambientHaze: 'rgba(200, 230, 255, 0.08)',
    spotlightCenter: 'radial-gradient(ellipse at 50% 0%, rgba(240, 248, 255, 0.32) 0%, rgba(180, 220, 255, 0.14) 40%, transparent 75%)',
    floorTint: 'rgba(220, 240, 255, 0.18)',
    tubeColor: 'from-cyan-300 via-white to-blue-400',
    indicatorColor: 'bg-cyan-200'
  },
  cyber: {
    id: 'cyber',
    name: 'CYBER STREET ATELIER',
    shortName: 'CYBER STREET',
    glowHex: '#299E60',
    beamClass: 'from-emerald-400/25 via-emerald-600/10 to-transparent',
    lensGlow: 'rgba(41, 158, 96, 0.95)',
    ambientHaze: 'rgba(41, 158, 96, 0.1)',
    spotlightCenter: 'radial-gradient(ellipse at 50% 0%, rgba(41, 158, 96, 0.3) 0%, rgba(1, 105, 53, 0.15) 45%, transparent 75%)',
    floorTint: 'rgba(41, 158, 96, 0.18)',
    tubeColor: 'from-emerald-400 via-teal-300 to-emerald-600',
    indicatorColor: 'bg-emerald-400'
  },
  noir: {
    id: 'noir',
    name: 'HIGH-CONTRAST NOIR PIN',
    shortName: 'DRAMATIC NOIR',
    glowHex: '#FA6800',
    beamClass: 'from-amber-500/30 via-transparent to-transparent',
    lensGlow: 'rgba(250, 104, 0, 0.95)',
    ambientHaze: 'rgba(0, 0, 0, 0.3)',
    spotlightCenter: 'radial-gradient(ellipse at 50% 0%, rgba(250, 104, 0, 0.35) 0%, rgba(230, 25, 55, 0.1) 30%, transparent 60%)',
    floorTint: 'rgba(250, 104, 0, 0.12)',
    tubeColor: 'from-red-600 via-orange-500 to-amber-600',
    indicatorColor: 'bg-orange-500'
  }
};

export default function StudioLightingRig({ activePresetKey = 'warm' }) {
  const preset = STUDIO_LIGHT_PRESETS[activePresetKey] || STUDIO_LIGHT_PRESETS.warm;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* 1. Global Ambient Studio Volumetric Spot Beam onto Center Rack */}
      <motion.div
        key={`ambient-${preset.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 inset-x-0 h-[650px]"
        style={{ background: preset.spotlightCenter }}
      />

      {/* 2. OVERHEAD BLACK ALUMINUM STAGE TRUSS RIG */}
      <div className="absolute top-0 inset-x-0 h-14 z-10 flex flex-col items-center">
        {/* Main Double Tubular Truss Bar */}
        <div className="w-full h-3 bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 border-b border-zinc-700/60 shadow-lg flex items-center justify-between px-6">
          <div className="w-4 h-full bg-zinc-700" />
          <div className="w-4 h-full bg-zinc-700" />
          <div className="w-4 h-full bg-zinc-700" />
          <div className="w-4 h-full bg-zinc-700" />
        </div>

        {/* Triangular Truss Cross-bracing Pattern SVG */}
        <div className="w-full h-5 overflow-hidden opacity-40">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 20">
            <path
              d="M0 0 L20 20 L40 0 L60 20 L80 0 L100 20 L120 0 L140 20 L160 0 L180 20 L200 0 L220 20 L240 0 L260 20 L280 0 L300 20 L320 0 L340 20 L360 0 L380 20 L400 0 L420 20 L440 0 L460 20 L480 0 L500 20 L520 0 L540 20 L560 0 L580 20 L600 0 L620 20 L640 0 L660 20 L680 0 L700 20 L720 0 L740 20 L760 0 L780 20 L800 0 L820 20 L840 0 L860 20 L880 0 L900 20 L920 0 L940 20 L960 0 L980 20 L1000 0 L1020 20 L1040 0 L1060 20 L1080 0 L1100 20 L1120 0 L1140 20 L1160 0 L1180 20 L1200 0"
              stroke="#A1A1AA"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Secondary Lower Truss Rail */}
        <div className="w-full h-2 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 border-t border-zinc-600/50 shadow-md" />

        {/* Overhead Studio Power Cord wrapping around truss */}
        <svg className="absolute top-2 inset-x-0 w-full h-10 opacity-30" preserveAspectRatio="none" viewBox="0 0 1000 40">
          <path d="M0 20 Q120 5 250 22 T500 18 T750 24 T1000 18" stroke="#000" strokeWidth="4" fill="none" />
          <path d="M0 20 Q120 5 250 22 T500 18 T750 24 T1000 18" stroke="#333" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* 3. PHYSICAL CLAMPED STUDIO SPOTLIGHTS & VOLUMETRIC CONES */}
      
      {/* --- SPOTLIGHT 1: LEFT KEY SPOT (Angled 20° Inward) --- */}
      <div className="absolute top-8 left-[12%] sm:left-[18%] flex flex-col items-center z-20">
        {/* Steel C-Clamp hooked to Truss */}
        <div className="w-3.5 h-4 bg-zinc-700 rounded-t-sm border border-zinc-500 shadow-sm" />
        {/* Yoke Bracket */}
        <div className="w-7 h-2.5 border-x-2 border-b-2 border-zinc-600 rounded-b-md -mt-0.5" />
        
        {/* Spotlight Cylindrical Body with Barn Doors */}
        <div className="relative w-11 h-12 bg-gradient-to-b from-zinc-900 via-zinc-800 to-black rounded-b-lg border border-zinc-700 shadow-2xl flex flex-col items-center justify-end p-1">
          {/* Cooling Fins / Ridges */}
          <div className="w-full h-[1px] bg-zinc-700 my-0.5" />
          <div className="w-full h-[1px] bg-zinc-700 my-0.5" />
          
          {/* Barn Doors (4 metallic flaps) */}
          <div className="absolute -left-3 top-2 w-3 h-8 bg-zinc-900 border border-zinc-700 rounded-l-sm origin-right -rotate-12 shadow-lg" />
          <div className="absolute -right-3 top-2 w-3 h-8 bg-zinc-900 border border-zinc-700 rounded-r-sm origin-left rotate-12 shadow-lg" />
          
          {/* Glowing Lens Glass */}
          <div 
            className="w-7 h-3 rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            style={{ 
              backgroundColor: preset.glowHex,
              boxShadow: `0 0 25px ${preset.lensGlow}, 0 0 50px ${preset.lensGlow}`
            }}
          />
        </div>

        {/* Visible Volumetric Light Shaft (Left Angle Cone) */}
        <div 
          className="w-72 sm:w-96 h-[500px] pointer-events-none opacity-40 transition-all duration-700 blur-sm"
          style={{
            background: `linear-gradient(170deg, ${preset.glowHex}44 0%, ${preset.glowHex}11 40%, transparent 80%)`,
            clipPath: 'polygon(45% 0%, 55% 0%, 95% 100%, 0% 100%)'
          }}
        />
      </div>

      {/* --- SPOTLIGHT 2: CENTER HIGH-POWER FRESNEL (Directly Over Center Drop) --- */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        {/* Heavy Duty Double C-Clamp */}
        <div className="flex gap-1">
          <div className="w-3.5 h-4 bg-zinc-700 rounded-t-sm border border-zinc-500 shadow-sm" />
          <div className="w-3.5 h-4 bg-zinc-700 rounded-t-sm border border-zinc-500 shadow-sm" />
        </div>
        {/* Industrial Fresnel Yoke */}
        <div className="w-10 h-3 border-x-2 border-b-2 border-zinc-500 rounded-b-md -mt-0.5" />

        {/* Studio Fresnel Body */}
        <div className="relative w-16 h-14 bg-gradient-to-b from-zinc-900 via-zinc-800 to-black rounded-b-xl border border-zinc-600 shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex flex-col items-center justify-end p-1.5">
          {/* Heat warning yellow label */}
          <div className="absolute top-1 left-2 text-[6px] font-mono font-bold text-amber-500 uppercase tracking-tighter">
            HOT // 2000W
          </div>

          {/* Side Adjustment Knobs */}
          <div className="absolute -left-1.5 top-4 w-2 h-4 rounded-sm bg-zinc-500 border border-zinc-400" />
          <div className="absolute -right-1.5 top-4 w-2 h-4 rounded-sm bg-zinc-500 border border-zinc-400" />

          {/* 4 Barn Doors (Top, Left, Right) */}
          <div className="absolute -left-4 top-1 w-4 h-11 bg-zinc-950 border border-zinc-700 rounded-l origin-right -rotate-6 shadow-xl" />
          <div className="absolute -right-4 top-1 w-4 h-11 bg-zinc-950 border border-zinc-700 rounded-r origin-left rotate-6 shadow-xl" />

          {/* Concentric Fresnel Lens Glass */}
          <div 
            className="w-12 h-4 rounded-full transition-all duration-500 relative flex items-center justify-center"
            style={{ 
              backgroundColor: '#FFFFFF',
              boxShadow: `0 0 35px ${preset.lensGlow}, 0 0 70px ${preset.lensGlow}`
            }}
          >
            {/* Concentric Ring Effect */}
            <div className="w-8 h-2 rounded-full border border-white/80" />
          </div>
        </div>

        {/* Master Center Downward Light Cone (Wide Volumetric Shaft) */}
        <div 
          className="w-[450px] sm:w-[600px] h-[550px] pointer-events-none opacity-50 transition-all duration-700 blur-[2px]"
          style={{
            background: `linear-gradient(180deg, ${preset.glowHex}55 0%, ${preset.glowHex}18 45%, transparent 85%)`,
            clipPath: 'polygon(46% 0%, 54% 0%, 100% 100%, 0% 100%)'
          }}
        />
      </div>

      {/* --- SPOTLIGHT 3: RIGHT RIM SPOT (Angled 20° Inward) --- */}
      <div className="absolute top-8 right-[12%] sm:right-[18%] flex flex-col items-center z-20">
        <div className="w-3.5 h-4 bg-zinc-700 rounded-t-sm border border-zinc-500 shadow-sm" />
        <div className="w-7 h-2.5 border-x-2 border-b-2 border-zinc-600 rounded-b-md -mt-0.5" />
        
        <div className="relative w-11 h-12 bg-gradient-to-b from-zinc-900 via-zinc-800 to-black rounded-b-lg border border-zinc-700 shadow-2xl flex flex-col items-center justify-end p-1">
          <div className="w-full h-[1px] bg-zinc-700 my-0.5" />
          <div className="w-full h-[1px] bg-zinc-700 my-0.5" />

          <div className="absolute -left-3 top-2 w-3 h-8 bg-zinc-900 border border-zinc-700 rounded-l-sm origin-right -rotate-12 shadow-lg" />
          <div className="absolute -right-3 top-2 w-3 h-8 bg-zinc-900 border border-zinc-700 rounded-r-sm origin-left rotate-12 shadow-lg" />
          
          <div 
            className="w-7 h-3 rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            style={{ 
              backgroundColor: preset.glowHex,
              boxShadow: `0 0 25px ${preset.lensGlow}, 0 0 50px ${preset.lensGlow}`
            }}
          />
        </div>

        <div 
          className="w-72 sm:w-96 h-[500px] pointer-events-none opacity-40 transition-all duration-700 blur-sm"
          style={{
            background: `linear-gradient(190deg, ${preset.glowHex}44 0%, ${preset.glowHex}11 40%, transparent 80%)`,
            clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 5% 100%)'
          }}
        />
      </div>

      {/* 4. SIDE STUDIO EQUIPMENT: LEFT SOFTBOX ON C-STAND */}
      <div className="hidden xl:flex absolute top-28 -left-4 z-20 flex-col items-center opacity-85 pointer-events-none select-none">
        {/* Large Rectangular Octabox with Honeycomb Diffusion Grid */}
        <div className="relative w-28 h-44 bg-zinc-900 border-2 border-zinc-700 rounded-xl shadow-2xl p-1 -rotate-6 origin-bottom-right">
          {/* Softbox diffusion face with grid texture */}
          <div 
            className="w-full h-full rounded-lg relative overflow-hidden transition-all duration-500 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.85) 0%, ${preset.glowHex}55 60%, rgba(20,20,25,0.9) 100%)`,
              boxShadow: `0 0 45px ${preset.lensGlow}`
            }}
          >
            {/* Softbox Eggcrate / Honeycomb Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000025_1px,transparent_1px),linear-gradient(to_bottom,#00000025_1px,transparent_1px)] bg-[size:10px_10px]" />
          </div>
          {/* Brand stamp on softbox rim */}
          <div className="absolute -top-3 left-4 text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-widest bg-black px-1.5 py-0.5 rounded border border-zinc-800">
            RADNUZ LIGHTING
          </div>
        </div>

        {/* Chrome C-Stand Riser Pole */}
        <div className="w-1.5 h-80 bg-gradient-to-r from-zinc-400 via-zinc-100 to-zinc-500 shadow-md -mt-2" />
        {/* Grip Head / Knuckle */}
        <div className="w-5 h-4 rounded-sm bg-zinc-700 border border-zinc-500 -mt-72 z-30" />
        {/* Telescoping Collar */}
        <div className="w-4 h-3 rounded-sm bg-zinc-800 border border-zinc-600 -mt-36 z-30" />

        {/* C-Stand Turtle Base & Sandbag */}
        <div className="relative flex items-center justify-center -mt-2">
          {/* 3 Staggered Chrome Legs */}
          <div className="w-16 h-2 bg-zinc-400 -rotate-12 rounded-sm shadow-md" />
          <div className="w-20 h-2.5 bg-zinc-300 rounded-sm shadow-md -ml-6" />
          {/* Studio Sandbag weighting down stand */}
          <div className="absolute -bottom-1 w-10 h-6 bg-amber-600/90 border border-amber-400 rounded text-[6px] font-mono font-bold text-black flex items-center justify-center shadow-lg">
            15KG
          </div>
        </div>
      </div>

      {/* 5. SIDE STUDIO EQUIPMENT: RIGHT BEAUTY DISH REFLECTOR ON STAND */}
      <div className="hidden xl:flex absolute top-32 -right-4 z-20 flex-col items-center opacity-85 pointer-events-none select-none">
        {/* Parabolic Beauty Dish Reflector */}
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-800 to-zinc-900 border-2 border-zinc-600 shadow-2xl p-2 rotate-6 flex items-center justify-center">
          {/* Inner silver stippled reflector dish with center deflector */}
          <div 
            className="w-full h-full rounded-full transition-all duration-500 flex items-center justify-center relative overflow-hidden"
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,0.95) 0%, ${preset.glowHex}77 40%, #181A20 90%)`,
              boxShadow: `0 0 45px ${preset.lensGlow}`
            }}
          >
            {/* Center metal deflector cap */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-zinc-200 to-zinc-700 border border-zinc-400 shadow-md" />
          </div>
        </div>

        {/* Chrome Riser Pole */}
        <div className="w-1.5 h-80 bg-gradient-to-r from-zinc-400 via-zinc-100 to-zinc-500 shadow-md -mt-2" />
        <div className="w-5 h-4 rounded-sm bg-zinc-700 border border-zinc-500 -mt-64 z-30" />

        {/* Tripod Base */}
        <div className="relative flex items-center justify-center -mt-2">
          <div className="w-20 h-2.5 bg-zinc-300 rounded-sm shadow-md" />
          <div className="absolute -bottom-1 w-10 h-6 bg-zinc-800 border border-zinc-600 rounded text-[6px] font-mono font-bold text-zinc-300 flex items-center justify-center shadow-lg">
            SANDBAG
          </div>
        </div>
      </div>

      {/* 6. ASTERA RGB LED TUBES STANDING IN BACKGROUND */}
      <div className="hidden lg:flex absolute top-40 left-[6%] z-10 flex-col items-center">
        {/* Vertical Glowing Tube Light */}
        <div 
          className={`w-2.5 h-64 rounded-full bg-gradient-to-b ${preset.tubeColor} shadow-[0_0_25px_rgba(255,255,255,0.7)] opacity-80`}
        />
        {/* Mini Floor Tripod */}
        <div className="w-6 h-3 border-x-2 border-t-2 border-zinc-700 rounded-t-sm -mt-0.5" />
      </div>

      <div className="hidden lg:flex absolute top-40 right-[6%] z-10 flex-col items-center">
        <div 
          className={`w-2.5 h-64 rounded-full bg-gradient-to-b ${preset.tubeColor} shadow-[0_0_25px_rgba(255,255,255,0.7)] opacity-80`}
        />
        <div className="w-6 h-3 border-x-2 border-t-2 border-zinc-700 rounded-t-sm -mt-0.5" />
      </div>

      {/* 7. STUDIO FLOOR: Concrete Sheen & Tape Cross-Marks */}
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black via-zinc-950/70 to-transparent">
        {/* Center Model Position Cross Mark (Gaffer Tape on Studio Floor) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center opacity-40">
          <div className="w-8 h-1 bg-amber-400" />
          <div className="h-8 w-1 bg-amber-400 -ml-4.5" />
        </div>

        {/* Distance Tape Markers */}
        <div className="absolute bottom-3 left-10 text-[9px] font-mono text-zinc-600 uppercase tracking-widest hidden sm:block">
          STUDIO BAY 01 // 35MM FOCAL PLANE
        </div>
        <div className="absolute bottom-3 right-10 text-[9px] font-mono text-zinc-600 uppercase tracking-widest hidden sm:block">
          RADNUZ ATELIER STAGE • ISO 100
        </div>
      </div>

    </div>
  );
}
