import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

const BODY = new THREE.MeshStandardMaterial({
  color: 0x0c0c0c,
  metalness: 0.72,
  roughness: 0.38,
  emissive: 0x2a0000,
  emissiveIntensity: 0.22,
});

/** Angular tactical laptop — main hero mesh */
export function buildTacticalLaptop(): THREE.Group {
  const root = new THREE.Group();

  const base = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.14, 1.75), BODY);
  base.position.y = -0.08;
  root.add(base);

  const deck = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.06, 1.45), BODY);
  deck.position.set(0, 0.02, 0.05);
  root.add(deck);

  const screen = new THREE.Mesh(new THREE.BoxGeometry(2.15, 1.25, 0.07), BODY);
  screen.position.set(0, 0.72, -0.42);
  screen.rotation.x = -0.42;
  root.add(screen);

  const bezel = new THREE.Mesh(new THREE.BoxGeometry(2.28, 0.08, 0.05), BODY);
  bezel.position.set(0, 0.08, -0.38);
  bezel.rotation.x = -0.42;
  root.add(bezel);

  const hinge = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.05, 0.12), BODY);
  hinge.position.set(0, 0.12, -0.22);
  root.add(hinge);

  const railL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 1.6), BODY);
  railL.position.set(-1.28, 0.05, 0);
  root.add(railL);

  const railR = railL.clone();
  railR.position.x = 1.28;
  root.add(railR);

  const antenna = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.55, 0.04), BODY);
  antenna.position.set(1.05, 0.35, 0.72);
  root.add(antenna);

  const port = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.12), BODY);
  port.position.set(-1.1, -0.02, 0.75);
  root.add(port);

  root.scale.setScalar(0.95);
  return root;
}

export function addEmissiveEdges(
  root: THREE.Object3D,
  color = 0xe11924,
  threshold = 12,
): THREE.LineSegments {
  const geos: THREE.BufferGeometry[] = [];
  root.updateMatrixWorld(true);
  root.traverse((obj) => {
    if (obj instanceof THREE.Mesh && obj.geometry) {
      const g = obj.geometry.clone();
      g.applyMatrix4(obj.matrixWorld);
      geos.push(g);
    }
  });
  const merged = mergeGeometries(geos, true);
  const edges = new THREE.EdgesGeometry(merged, threshold);
  const lines = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.95,
      toneMapped: false,
    }),
  );
  merged?.dispose();
  return lines;
}

export function sampleMeshParticles(
  root: THREE.Object3D,
  count: number,
): { positions: Float32Array; random: Float32Array } {
  const geos: THREE.BufferGeometry[] = [];
  root.updateMatrixWorld(true);
  root.traverse((obj) => {
    if (obj instanceof THREE.Mesh && obj.geometry) {
      const g = obj.geometry.clone();
      g.applyMatrix4(obj.matrixWorld);
      geos.push(g);
    }
  });
  const merged = mergeGeometries(geos, true) ?? new THREE.BoxGeometry(1, 1, 1);
  const mesh = new THREE.Mesh(merged);
  const sampler = new MeshSurfaceSampler(mesh).build();
  const positions = new Float32Array(count * 3);
  const random = new Float32Array(count * 3);
  const temp = new THREE.Vector3();
  const spread = 3.2;

  for (let i = 0; i < count; i++) {
    sampler.sample(temp);
    positions[i * 3] = temp.x;
    positions[i * 3 + 1] = temp.y;
    positions[i * 3 + 2] = temp.z;
    random[i * 3] = temp.x + (Math.random() - 0.5) * spread;
    random[i * 3 + 1] = temp.y + (Math.random() - 0.5) * spread;
    random[i * 3 + 2] = temp.z + (Math.random() - 0.5) * spread;
  }

  merged.dispose();
  return { positions, random };
}
