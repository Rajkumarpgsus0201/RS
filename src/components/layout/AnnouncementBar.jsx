import React from 'react';
import { Zap, ShieldCheck, Truck } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-brand-volt text-brand-black text-[11px] font-mono font-bold py-1.5 px-4 overflow-hidden border-b border-brand-border">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="hidden md:flex items-center gap-2">
          <Truck className="w-3.5 h-3.5" />
          <span>FREE EXPRESS SHIPPING ON ORDERS OVER ₹1,499</span>
        </div>
        
        <div className="flex items-center justify-center w-full md:w-auto gap-3 text-center">
          <span className="bg-brand-black text-brand-volt px-1.5 py-0.5 rounded text-[10px]">DROP 01 LIVE</span>
          <span>USE CODE <span className="underline tracking-wider font-extrabold">RADNUZ10</span> FOR 10% OFF</span>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>240 GSM HEAVYWEIGHT • 60+ WASH TESTED</span>
        </div>
      </div>
    </div>
  );
}
