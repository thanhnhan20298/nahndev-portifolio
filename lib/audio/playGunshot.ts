import { isSoundEnabled } from "./sound-settings";

/** Short gunshot — call after user pointerdown */
export function playGunshot() {
  if (typeof window === "undefined" || !isSoundEnabled()) return;
  try {
    const ctx = new AudioContext();
    const t0 = ctx.currentTime;

    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 900;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.22, t0);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.07);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(t0);
    noise.stop(t0 + 0.08);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(180, t0);
    osc.frequency.exponentialRampToValueAtTime(60, t0 + 0.05);
    gain.gain.setValueAtTime(0.12, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.09);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.1);

    setTimeout(() => void ctx.close(), 120);
  } catch {
    /* no audio */
  }
}
