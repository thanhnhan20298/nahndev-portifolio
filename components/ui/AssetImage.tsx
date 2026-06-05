"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  fallback?: React.ReactNode;
};

/** next/image with graceful fallback when file not in public/ yet */
export function AssetImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
  fallback = null,
}: Props) {
  const [ok, setOk] = useState(true);

  if (!ok) return <>{fallback}</>;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setOk(false)}
    />
  );
}

type CoverProps = {
  src: string;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
};

export function CoverImage({ src, alt, className, fallback }: CoverProps) {
  const [ok, setOk] = useState(true);

  if (!ok) {
    return <div className={cn("site-cover-fallback", className)}>{fallback}</div>;
  }

  return (
    <div className={cn("site-cover-image relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 5rem, 6rem"
        className="object-cover object-center"
        onError={() => setOk(false)}
      />
    </div>
  );
}
