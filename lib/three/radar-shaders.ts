export const flowVertex = /* glsl */ `
  attribute float aAlong;
  varying float vAlong;
  void main() {
    vAlong = aAlong;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const flowFragment = /* glsl */ `
  uniform float uTime;
  uniform float uScan;
  uniform float uReveal;
  varying float vAlong;

  void main() {
    float pulse = sin(vAlong * 28.0 - uTime * 4.0) * 0.5 + 0.5;
    float scanBand = smoothstep(uScan - 0.08, uScan, vAlong)
      * (1.0 - smoothstep(uScan, uScan + 0.06, vAlong));
    float reveal = max(uReveal, 0.38);
    float base = mix(0.22, 0.62, pulse) * reveal;
    float hot = scanBand * 1.2;
    vec3 col = mix(vec3(0.04, 0.0, 0.0), vec3(0.95, 0.08, 0.06), base + hot);
    float alpha = clamp(base + hot * 0.9, 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
  }
`;
