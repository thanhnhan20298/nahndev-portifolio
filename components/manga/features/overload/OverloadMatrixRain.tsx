"use client";

import { useEffect, useRef } from "react";

const CHARS = "アイウエオカキクケコ012389ABCDEF<>{}[]|/\\";

type Props = { active: boolean };

export function OverloadMatrixRain({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols: number[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columnCount = Math.floor(canvas.width / 14);
      cols = Array.from({ length: columnCount }, () => Math.random() * canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "12px monospace";
      for (let i = 0; i < cols.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * 14;
        const y = cols[i];
        const g = 80 + Math.floor(Math.random() * 120);
        ctx.fillStyle = `rgb(${g + 140}, ${g * 0.1}, ${g * 0.15})`;
        ctx.fillText(ch, x, y);
        if (y > canvas.height + 20) cols[i] = Math.random() * -80;
        cols[i] += 10 + Math.random() * 18;
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;

  return <canvas ref={canvasRef} className="overload-matrix" aria-hidden />;
}
