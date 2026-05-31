"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/motion/gsap-register";
import { OVERLOAD_END, OVERLOAD_START } from "@/lib/effects/overload-events";
import { flowFragment, flowVertex } from "@/lib/three/radar-shaders";
import {
  archEdges,
  archNodes,
  radarMilestones,
} from "@/lib/content/architecture-radar";
import { cn } from "@/lib/utils/cn";
import { RadarTacticalHUD } from "./RadarTacticalHUD";

function polar(angle: number, radius: number, scale = 2.8) {
  return new THREE.Vector3(
    Math.cos(angle) * radius * scale,
    Math.sin(angle) * radius * scale * 0.72,
    0,
  );
}

type Props = {
  enabled?: boolean;
  className?: string;
  pinRef?: RefObject<HTMLElement | null>;
  onMilestone?: (text: string) => void;
};

export function RadarArchitecture({ enabled, className, pinRef, onMilestone }: Props) {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLParagraphElement>(null);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    uniforms: { uTime: { value: number }; uScan: { value: number }; uReveal: { value: number } };
    laser: THREE.Line;
    nodeMeshes: THREE.Mesh[];
    raf: number;
    st?: ScrollTrigger;
  } | null>(null);

  useEffect(() => {
    if (reduced || !hostRef.current || !enabled) return;

    registerGsapPlugins();
    const host = hostRef.current;
    const pinEl = pinRef?.current ?? host;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 0.1, 20);
    camera.position.z = 5;

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const key = new THREE.DirectionalLight(0xffe8e8, 0.9);
    key.position.set(2, 3, 4);
    scene.add(key);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uScan: { value: 0 },
      uReveal: { value: 0.42 },
    };

    const gridMat = new THREE.LineBasicMaterial({
      color: 0x6a1818,
      transparent: true,
      opacity: 0.58,
    });
    const grid = new THREE.Group();
    for (let r = 0.2; r <= 1; r += 0.2) {
      const pts: THREE.Vector3[] = [];
      for (let a = 0; a <= Math.PI * 2; a += 0.14) {
        pts.push(polar(a, r));
      }
      grid.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      grid.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), polar(a, 1)]),
          gridMat,
        ),
      );
    }
    scene.add(grid);

    const nodeMap = new Map(archNodes.map((n) => [n.id, polar(n.angle, n.radius)]));
    const edgePositions: number[] = [];
    const along: number[] = [];
    archEdges.forEach(([a, b]) => {
      const va = nodeMap.get(a);
      const vb = nodeMap.get(b);
      if (!va || !vb) return;
      edgePositions.push(va.x, va.y, va.z, vb.x, vb.y, vb.z);
      along.push(0, 1);
    });
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(edgePositions, 3));
    edgeGeo.setAttribute("aAlong", new THREE.Float32BufferAttribute(along, 1));
    const staticEdgeMat = new THREE.LineBasicMaterial({
      color: 0xcc2222,
      transparent: true,
      opacity: 0.42,
    });
    scene.add(new THREE.LineSegments(edgeGeo, staticEdgeMat));

    const flowMat = new THREE.ShaderMaterial({
      vertexShader: flowVertex,
      fragmentShader: flowFragment,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.LineSegments(edgeGeo, flowMat));

    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x1a0808,
      emissive: 0xe11924,
      emissiveIntensity: 0.95,
      metalness: 0.45,
      roughness: 0.35,
    });
    const nodeMeshes: THREE.Mesh[] = [];
    archNodes.forEach((n) => {
      if (n.radius === 0) return;
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.08), nodeMat.clone());
      m.position.copy(polar(n.angle, n.radius));
      m.scale.setScalar(0.55);
      scene.add(m);
      nodeMeshes.push(m);
    });

    const center = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.18, 0),
      new THREE.MeshStandardMaterial({
        color: 0x1a0808,
        emissive: 0xff2430,
        emissiveIntensity: 1.2,
      }),
    );
    scene.add(center);

    const laserGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-3.2, 0, 0.1),
      new THREE.Vector3(3.2, 0, 0.1),
    ]);
    const laser = new THREE.Line(
      laserGeo,
      new THREE.LineBasicMaterial({ color: 0xff2430, transparent: true, opacity: 0.95 }),
    );
    laser.rotation.z = -Math.PI / 2;
    scene.add(laser);

    stateRef.current = {
      renderer,
      scene,
      camera,
      uniforms,
      laser,
      nodeMeshes,
      raf: 0,
    };

    let resizeRaf = 0;
    const resize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        const aspect = w / h;
        const halfH = 3;
        camera.left = -halfH * aspect;
        camera.right = halfH * aspect;
        camera.top = halfH;
        camera.bottom = -halfH;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      });
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const applyProgress = (p: number) => {
      uniforms.uScan.value = p;
      uniforms.uReveal.value = 0.42 + Math.min(0.58, p * 0.95);
      laser.rotation.z = p * Math.PI * 2 - Math.PI / 2;
      const n = nodeMeshes.length;
      nodeMeshes.forEach((mesh, i) => {
        const t0 = (i / n) * 0.35;
        const t1 = t0 + 0.4;
        const s = THREE.MathUtils.smoothstep(p, t0, t1);
        mesh.scale.setScalar(0.45 + s * 0.55);
      });
    };

    applyProgress(0);
    if (hudRef.current) hudRef.current.textContent = radarMilestones[0]?.text ?? "SCAN INIT";

    let lastMilestone = 0;
    const st = ScrollTrigger.create({
      trigger: pinEl,
      start: "top top",
      end: "+=72vh",
      pin: pinEl,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        applyProgress(p);
        const idx = radarMilestones.findIndex((m) => p >= m.at);
        if (idx !== lastMilestone && idx >= 0) {
          lastMilestone = idx;
          const text = radarMilestones[idx].text;
          if (hudRef.current) hudRef.current.textContent = text;
          onMilestone?.(text);
        }
      },
    });
    stateRef.current.st = st;
    requestAnimationFrame(() => ScrollTrigger.refresh());

    let chaosTween: gsap.core.Tween | null = null;
    const onOverloadStart = () => {
      st.disable();
      chaosTween?.kill();
      chaosTween = gsap.to(
        {},
        {
          duration: 3,
          ease: "none",
          onUpdate: function () {
            laser.rotation.z = Math.random() * Math.PI * 2;
            uniforms.uReveal.value = 0.35 + Math.random() * 0.65;
          },
        },
      );
    };
    const onOverloadEnd = () => {
      chaosTween?.kill();
      chaosTween = null;
      st.enable();
    };
    window.addEventListener(OVERLOAD_START, onOverloadStart);
    window.addEventListener(OVERLOAD_END, onOverloadEnd);

    const tick = (t: number) => {
      const s = stateRef.current;
      if (!s) return;
      s.uniforms.uTime.value = t * 0.001;
      s.renderer.render(s.scene, s.camera);
      s.raf = requestAnimationFrame(tick);
    };
    tick(0);

    return () => {
      const s = stateRef.current;
      if (!s) return;
      cancelAnimationFrame(s.raf);
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener(OVERLOAD_START, onOverloadStart);
      window.removeEventListener(OVERLOAD_END, onOverloadEnd);
      chaosTween?.kill();
      s.st?.kill();
      ro.disconnect();
      edgeGeo.dispose();
      flowMat.dispose();
      staticEdgeMat.dispose();
      grid.traverse((o) => {
        if (o instanceof THREE.Line || o instanceof THREE.LineLoop) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
      nodeMeshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      center.geometry.dispose();
      (center.material as THREE.Material).dispose();
      laser.geometry.dispose();
      (laser.material as THREE.Material).dispose();
      s.renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
      stateRef.current = null;
    };
  }, [enabled, reduced, onMilestone, pinRef]);

  return (
    <div className={cn("radar-arch", className)}>
      <div className="radar-arch__viewport">
        <div ref={hostRef} className="radar-arch__canvas" />
        {enabled && !reduced ? <RadarTacticalHUD /> : null}
      </div>
      <p
        ref={hudRef}
        className="radar-arch__hud font-mono text-xs font-bold tracking-widest text-[var(--accent)]"
      >
        AWAITING SCROLL...
      </p>
    </div>
  );
}
