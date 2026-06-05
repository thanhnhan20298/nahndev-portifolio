"use client";

import { motion, useReducedMotion } from "framer-motion";
import { about } from "@/lib/content/about";
import { assets } from "@/lib/content/assets";
import { profile } from "@/lib/content/profile";
import { DOSSIER_SLAM_3D_INITIAL, DOSSIER_SLAM_SPRING } from "@/lib/motion/motion";
import { AmbientFloat3D } from "@/components/effects/AmbientFloat3D";
import { Tilt3D } from "@/components/effects/Tilt3D";
import { AssetImage } from "@/components/ui/AssetImage";
import { cn } from "@/lib/utils/cn";

type Props = { className?: string; slam?: boolean };

function AvatarFallback({ className }: { className?: string }) {
  return (
    <div className={cn("hero-profile-card__initials", className)} aria-hidden>
      {profile.initials}
    </div>
  );
}

function Avatar({ className }: { className?: string }) {
  return (
    <AssetImage
      src={assets.avatar}
      alt={`${about.name} — agent dossier portrait`}
      width={400}
      height={400}
      className={cn("hero-profile-card__photo", className)}
      priority
      fallback={<AvatarFallback className={className} />}
    />
  );
}

function CardInner({ className, slam }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "hero-profile-card ink-border relative mx-auto w-full overflow-hidden p-5 md:p-6",
        className,
      )}
      initial={slam && !reduced ? DOSSIER_SLAM_3D_INITIAL : false}
      animate={
        slam && !reduced ? { opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0, z: 0 } : undefined
      }
      transition={slam && !reduced ? DOSSIER_SLAM_SPRING : { duration: 0.01 }}
    >
      <p className="font-label text-center text-[10px] text-accent">{profile.badge}</p>
      <div className="hero-profile-card__frame relative mx-auto mt-3 aspect-square w-[68%] max-w-[200px]">
        <Avatar className="hero-profile-card__photo-wrap" />
      </div>
      <p className="mt-4 text-center font-display text-2xl uppercase tracking-wide md:text-3xl">
        {about.name}
      </p>
      <p className="mt-1 text-center text-sm font-bold">{profile.role}</p>
      <p className="mt-2 text-center font-label text-[10px] text-muted-label">{profile.years}</p>
      <p className="mt-3 text-center text-xs site-text-dim">{profile.note}</p>
    </motion.div>
  );
}

export function HeroProfileCard({ className, slam }: Props) {
  return (
    <AmbientFloat3D preset="card" className={cn("hero-visual-slot__card w-full", className)}>
      <Tilt3D intensity={0.55} className="w-full">
        <CardInner slam={slam} />
      </Tilt3D>
    </AmbientFloat3D>
  );
}
