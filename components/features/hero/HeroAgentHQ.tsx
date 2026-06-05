"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { gsap } from "@/lib/motion/gsap-register";
import { OVERLOAD_END, OVERLOAD_START } from "@/lib/effects/overload-events";
import { mountHeroLaptopScene, type HeroLaptopScene } from "@/lib/three/mount-hero-laptop-scene";
import { cn } from "@/lib/utils/cn";

type Props = {
  active?: boolean;
  className?: string;
};

export function HeroAgentHQ({ active, className }: Props) {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<HeroLaptopScene | null>(null);

  useEffect(() => {
    if (reduced || !hostRef.current) return;

    const { state, dispose } = mountHeroLaptopScene(hostRef.current);
    stateRef.current = state;

    return () => {
      dispose();
      stateRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    const s = stateRef.current;
    if (!s || reduced) return;

    const onMove = (e: PointerEvent) => {
      const host = hostRef.current;
      if (!host) return;
      const r = host.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      gsap.to(s.rot, {
        x: -ny * 0.14,
        y: nx * 0.28,
        duration: 0.55,
        ease: "power2.out",
        overwrite: true,
      });
    };
    window.addEventListener("pointermove", onMove);

    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  useEffect(() => {
    const s = stateRef.current;
    if (!s || reduced || !active) return;

    const posAttr = s.particles.geometry.getAttribute("position") as THREE.BufferAttribute;
    const progress = { t: 0 };

    s.particles.visible = true;
    s.group.visible = false;
    s.edges.visible = false;
    (s.particles.material as THREE.PointsMaterial).opacity = 0.9;

    s.asm?.kill();
    s.asm = gsap.to(progress, {
      t: 1,
      duration: 2.4,
      ease: "power3.inOut",
      onUpdate: () => {
        const t = progress.t;
        for (let i = 0; i < posAttr.count; i++) {
          const i3 = i * 3;
          posAttr.array[i3] = THREE.MathUtils.lerp(s.random[i3], s.targets[i3], t);
          posAttr.array[i3 + 1] = THREE.MathUtils.lerp(s.random[i3 + 1], s.targets[i3 + 1], t);
          posAttr.array[i3 + 2] = THREE.MathUtils.lerp(s.random[i3 + 2], s.targets[i3 + 2], t);
        }
        posAttr.needsUpdate = true;
      },
      onComplete: () => {
        gsap.to(s.particles.material, {
          opacity: 0,
          duration: 0.45,
          onComplete: () => {
            s.particles.visible = false;
            s.group.visible = true;
            s.edges.visible = true;
            s.group.scale.set(0.92, 0.92, 0.92);
            gsap.to(s.group.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.4)" });
          },
        });
      },
    });

    return () => {
      s.asm?.kill();
    };
  }, [active, reduced]);

  useEffect(() => {
    const s = stateRef.current;
    if (!s || reduced) return;
    if (active) return;
    s.asm?.kill();
    s.particles.visible = false;
    s.group.visible = true;
    s.edges.visible = true;
  }, [active, reduced]);

  useEffect(() => {
    const s = stateRef.current;
    if (!s || reduced) return;

    const onStart = () => {
      s.shake?.kill();
      s.asm?.pause();
      s.group.visible = true;
      s.edges.visible = true;
      s.shake = gsap.timeline({ repeat: -1 });
      s.shake.to(
        s.group.position,
        {
          x: () => gsap.utils.random(-0.35, 0.35),
          y: () => gsap.utils.random(-0.28, 0.28),
          z: () => gsap.utils.random(-0.12, 0.12),
          duration: 0.045,
          ease: "none",
        },
        0,
      );
      s.shake.to(
        s.group.rotation,
        {
          x: () => gsap.utils.random(-0.45, 0.45),
          y: () => gsap.utils.random(-0.55, 0.55),
          z: () => gsap.utils.random(-0.2, 0.2),
          duration: 0.05,
          ease: "none",
        },
        0,
      );
      s.shake.to(
        s.edges.position,
        {
          x: () => gsap.utils.random(-0.2, 0.2),
          y: () => gsap.utils.random(-0.2, 0.2),
          duration: 0.04,
          ease: "none",
        },
        0,
      );
    };

    const onEnd = () => {
      s.shake?.kill();
      s.shake = undefined;
      gsap.set(s.group.position, { x: 0, y: 0, z: 0 });
      gsap.set(s.group.rotation, { x: s.rot.x, y: s.rot.y, z: 0 });
      gsap.set(s.edges.position, { x: 0, y: 0, z: 0 });
      s.asm?.resume();
    };

    window.addEventListener(OVERLOAD_START, onStart);
    window.addEventListener(OVERLOAD_END, onEnd);
    return () => {
      window.removeEventListener(OVERLOAD_START, onStart);
      window.removeEventListener(OVERLOAD_END, onEnd);
      s.shake?.kill();
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div className={cn("hero-agent-stage hero-agent-stage--fallback", className)} aria-hidden />
    );
  }

  return <div ref={hostRef} className={cn("hero-agent-stage", className)} aria-hidden />;
}
