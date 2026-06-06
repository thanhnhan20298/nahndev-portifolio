"use client";

import Image from "next/image";
import { useState } from "react";
import { assets } from "@/lib/content/assets";

/** Optional backdrop + CSS tactical HUD overlay */
export function HeroBackdrop() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <div
        className="hero-backdrop hero-backdrop--hud-only pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
      />
    );
  }

  return (
    <div className="hero-backdrop pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <Image
        src={assets.hero.backdrop}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-[0.22]"
        onError={() => setVisible(false)}
        priority={false}
      />
      <div className="hero-backdrop__hud" />
      <div className="hero-backdrop__scanlines" />
    </div>
  );
}
