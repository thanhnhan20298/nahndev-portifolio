"use client";

import { useCallback, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/motion/gsap-register";
import { overloadCopy } from "@/lib/content/overload";
import { dispatchOverloadEnd, dispatchOverloadStart } from "@/lib/effects/overload-events";
import { OverloadDistortion } from "./OverloadDistortion";
import { OverloadMatrixRain } from "./OverloadMatrixRain";
type Phase = "idle" | "chaos" | "blackout";

type Props = {
  enabled?: boolean;
  contentRoot?: RefObject<HTMLElement | null>;
};

const CHAOS_MS = 3000;
const SCRAMBLE_CHARS = "01アイウエオ█▓░<>{}[]|/\\";

function scrambleEl(el: HTMLElement) {
  const raw = el.dataset.overloadRaw ?? el.textContent ?? "";
  if (!el.dataset.overloadRaw) el.dataset.overloadRaw = raw;
  if (!raw.trim()) return;
  el.textContent = raw
    .split("")
    .map((c) => (c.trim() ? SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] : c))
    .join("");
}

export function SystemOverload({ enabled, contentRoot }: Props) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [distort, setDistort] = useState(0);
  const busyRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const laserHostRef = useRef<HTMLDivElement>(null);
  const scrambleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanupChaos = useCallback(() => {
    tlRef.current?.kill();
    tlRef.current = null;
    if (scrambleTimerRef.current) {
      clearInterval(scrambleTimerRef.current);
      scrambleTimerRef.current = null;
    }
    document.body.classList.remove("system-overload-active");
    document.documentElement.style.overflow = "";
    ScrollTrigger.getAll().forEach((st) => st.enable());
    dispatchOverloadEnd();
  }, []);

  const reboot = useCallback(() => {
    cleanupChaos();
    setPhase("idle");
    setDistort(0);
    busyRef.current = false;
    window.location.reload();
  }, [cleanupChaos]);

  const trigger = useCallback(() => {
    if (!enabled || busyRef.current || reduced) return;
    busyRef.current = true;
    registerGsapPlugins();
    setPhase("chaos");
    setDistort(0.35);
    document.body.classList.add("system-overload-active");
    document.documentElement.style.overflow = "hidden";
    ScrollTrigger.getAll().forEach((st) => st.disable());
    dispatchOverloadStart();

    const root = contentRoot?.current ?? document.querySelector(".manga-page__content");
    const textTargets = root
      ? Array.from(
          root.querySelectorAll<HTMLElement>(
            "h1,h2,h3,h4,p,.font-display,.font-label,li,.manga-nav-link,footer p,.ink-border-thin span",
          ),
        ).filter((el) => el.offsetParent !== null && (el.textContent?.trim().length ?? 0) > 0)
      : [];

    const fallTargets = root
      ? Array.from(root.querySelectorAll<HTMLElement>("h1,h2,h3,.manga-title-stroke,.font-display"))
      : [];

    scrambleTimerRef.current = setInterval(() => {
      textTargets.slice(0, 48).forEach(scrambleEl);
    }, 90);

    gsap.set(fallTargets, { transformOrigin: "50% 50%" });
    gsap.to(fallTargets, {
      y: () => gsap.utils.random(60, 220),
      rotation: () => gsap.utils.random(-22, 22),
      opacity: () => gsap.utils.random(0.08, 0.5),
      duration: () => gsap.utils.random(0.35, 1.1),
      ease: "power2.in",
      stagger: { each: 0.03, from: "random" },
    });

    gsap.to(textTargets, {
      color: "#ff2430",
      textShadow: "0 0 8px rgba(255,36,48,0.8)",
      duration: 0.15,
      stagger: 0.008,
    });

    const lasers = laserHostRef.current;
    if (lasers) {
      for (let i = 0; i < 8; i++) {
        const line = document.createElement("div");
        line.className = "overload-laser";
        lasers.appendChild(line);
        gsap.set(line, {
          left: `${gsap.utils.random(0, 100)}%`,
          top: `${gsap.utils.random(0, 100)}%`,
          rotation: gsap.utils.random(-90, 90),
          scaleX: gsap.utils.random(0.4, 1.2),
        });
        gsap.to(line, {
          rotation: `+=${gsap.utils.random(-180, 180)}`,
          x: gsap.utils.random(-120, 120),
          y: gsap.utils.random(-80, 80),
          duration: gsap.utils.random(0.08, 0.22),
          repeat: 28,
          yoyo: true,
          ease: "none",
        });
      }
    }

    const flash = flashRef.current;
    tlRef.current = gsap.timeline();
    if (flash) {
      tlRef.current.to(flash, {
        opacity: 0.75,
        duration: 0.06,
        repeat: 24,
        yoyo: true,
        ease: "steps(1)",
      });
    }
    tlRef.current.to(
      {},
      {
        duration: CHAOS_MS / 1000,
        onUpdate: function () {
          setDistort(0.35 + this.progress() * 0.65);
        },
        onComplete: () => {
          cleanupChaos();
          setPhase("blackout");
          setDistort(0);
          if (lasers) lasers.innerHTML = "";
        },
      },
      0,
    );
  }, [enabled, reduced, contentRoot, cleanupChaos]);

  if (!enabled || reduced) return null;

  return (
    <>
      {phase === "idle" && (
        <button
          type="button"
          className="overload-trigger font-mono"
          onClick={trigger}
          aria-label={overloadCopy.buttonAlt}
        >
          <span className="overload-trigger__main">{overloadCopy.button}</span>
          <span className="overload-trigger__sub">{overloadCopy.buttonAlt}</span>
        </button>
      )}

      {(phase === "chaos" || phase === "blackout") && (
        <div className="overload-stack" aria-live="assertive">
          {phase === "chaos" && (
            <>
              <OverloadDistortion active intensity={distort} />
              <OverloadMatrixRain active />
              <div ref={flashRef} className="overload-flash" />
              <div ref={laserHostRef} className="overload-lasers" aria-hidden />
              <p className="overload-warning font-mono">{overloadCopy.warning}</p>
            </>
          )}
          {phase === "blackout" && (
            <button
              type="button"
              className="overload-blackout"
              onClick={reboot}
            >
              <span className="overload-blackout__text font-mono">{overloadCopy.blackout}</span>
            </button>
          )}
        </div>
      )}
    </>
  );
}
