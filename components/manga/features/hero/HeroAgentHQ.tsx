"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { gsap } from "@/lib/motion/gsap-register";
import { OVERLOAD_END, OVERLOAD_START } from "@/lib/effects/overload-events";
import {
  addEmissiveEdges,
  buildTacticalLaptop,
  sampleMeshParticles,
} from "@/lib/three/tactical-laptop";
import { cn } from "@/lib/utils/cn";

type Props = {
  active?: boolean;
  className?: string;
};

function particleCount() {
  if (typeof window === "undefined") return 3200;
  return window.matchMedia("(max-width: 768px)").matches ? 1400 : 3800;
}

export function HeroAgentHQ({ active, className }: Props) {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    group: THREE.Group;
    edges: THREE.LineSegments;
    particles: THREE.Points;
    targets: Float32Array;
    random: Float32Array;
    rot: { x: number; y: number };
    raf: number;
    asm: gsap.core.Tween | null;
    shake?: gsap.core.Timeline;
    mouse?: (e: PointerEvent) => void;
  } | null>(null);

  useEffect(() => {
    if (reduced || !hostRef.current) return;

    const host = hostRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.12);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 0.35, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    const key = new THREE.DirectionalLight(0xffe0e0, 1.1);
    key.position.set(2, 4, 5);
    const rim = new THREE.DirectionalLight(0xe11924, 0.85);
    rim.position.set(-3, 1, -2);
    scene.add(ambient, key, rim);

    const group = buildTacticalLaptop();
    group.visible = false;
    scene.add(group);

    const edges = addEmissiveEdges(group);
    edges.visible = false;
    scene.add(edges);

    const count = particleCount();
    const { positions, random } = sampleMeshParticles(group, count);
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(random.slice(), 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xe11924,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    const rot = { x: 0, y: 0 };
    stateRef.current = {
      renderer,
      scene,
      camera,
      group,
      edges,
      particles,
      targets: positions,
      random,
      rot,
      raf: 0,
      asm: null,
    };

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const tick = () => {
      const s = stateRef.current;
      if (!s) return;
      s.group.rotation.x = s.rot.x;
      s.group.rotation.y = s.rot.y;
      s.edges.rotation.copy(s.group.rotation);
      s.renderer.render(s.scene, s.camera);
      s.raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      const s = stateRef.current;
      if (!s) return;
      cancelAnimationFrame(s.raf);
      s.asm?.kill();
      s.shake?.kill();
      if (s.mouse) window.removeEventListener("pointermove", s.mouse);
      ro.disconnect();
      pGeo.dispose();
      pMat.dispose();
      s.group.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
          else o.material.dispose();
        }
      });
      s.edges.geometry.dispose();
      (s.edges.material as THREE.Material).dispose();
      s.renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
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
    s.mouse = onMove;
    window.addEventListener("pointermove", onMove);

    return () => {
      if (s.mouse) window.removeEventListener("pointermove", s.mouse);
    };
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
      <div
        className={cn("hero-agent-stage hero-agent-stage--fallback", className)}
        aria-hidden
      />
    );
  }

  return <div ref={hostRef} className={cn("hero-agent-stage", className)} aria-hidden />;
}
