"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { hero } from "@/lib/content";
import { Ticker } from "./Ticker";
import { StatIcon } from "./StatIcon";

// Cockpit Hero (Phase C/2 + C/4.6) — full-bleed showroom for Home only.
// Cockpit top bar + parallax tilt + circuit divider + 3 stat cards + ticker.
// Cockpit-bar restored in C/4.6 after C/4.5 cut it.

export function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-name">
      <HeroBackdrop />

      {/* Cockpit top bar — location · FY · system status */}
      <div className="ck-fade ck-d1 cockpit-bar" aria-hidden="true">
        <span className="cockpit-seg">
          <span className="dot" />
          {hero.cockpitBar.location}
        </span>
        <span className="cockpit-line" />
        <span className="cockpit-seg">{hero.cockpitBar.fy}</span>
        <span className="cockpit-line" />
        <span className="cockpit-seg cockpit-seg-active">
          <span className="dot" />
          {hero.cockpitBar.status}
        </span>
      </div>

      {/* Avatar + identity stack */}
      <div className="hero-content-row">
        <div className="ck-fade ck-d2">
          <AvatarTilt>
            <div className="avatar-frame">
              <div className="ring-arc" aria-hidden="true" />
              <div className="ring-outer" aria-hidden="true" />
              <div className="ring-inner" aria-hidden="true" />
              <div className="hex">
                <Image
                  src={hero.avatar.src}
                  alt={hero.avatar.alt}
                  width={220}
                  height={220}
                  priority
                  sizes="(max-width: 768px) 160px, (max-width: 1024px) 180px, 220px"
                />
              </div>
              <span className="pip tl" aria-hidden="true" />
              <span className="pip br" aria-hidden="true" />
              <span className="pip l" aria-hidden="true" />
              <span className="pip r" aria-hidden="true" />
            </div>
          </AvatarTilt>
        </div>

        <div className="hero-text-wrap">
          <div className="ck-fade ck-d3" style={{ marginBottom: 18 }}>
            <span className="eyebrow">{hero.eyebrow}</span>
          </div>

          <h1 id="hero-name" className="ck-fade ck-d3 hero-name">
            {hero.headline.lead}
            <span className="accent">{hero.headline.accent}</span>
          </h1>

          <p className="ck-fade ck-d4 hero-punch">
            {hero.punch.before}
            <span className="accent">{hero.punch.accent}</span>
            {hero.punch.after}
          </p>

          <div className="ck-fade ck-d4 hero-divider" aria-hidden="true" />

          <div className="ck-fade ck-d5 hero-focus">
            <span className="hero-focus-badge">
              <span className="dot" aria-hidden="true" />
              <span className="hero-focus-label">{hero.focus.label}</span>
            </span>
            <p className="hero-focus-body">
              {renderWithAccent(hero.focus.body, hero.focus.accent)}
            </p>
          </div>

          <div className="ck-fade ck-d7 hero-ctas">
            {hero.ctas.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className={`hero-cta ${c.primary ? "hero-cta-primary" : "hero-cta-ghost"}`}
              >
                {c.label}
                {c.primary && <span aria-hidden="true">→</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="ck-fade ck-d7">
        <HeroCircuitDivider />
      </div>

      {/* Stat cards — 3 metrics tied to circuit divider node accents */}
      <div className="ck-fade ck-d8 hero-proof-grid">
        {hero.proof.map((k) => (
          <article
            key={k.lbl}
            className="stat-card"
            style={{ ["--stat-accent" as string]: k.accent }}
          >
            <span className="stat-accent-line" aria-hidden="true" />
            <header className="stat-head">
              <span className="stat-lbl">{k.lbl}</span>
              <StatIcon name={k.icon} color={k.accent} />
            </header>
            <div className="stat-val">{k.val}</div>
            <div className="stat-sub">{k.sub}</div>
            <footer className="stat-foot">
              <span className="stat-tag">{k.tag}</span>
              <span className="stat-live">
                <span className="stat-live-dot" aria-hidden="true" />
                LIVE
              </span>
            </footer>
          </article>
        ))}
      </div>

      <div className="ck-fade-in ck-d8">
        <Ticker label={hero.tickerLabel} items={hero.ticker} />
      </div>
    </section>
  );
}

// ---------- Backdrop ----------
// CSS gradient + grid lines + topo SVG + corner HUD. All visual; no state.
function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="hero-bd-grid" />
      <div className="hero-bd-spotlight" />
      <svg className="hero-bd-topo" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="rgba(212,168,83,0.55)" strokeWidth="0.6">
          <path d="M 0 350 Q 300 280 600 350 T 1200 350" opacity="0.20" />
          <path d="M 0 380 Q 350 290 600 360 T 1200 360" opacity="0.16" />
          <path d="M 0 320 Q 280 250 600 340 T 1200 350" opacity="0.14" />
          <path d="M 0 410 Q 320 340 620 380 T 1200 380" opacity="0.12" />
          <path d="M 0 290 Q 270 220 600 310 T 1200 310" opacity="0.10" />
          <path d="M 0 440 Q 380 380 660 410 T 1200 410" opacity="0.08" />
        </g>
      </svg>
      <div className="hero-bd-corner">
        <svg viewBox="0 0 200 120" fill="none" preserveAspectRatio="xMidYMid meet">
          <path d="M 0 60 L 60 60 L 60 30 L 110 30 L 110 60 L 200 60" stroke="rgba(212,168,83,0.55)" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.55" />
          <path d="M 0 90 L 80 90 L 80 100 L 200 100" stroke="rgba(212,168,83,0.55)" strokeWidth="0.5" opacity="0.4" />
          <circle cx="60" cy="60" r="2" fill="#D4A853" opacity="0.7" />
          <circle cx="110" cy="30" r="2" fill="#D4A853" opacity="0.7" />
          <circle cx="80" cy="90" r="1.5" fill="#D4A853" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

// ---------- Circuit divider ----------
// 3 nodes + 3 vertical channels + 3 animated pulses. SVG <animateMotion>
// auto-pauses under prefers-reduced-motion in modern browsers.
function HeroCircuitDivider() {
  return (
    <div className="hero-circuit-divider" aria-hidden="true">
      <svg viewBox="0 0 1120 60" preserveAspectRatio="none">
        <line x1="0" y1="10" x2="1120" y2="10" stroke="var(--border)" strokeWidth="1" opacity="0.7" />
        <circle cx="186" cy="10" r="3.5" fill="var(--bg-deep)" stroke="#D4A853" strokeWidth="1.2" />
        <circle cx="560" cy="10" r="3.5" fill="var(--bg-deep)" stroke="#60A5FA" strokeWidth="1.2" />
        <circle cx="933" cy="10" r="3.5" fill="var(--bg-deep)" stroke="#A78BFA" strokeWidth="1.2" />
        <path d="M 186 14 V 60" stroke="#D4A853" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
        <path d="M 560 14 V 60" stroke="#60A5FA" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
        <path d="M 933 14 V 60" stroke="#A78BFA" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
        <circle r="2.4" fill="#D4A853">
          <animateMotion path="M 186 14 V 60" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle r="2.4" fill="#60A5FA">
          <animateMotion path="M 560 14 V 60" dur="3.2s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" dur="3.2s" begin="0.6s" repeatCount="indefinite" />
        </circle>
        <circle r="2.4" fill="#A78BFA">
          <animateMotion path="M 933 14 V 60" dur="3s" begin="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" dur="3s" begin="1.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

// ---------- Avatar tilt ----------
// Mouse-driven 3D tilt, throttled with requestAnimationFrame.
// Skipped on touch devices (no-hover) and when reduced motion is requested.
function AvatarTilt({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reducedMotion) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      const inner = innerRef.current;
      if (!el || !inner) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / 800;
      const dy = (e.clientY - cy) / 800;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        inner.style.transform = `rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg)`;
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="avatar-tilt-wrap">
      <div ref={innerRef} className="avatar-tilt-inner">
        {children}
      </div>
    </div>
  );
}

// Render a body string with a single accent fragment highlighted in gold.
function renderWithAccent(body: string, accent: string) {
  const idx = body.indexOf(accent);
  if (idx < 0) return body;
  return (
    <>
      {body.slice(0, idx)}
      <span className="accent">{accent}</span>
      {body.slice(idx + accent.length)}
    </>
  );
}
