import React from 'react';
import { Sparkles, Truck, Flame } from 'lucide-react';

export default function AnnouncementBar({ onOpenDiwaliOffer }) {
  return (
    <div 
      onClick={onOpenDiwaliOffer}
      className="w-full bg-gradient-to-r from-amber-500 via-red-600 to-amber-500 text-white text-[11px] font-mono font-bold py-2 px-4 overflow-hidden border-b border-amber-400/30 cursor-pointer shadow-md select-none"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="hidden md:flex items-center gap-2 text-amber-200">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
          <span>DIWALI FESTIVE DROP // LIMITED TIME</span>
        </div>
        
        <div className="flex items-center justify-center w-full md:w-auto gap-2 text-center tracking-wide">
          <span className="bg-black/50 text-amber-300 px-2 py-0.5 rounded text-[10px] font-heading font-black uppercase">
            🪔 DIWALI COMBO
          </span>
          <span className="font-heading font-extrabold text-xs">
            BUY THALA & THALAPATHY TEE → <span className="underline text-amber-200">GET THALA-THALAPATHY TEE FREE!</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-amber-200">
          <Truck className="w-3.5 h-3.5" />
          <span>FREE EXPRESS DELIVERY INCLUDED</span>
        </div>
      </div>
    </div>
  );
}
