import { gsap } from "@/lib/motion/gsap-register";

/** Stay on page then fade out (ms) */
export const BULLET_HOLE_LIFETIME_MS = 9_000;
const BULLET_HOLE_FADE_MS = 1.4;
const MAX_HOLES = 28;

export function syncShotMarksLayer(host: HTMLElement) {
  const h = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
    window.innerHeight,
  );
  host.style.width = "100%";
  host.style.height = `${h}px`;
}

/** Bullet marks fixed to page (not viewport on scroll) */
export function spawnBulletHole(host: HTMLElement, pageX: number, pageY: number) {
  const hole = document.createElement("div");
  hole.className = "agent-bullet-hole";
  hole.style.left = `${pageX}px`;
  hole.style.top = `${pageY}px`;
  hole.style.setProperty("--bh-rot", `${gsap.utils.random(-12, 12)}deg`);

  const core = document.createElement("span");
  core.className = "agent-bullet-hole__core";
  hole.appendChild(core);

  const crackCount = 6 + Math.floor(Math.random() * 3);
  for (let i = 0; i < crackCount; i++) {
    const crack = document.createElement("span");
    crack.className = "agent-bullet-hole__crack";
    crack.style.setProperty("--crack-a", `${gsap.utils.random(0, 360)}deg`);
    crack.style.setProperty("--crack-l", `${gsap.utils.random(14, 24)}px`);
    hole.appendChild(crack);
  }

  host.appendChild(hole);

  while (host.children.length > MAX_HOLES) {
    const oldest = host.firstChild;
    if (oldest instanceof HTMLElement) gsap.killTweensOf(oldest);
    oldest?.remove();
  }

  const holdSec = BULLET_HOLE_LIFETIME_MS / 1000;
  const fadeSec = BULLET_HOLE_FADE_MS / 1000;

  gsap
    .timeline()
    .fromTo(
      hole,
      { scale: 0.4, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.05, ease: "power3.out" },
    )
    .fromTo(core, { scale: 1.8 }, { scale: 1, duration: 0.08, ease: "power2.out" }, 0)
    .to(hole, { opacity: 0.92, duration: 0.04 }, 0.06)
    .to(hole, { opacity: 0, duration: fadeSec, ease: "power1.in", delay: holdSec })
    .call(() => hole.remove());
}

/** Muzzle flash — viewport-fixed at aim center on fire */
export function spawnGunfireBurst(clientX: number, clientY: number) {
  const burst = document.createElement("div");
  burst.className = "agent-gunfire-burst";
  burst.style.left = `${clientX}px`;
  burst.style.top = `${clientY}px`;

  const tracerAngle = gsap.utils.random(-18, 18);
  burst.innerHTML = `
    <div class="agent-gunfire-burst__bloom" aria-hidden></div>
    <div class="agent-gunfire-burst__core" aria-hidden></div>
    <div class="agent-gunfire-burst__hot" aria-hidden></div>
    <div class="agent-gunfire-burst__tracer" style="--tracer-deg:${tracerAngle}deg" aria-hidden></div>
    <div class="agent-gunfire-burst__smoke" aria-hidden></div>
  `;

  const sparkHost = document.createElement("div");
  sparkHost.className = "agent-gunfire-burst__sparks";
  burst.appendChild(sparkHost);

  for (let i = 0; i < 14; i++) {
    const spark = document.createElement("span");
    spark.className = "agent-gunfire-spark";
    const angle = (i / 14) * Math.PI * 2 + gsap.utils.random(-0.4, 0.4);
    const len = gsap.utils.random(28, 72);
    sparkHost.appendChild(spark);
    gsap.fromTo(
      spark,
      { x: 0, y: 0, scale: gsap.utils.random(0.8, 1.4), opacity: 1 },
      {
        x: Math.cos(angle) * len,
        y: Math.sin(angle) * len,
        scale: 0,
        opacity: 0,
        duration: gsap.utils.random(0.12, 0.28),
        ease: "power2.out",
      },
    );
  }

  document.body.appendChild(burst);

  const core = burst.querySelector(".agent-gunfire-burst__core");
  const bloom = burst.querySelector(".agent-gunfire-burst__bloom");
  const hot = burst.querySelector(".agent-gunfire-burst__hot");
  const tracer = burst.querySelector(".agent-gunfire-burst__tracer");

  gsap.fromTo(
    core,
    { scale: 0.2, opacity: 1 },
    { scale: 2.2, opacity: 0, duration: 0.14, ease: "power2.out" },
  );
  gsap.fromTo(
    bloom,
    { scale: 0.4, opacity: 1 },
    { scale: 2.8, opacity: 0, duration: 0.22, ease: "power2.out" },
  );
  gsap.fromTo(
    hot,
    { scaleX: 0.1, opacity: 1 },
    { scaleX: 1.6, opacity: 0, duration: 0.1, ease: "power1.out" },
  );
  gsap.fromTo(
    tracer,
    { scaleX: 0, opacity: 1 },
    { scaleX: 1, opacity: 0, duration: 0.16, ease: "power2.in" },
  );
  gsap.fromTo(
    burst.querySelector(".agent-gunfire-burst__smoke"),
    { scale: 0.5, opacity: 0.5 },
    { scale: 1.8, opacity: 0, duration: 0.35, ease: "power1.out", delay: 0.04 },
  );

  gsap.delayedCall(0.38, () => burst.remove());
}
