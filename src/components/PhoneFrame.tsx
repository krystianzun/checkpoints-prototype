"use client";

import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative w-[540px] h-[720px] bg-background rounded-[28px] border-[3px] border-white/10 overflow-hidden shadow-2xl">
      {/* Screen content */}
      <div className="relative w-full h-full overflow-hidden">{children}</div>
    </div>
  );
}
