import * as THREE from "three";
import type { gsap } from "@/lib/motion/gsap-register";
import { addEmissiveEdges, buildTacticalLaptop, sampleMeshParticles } from "./tactical-laptop";

function particleCount() {
  if (typeof window === "undefined") return 3200;
  return window.matchMedia("(max-width: 768px)").matches ? 1400 : 3800;
}

export type HeroLaptopScene = {
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
};

export function mountHeroLaptopScene(host: HTMLElement): {
  state: HeroLaptopScene;
  dispose: () => void;
} {
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
  const state: HeroLaptopScene = {
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
    state.group.rotation.x = state.rot.x;
    state.group.rotation.y = state.rot.y;
    state.edges.rotation.copy(state.group.rotation);
    state.renderer.render(state.scene, state.camera);
    state.raf = requestAnimationFrame(tick);
  };
  tick();

  const dispose = () => {
    cancelAnimationFrame(state.raf);
    state.asm?.kill();
    state.shake?.kill();
    ro.disconnect();
    pGeo.dispose();
    pMat.dispose();
    state.group.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
        else o.material.dispose();
      }
    });
    state.edges.geometry.dispose();
    (state.edges.material as THREE.Material).dispose();
    state.renderer.dispose();
    if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
  };

  return { state, dispose };
}
