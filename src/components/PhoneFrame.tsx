"use client";

import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative w-[375px] h-[812px] bg-background rounded-[44px] border-[3px] border-white/10 overflow-hidden shadow-2xl">
      {/* Status bar notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[34px] bg-black rounded-b-[20px] z-50" />
      {/* Screen content */}
      <div className="relative w-full h-full overflow-hidden">
        {children}
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/30 rounded-full z-50" />
    </div>
  );
}
