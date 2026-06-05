"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  /** 0–1 — keep low so text stays readable */
  opacity?: number;
};

/** Wide manga panel behind a section — hidden if file missing */
export function SectionBackdrop({ src, opacity = 0.16 }: Props) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="section-backdrop pointer-events-none absolute inset-0 z-0" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="section-backdrop__image object-cover object-center"
        style={{ opacity }}
        onError={() => setVisible(false)}
      />
      <div className="section-backdrop__veil" />
    </div>
  );
}
