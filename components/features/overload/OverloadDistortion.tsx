"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { overloadFrag, overloadVert } from "@/lib/three/overload-shaders";

type Props = { active: boolean; intensity?: number };

export function OverloadDistortion({ active, intensity = 1 }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    uniforms: { uTime: { value: number }; uIntensity: { value: number } };
    raf: number;
  } | null>(null);

  useEffect(() => {
    if (!active || !hostRef.current) return;

    const host = hostRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uIntensity: { value: intensity },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: overloadVert,
      fragmentShader: overloadFrag,
      uniforms,
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    stateRef.current = { renderer, uniforms, raf: 0 };

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = (t: number) => {
      const s = stateRef.current;
      if (!s) return;
      s.uniforms.uTime.value = t * 0.001;
      s.uniforms.uIntensity.value = intensity;
      s.renderer.render(scene, camera);
      s.raf = requestAnimationFrame(tick);
    };
    tick(0);

    return () => {
      const s = stateRef.current;
      if (!s) return;
      cancelAnimationFrame(s.raf);
      window.removeEventListener("resize", resize);
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
      stateRef.current = null;
    };
  }, [active, intensity]);

  if (!active) return null;

  return <div ref={hostRef} className="overload-distortion" aria-hidden />;
}
