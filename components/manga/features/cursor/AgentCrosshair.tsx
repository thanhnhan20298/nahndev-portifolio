"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { gsap } from "@/lib/motion/gsap-register";
import { OVERLOAD_END, OVERLOAD_START } from "@/lib/effects/overload-events";
import { playGunshot } from "@/lib/audio/playGunshot";
import {
  spawnBulletHole,
  spawnGunfireBurst,
  syncShotMarksLayer,
} from "@/lib/effects/gunfire-vfx";

type Props = { enabled?: boolean };

const LOCK_SEL =
  "a, button, .manga-cta, .project-card, .manga-nav-link, [data-lock-target]";

const SKIP_SHOOT_SEL = ".overload-trigger, .overload-blackout, .system-intro";

export function AgentCrosshair({ enabled }: Props) {
  const reduced = useReducedMotion();
  const [portalReady, setPortalReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const marksRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    group: THREE.Group;
    pos: { x: number; y: number };
    scale: number;
    locked: boolean;
    raf: number;
    wild?: gsap.core.Tween;
    overload?: boolean;
  } | null>(null);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!enabled || reduced) {
      document.body.classList.remove("agent-cursor-active");
      return;
    }
    document.body.classList.add("agent-cursor-active");

    const canvas = canvasRef.current;
    const marksHost = marksRef.current;
    if (!canvas || !marksHost) return;

    syncShotMarksLayer(marksHost);
    const onLayout = () => syncShotMarksLayer(marksHost);
    window.addEventListener("resize", onLayout);
    window.addEventListener("scroll", onLayout, { passive: true });
    const ro = new ResizeObserver(onLayout);
    ro.observe(document.documentElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      -window.innerHeight / 2,
      0.1,
      10,
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);

    const mat = new THREE.LineBasicMaterial({
      color: 0xff2430,
      transparent: true,
      opacity: 0.95,
    });
    const group = new THREE.Group();
    const s = 14;
    const g = 22;

    const h = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-g, 0, 0),
        new THREE.Vector3(-s, 0, 0),
        new THREE.Vector3(s, 0, 0),
        new THREE.Vector3(g, 0, 0),
      ]),
      mat,
    );
    const v = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -g, 0),
        new THREE.Vector3(0, -s, 0),
        new THREE.Vector3(0, s, 0),
        new THREE.Vector3(0, g, 0),
      ]),
      mat.clone(),
    );
    const ring = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        Array.from({ length: 32 }, (_, i) => {
          const a = (i / 32) * Math.PI * 2;
          return new THREE.Vector3(Math.cos(a) * 10, Math.sin(a) * 10, 0);
        }),
      ),
      new THREE.LineBasicMaterial({ color: 0xe11924, transparent: true, opacity: 0.5 }),
    );
    group.add(h, v, ring);
    scene.add(group);

    const pos = { x: 0, y: 0 };
    stateRef.current = {
      renderer,
      scene,
      camera,
      group,
      pos,
      scale: 1,
      locked: false,
      raf: 0,
      overload: false,
    };

    const onMove = (e: PointerEvent) => {
      const st = stateRef.current;
      if (!st) return;
      const x = e.clientX - window.innerWidth / 2;
      const y = -(e.clientY - window.innerHeight / 2);
      gsap.to(st.pos, {
        x,
        y,
        duration: st.locked ? 0.22 : 0.38,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const onShoot = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const st = stateRef.current;
      if (!st || st.overload) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest(SKIP_SHOOT_SEL)) return;

      e.preventDefault();
      window.getSelection()?.removeAllRanges();

      spawnBulletHole(marksHost, e.pageX, e.pageY);
      spawnGunfireBurst(e.clientX, e.clientY);
      playGunshot();

      const kickScale = st.locked ? 0.45 : 0.65;
      gsap.fromTo(
        st,
        { scale: kickScale },
        { scale: st.locked ? 0.55 : 1, duration: 0.18, ease: "power3.out", overwrite: true },
      );

      gsap.fromTo(
        group.scale,
        { x: 1.35, y: 1.35, z: 1 },
        { x: 1, y: 1, z: 1, duration: 0.14, ease: "power2.out" },
      );
    };

    const onOver = (e: Event) => {
      const st = stateRef.current;
      if (!st) return;
      st.locked = true;
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const x = r.left + r.width / 2 - window.innerWidth / 2;
      const y = -(r.top + r.height / 2 - window.innerHeight / 2);
      gsap.to(st.pos, { x, y, duration: 0.25, ease: "back.out(2)" });
      gsap.to(st, { scale: 0.55, duration: 0.2, ease: "power2.out" });
    };

    const onOut = () => {
      const st = stateRef.current;
      if (!st) return;
      st.locked = false;
      gsap.to(st, { scale: 1, duration: 0.28, ease: "power2.out" });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onShoot);
    const lockEls = () => document.querySelectorAll(LOCK_SEL);
    const bind = () => {
      lockEls().forEach((el) => {
        el.addEventListener("pointerenter", onOver);
        el.addEventListener("pointerleave", onOut);
      });
    };
    bind();
    const mo = new MutationObserver(() => {
      bind();
      syncShotMarksLayer(marksHost);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const resize = () => {
      camera.left = -window.innerWidth / 2;
      camera.right = window.innerWidth / 2;
      camera.top = window.innerHeight / 2;
      camera.bottom = -window.innerHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    };
    window.addEventListener("resize", resize);

    const tick = () => {
      const st = stateRef.current;
      if (!st) return;
      st.group.position.set(st.pos.x, st.pos.y, 0);
      st.group.scale.setScalar(st.scale);
      st.renderer.render(st.scene, st.camera);
      st.raf = requestAnimationFrame(tick);
    };
    tick();

    const onOverloadStart = () => {
      const st = stateRef.current;
      if (!st) return;
      st.overload = true;
      st.wild?.kill();
      st.wild = gsap.to(st.pos, {
        x: () => gsap.utils.random(-window.innerWidth * 0.42, window.innerWidth * 0.42),
        y: () => gsap.utils.random(-window.innerHeight * 0.42, window.innerHeight * 0.42),
        duration: 0.06,
        repeat: -1,
        ease: "none",
        overwrite: true,
      });
      gsap.to(st, {
        scale: () => gsap.utils.random(0.35, 1.6),
        duration: 0.08,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
    };
    const onOverloadEnd = () => {
      const st = stateRef.current;
      if (!st) return;
      st.overload = false;
      st.wild?.kill();
      st.wild = undefined;
      gsap.to(st, { scale: 1, duration: 0.2 });
    };
    window.addEventListener(OVERLOAD_START, onOverloadStart);
    window.addEventListener(OVERLOAD_END, onOverloadEnd);

    return () => {
      document.body.classList.remove("agent-cursor-active");
      const st = stateRef.current;
      window.removeEventListener(OVERLOAD_START, onOverloadStart);
      window.removeEventListener(OVERLOAD_END, onOverloadEnd);
      window.removeEventListener("resize", onLayout);
      window.removeEventListener("scroll", onLayout);
      ro.disconnect();
      if (!st) return;
      st.wild?.kill();
      cancelAnimationFrame(st.raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onShoot);
      window.removeEventListener("resize", resize);
      mo.disconnect();
      lockEls().forEach((el) => {
        el.removeEventListener("pointerenter", onOver);
        el.removeEventListener("pointerleave", onOut);
      });
      marksHost.innerHTML = "";
      h.geometry.dispose();
      v.geometry.dispose();
      ring.geometry.dispose();
      mat.dispose();
      renderer.dispose();
      stateRef.current = null;
    };
  }, [enabled, reduced]);

  if (!enabled || reduced || !portalReady) return null;

  return createPortal(
    <>
      <div ref={marksRef} className="agent-shot-marks" aria-hidden />
      <canvas ref={canvasRef} className="agent-crosshair" aria-hidden />
    </>,
    document.body,
  );
}
