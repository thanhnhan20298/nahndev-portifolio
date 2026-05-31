export const overloadVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const overloadFrag = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime;
    float i = uIntensity;

    float wave = sin(uv.y * 80.0 + t * 14.0) * 0.002 * i;
    float tear = step(0.92, noise(vec2(uv.y * 6.0, t * 3.0))) * 0.04 * i;
    vec2 off = vec2(wave + tear, sin(t * 9.0 + uv.x * 40.0) * 0.0015 * i);

    float n = noise(uv * vec2(900.0, 120.0) + t * 8.0);
    float scan = sin((uv.y + t * 0.35) * 220.0) * 0.5 + 0.5;

    vec3 red = vec3(0.95, 0.05, 0.04);
    vec3 flash = red * (0.35 + n * 0.65) * scan;

    float vign = smoothstep(0.85, 0.2, length(uv - 0.5));
    float alpha = (0.12 + n * 0.55 + scan * 0.25) * i * vign;

    gl_FragColor = vec4(flash, alpha);
  }
`;
