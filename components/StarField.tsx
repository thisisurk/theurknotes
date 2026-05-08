"use client";

import { useEffect, useRef } from "react";

// Phase C/4.6 — port of v6 mockup StarField.
// 180 ambient stars (gold + slate, twinkling) + 4 parallax conceptual nodes
// (geo / radar / mesh) + occasional shooting stars. Throttled to ~30fps.
// Honors prefers-reduced-motion: renders 1 static frame, no RAF loop.

type NodeShape = {
  type: "geo" | "radar" | "mesh";
  x: number;
  y: number;
  r: number;
  sides?: number;
  depth: number;
  color: string;
  speed: number;
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  trail: { x: number; y: number }[];
};

export function StarField({ intensity = 70 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let scrollY = 0;
    let raf = 0;
    let frame = 0;
    let t = 0;

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.1 + 0.2,
      twinkle: Math.random() > 0.4,
      phase: Math.random() * Math.PI * 2,
      freq: Math.random() * 0.04 + 0.01,
      gold: Math.random() > 0.9,
      base: 0.15 + Math.random() * 0.5,
    }));

    const nodes: NodeShape[] = [
      { type: "geo", x: 0.18, y: 1100, r: 50, sides: 6, depth: 0.25, color: "#D4A853", speed: 0.005 },
      { type: "radar", x: 0.8, y: 2400, r: 70, depth: 0.15, color: "#60A5FA", speed: 0.008 },
      { type: "mesh", x: 0.25, y: 3800, r: 60, depth: 0.2, color: "#4ADE80", speed: 0.004 },
      { type: "geo", x: 0.75, y: 4500, r: 40, sides: 3, depth: 0.35, color: "#D4A853", speed: 0.012 },
    ];

    const shooters: Shooter[] = [];

    const drawPoly = (cx: number, cy: number, r: number, sides: number, rot: number) => {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const a = ((Math.PI * 2) / sides) * i + rot;
        ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      }
      ctx.closePath();
    };

    const drawStaticFallback = () => {
      const W = canvas.width;
      const H = canvas.height;
      const alpha = intensity / 100;
      ctx.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        ctx.fillStyle = s.gold
          ? `rgba(212,168,83,${s.base * alpha})`
          : `rgba(148,163,184,${s.base * alpha})`;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      // Throttle to ~30fps — skip every other animation frame
      if (++frame % 2 !== 0) return;

      const alpha = intensity / 100;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // 1. Architect's grid (parallax)
      const gridSize = 120;
      const gridOff = (scrollY * 0.03) % gridSize;
      ctx.strokeStyle = `rgba(30,45,74,${0.12 * alpha})`;
      ctx.lineWidth = 1;
      for (let x = 0; x <= W + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = -gridSize; y <= H + gridSize; y += gridSize) {
        const gy = y - gridOff;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }

      // 2. Stars (twinkling + slow scroll)
      const starShift = (scrollY * 0.08) % H;
      stars.forEach((s) => {
        const py = (((s.y * H - starShift) % H) + H) % H;
        let a = s.base * alpha;
        if (s.twinkle) a *= 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.freq + s.phase));
        ctx.fillStyle = s.gold ? `rgba(212,168,83,${a})` : `rgba(148,163,184,${a})`;
        ctx.beginPath();
        ctx.arc(s.x * W, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Conceptual parallax nodes
      nodes.forEach((n) => {
        const py = (n.y - scrollY) * n.depth + H * 0.5;
        if (py < -200 || py > H + 200) return;
        const px = n.x * W;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(t * n.speed);

        if (n.type === "geo" && n.sides) {
          ctx.strokeStyle = n.color + "33";
          ctx.lineWidth = 1;
          drawPoly(0, 0, n.r, n.sides, 0);
          ctx.stroke();
          ctx.fillStyle = n.color + "0A";
          drawPoly(0, 0, n.r * 0.4, n.sides, t * 0.02);
          ctx.fill();
          ctx.strokeStyle = n.color + "66";
          drawPoly(0, 0, n.r * 0.4, n.sides, t * 0.02);
          ctx.stroke();
        } else if (n.type === "radar") {
          for (let i = 1; i <= 3; i++) {
            const aa = Math.round(0.1 * i * 255)
              .toString(16)
              .padStart(2, "0");
            ctx.strokeStyle = n.color + aa;
            ctx.beginPath();
            ctx.arc(0, 0, n.r * (i / 3), 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.strokeStyle = n.color + "44";
          ctx.beginPath();
          ctx.moveTo(0, -n.r);
          ctx.lineTo(0, n.r);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-n.r, 0);
          ctx.lineTo(n.r, 0);
          ctx.stroke();
        } else if (n.type === "mesh") {
          ctx.strokeStyle = n.color + "22";
          for (let i = 0; i < 4; i++) {
            const a = (Math.PI / 2) * i;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(a) * n.r, Math.sin(a) * n.r);
            ctx.stroke();
          }
          drawPoly(0, 0, n.r * 0.7, 4, Math.PI / 4);
          ctx.stroke();
        }

        ctx.rotate(-t * n.speed);
        ctx.font = '500 8px "JetBrains Mono"';
        ctx.fillStyle = n.color + "44";
        ctx.fillText(`SYS_NODE_${String(n.x).slice(2, 5)}`, n.r + 10, 0);
        ctx.fillText(`X:${Math.round(px)} Y:${Math.round(py + scrollY)}`, n.r + 10, 12);

        ctx.restore();
      });

      // 4. Shooting stars (rare)
      if (Math.random() < 0.0035 * alpha && shooters.length < 2) {
        shooters.push({
          x: Math.random() * W * 0.6 + W * 0.2,
          y: Math.random() * H * 0.4,
          vx: -(2.5 + Math.random() * 2.5),
          vy: 2.5 + Math.random() * 2.5,
          life: 1,
          trail: [],
        });
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 14) s.trail.shift();
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.009;
        if (s.life <= 0 || s.x < -50 || s.y > H + 50) {
          shooters.splice(i, 1);
          continue;
        }
        s.trail.forEach((p, idx) => {
          const ta = (idx / s.trail.length) * s.life;
          ctx.fillStyle = `rgba(212,168,83,${ta * 0.55})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2 * ta, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.fillStyle = `rgba(232,236,244,${s.life})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6);
        hg.addColorStop(0, `rgba(212,168,83,${s.life * 0.5})`);
        hg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      t++;
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      drawStaticFallback();
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [intensity]);

  return <canvas ref={canvasRef} aria-hidden="true" className="ck-starfield" />;
}
