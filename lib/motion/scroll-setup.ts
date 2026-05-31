import { gsap, registerGsapPlugins, ScrollTrigger } from "./gsap-register";

export function setupMangaScrollEffects(root: HTMLElement) {
  registerGsapPlugins();

  const progressBar = root.querySelector<HTMLElement>("[data-scroll-progress-fill]");
  if (progressBar) {
    gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" });
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(progressBar, { scaleX: self.progress }),
    });
  }

  const hero = root.querySelector("[data-hero-scene]");
  if (hero) {
    gsap.to("[data-hero-layer='speedlines']", {
      opacity: 0.25,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
    });
    gsap.to("[data-hero-layer='agent-3d']", {
      yPercent: -6,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1.1 },
    });
    gsap.to("[data-hero-layer='impact']", {
      opacity: 0.5,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1.2 },
    });
  }

  const story = root.querySelector(".manga-story-block");
  if (story) {
    gsap.from(story, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: { trigger: story, start: "top 88%", once: true },
    });
  }

  gsap.utils.toArray<HTMLElement>(".manga-chapter-band").forEach((band) => {
    const inner = band.querySelector("[data-chapter-inner]");
    const flash = band.querySelector(".chapter-impact-flash");

    if (inner) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: band, start: "top 85%", once: true },
      });
      tl.from(inner, {
        y: 28,
        opacity: 0,
        duration: 0.45,
        ease: "power3.out",
        clearProps: "all",
      });
      if (flash) {
        tl.fromTo(
          flash,
          { opacity: 0.45 },
          { opacity: 0, duration: 0.4, ease: "power2.out", clearProps: "opacity" },
          0,
        );
      }
    }

    const speedlines = band.querySelector(".gsap-speedline-layer");
    if (speedlines) {
      gsap.to(speedlines, {
        opacity: 0.55,
        ease: "none",
        scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: 1.4 },
      });
    }
  });

  gsap.utils.toArray<HTMLElement>(".manga-scroll-section").forEach((section) => {
    const head = section.querySelector(".manga-section-head");
    if (head) {
      gsap.from(head, {
        y: 32,
        opacity: 0,
        duration: 0.55,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });
    }

    const panels = section.querySelectorAll(".gsap-panel-item");
    if (panels.length) {
      gsap.from(panels, {
        y: 28,
        opacity: 0,
        duration: 0.4,
        stagger: 0.09,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });
    }
  });

  const showcase = root.querySelector("[data-showcase-scene]");
  if (showcase) {
    gsap.from("[data-showcase-panel]", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: { trigger: showcase, start: "top 78%", once: true },
    });
  }

  const footer = root.querySelector(".manga-page-footer");
  if (footer) {
    gsap.from(footer, {
      opacity: 0,
      y: 16,
      duration: 0.45,
      clearProps: "all",
      scrollTrigger: { trigger: footer, start: "top 92%", once: true },
    });
  }

  ScrollTrigger.refresh();
}
