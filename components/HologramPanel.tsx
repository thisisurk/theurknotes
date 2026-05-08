"use client";

import { useEffect, useRef, useState } from "react";

// Phase C/4.6 — Hologram panel for the Home About section.
// Canvas placeholder (decorative wireframe + nodes) renders while the video
// loads. On `loadedmetadata`, the video fades in and the canvas unmounts so
// only one paint loop runs at a time. IntersectionObserver triggers play when
// 40% visible. prefers-reduced-motion: skip the canvas entirely (static panel).

export function HologramPanel({ videoSrc }: { videoSrc: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          const v = videoRef.current;
          if (v && v.readyState >= 2) {
            v.currentTime = 0;
            v.play().catch(() => {});
            setPlayed(true);
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [played]);

  return (
    <div ref={wrapRef} className="ck-hologram-wrap">
      {!loaded && <HologramPlaceholder />}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        className="ck-hologram-video"
        data-loaded={loaded ? "true" : "false"}
        onLoadedMetadata={() => {
          const v = videoRef.current;
          if (v) {
            v.pause();
            v.currentTime = 0;
            setLoaded(true);
          }
        }}
        aria-label="Ronin transition reel"
      />
      <div className="ck-hologram-pill" data-loaded={loaded ? "true" : "false"}>
        <span className="dot" aria-hidden="true" />
        {loaded ? "SYSTEM ACTIVE" : "AWAITING ASSET"}
      </div>
      {loaded && (
        <button
          type="button"
          className="ck-hologram-replay"
          onClick={() => {
            const v = videoRef.current;
            if (v) {
              v.currentTime = 0;
              v.play().catch(() => {});
            }
          }}
        >
          ↺ REPLAY
        </button>
      )}
    </div>
  );
}

// Decorative canvas — only on screen until video is ready (~1-2s typically).
function HologramPlaceholder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let frame = 0;
    let t = 0;

    const setSize = () => {
      canvas.width = canvas.offsetWidth || 370;
      canvas.height = canvas.offsetHeight || 480;
    };

    const nodes = Array.from({ length: 14 }, (_, i) => ({
      x: 0.12 + Math.random() * 0.76,
      y: 0.06 + Math.random() * 0.88,
      r: 1.8 + Math.random() * 2.4,
      phase: (i / 14) * Math.PI * 2 + Math.random() * 0.5,
      freq: 0.007 + Math.random() * 0.018,
      gold: Math.random() > 0.52,
      hex: Math.random() > 0.65,
    }));

    const drawHex = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        if (i === 0) ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        else ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      }
      ctx.closePath();
    };

    const drawFrame = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const gs = 30;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(212,168,83,0.055)";
      for (let x = gs / 2; x < W; x += gs) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = gs / 2; y < H; y += gs) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      const cx = W * 0.5;
      const cy = H * 0.4;
      const hexR = H * 0.22;
      const hexAlpha = 0.1 + 0.04 * Math.sin(t * 0.014);
      ctx.strokeStyle = `rgba(212,168,83,${hexAlpha})`;
      ctx.lineWidth = 1;
      drawHex(cx, cy, hexR);
      ctx.stroke();
      ctx.strokeStyle = `rgba(96,165,250,${hexAlpha * 0.55})`;
      ctx.lineWidth = 0.5;
      drawHex(cx, cy, hexR * 1.22);
      ctx.stroke();

      const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, H * 0.36);
      rg.addColorStop(0, "rgba(212,168,83,0.10)");
      rg.addColorStop(0.38, "rgba(96,165,250,0.05)");
      rg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, W, H);

      nodes.forEach((n) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * n.freq + n.phase);
        const nx = n.x * W;
        const ny = n.y * H;
        const col = n.gold
          ? `rgba(212,168,83,${0.32 + 0.42 * pulse})`
          : `rgba(96,165,250,${0.28 + 0.42 * pulse})`;
        ctx.strokeStyle = n.gold
          ? `rgba(212,168,83,${0.07 * pulse})`
          : `rgba(96,165,250,${0.06 * pulse})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.fillStyle = col;
        if (n.hex) {
          drawHex(nx, ny, n.r * (0.9 + 0.15 * pulse));
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(nx, ny, n.r * (0.85 + 0.2 * pulse), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.font = '500 8px "JetBrains Mono", monospace';
      ctx.fillStyle = `rgba(212,168,83,${0.22 + 0.1 * Math.sin(t * 0.035)})`;
      ctx.fillText("// AWAITING_ASSET", 14, H - 15);

      t++;
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      // Throttle ~30fps
      if (++frame % 2 !== 0) return;
      drawFrame();
    };

    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    if (reduceMotion) {
      drawFrame();
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="ck-hologram-canvas" aria-hidden="true" />;
}
