"use client";

import { useEffect } from "react";

// Page-wide effects: sections fade in on scroll, and a faint binary rain sits
// behind everything. Both are skipped for people who prefer reduced motion.
export default function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    document.documentElement.classList.add("js");

    const sections = [...document.querySelectorAll("main section:not(#home)")];
    let io = null;
    if (reduce) {
      sections.forEach((s) => s.classList.add("rv", "in"));
    } else {
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.08 }
      );
      sections.forEach((s) => {
        s.classList.add("rv");
        io.observe(s);
      });
    }

    let raf = 0;
    let canvas = null;
    let onResize = null;
    if (!reduce) {
      canvas = document.createElement("canvas");
      canvas.id = "bg";
      document.body.prepend(canvas);
      const x = canvas.getContext("2d");
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const S = 20;
      let W, H, N, Y;
      onResize = () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + "px";
        canvas.style.height = H + "px";
        x.setTransform(dpr, 0, 0, dpr, 0, 0);
        N = Math.ceil(W / S);
        Y = Array.from({ length: N }, () => (Math.random() * H) / S);
        x.fillStyle = "#0d1117";
        x.fillRect(0, 0, W, H);
      };
      onResize();
      window.addEventListener("resize", onResize);
      let last = 0;
      const frame = (t) => {
        raf = requestAnimationFrame(frame);
        if (t - last < 70) return;
        last = t;
        x.fillStyle = "rgba(13,17,23,.09)";
        x.fillRect(0, 0, W, H);
        x.font = '14px "JetBrains Mono",monospace';
        for (let i = 0; i < N; i++) {
          if (Math.random() < 0.3) continue;
          x.fillStyle = Math.random() < 0.04 ? "rgba(124,196,255,.7)" : "rgba(124,196,255,.55)";
          x.fillText(Math.random() < 0.5 ? "0" : "1", i * S, Y[i] * S);
          if (Y[i] * S > H && Math.random() > 0.97) Y[i] = 0;
          Y[i] += 1;
        }
      };
      raf = requestAnimationFrame(frame);
    }

    return () => {
      if (io) io.disconnect();
      cancelAnimationFrame(raf);
      if (onResize) window.removeEventListener("resize", onResize);
      if (canvas) canvas.remove();
    };
  }, []);

  return null;
}
