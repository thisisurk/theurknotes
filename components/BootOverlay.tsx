"use client";

import { useEffect, useState } from "react";

// Phase C/4.6 — port of v6 mockup BootOverlay.
// Boot sequence (6 lines × 140ms + 450ms fade) shown once per session.
// Gated by sessionStorage so revisits during the same session skip the boot.
// prefers-reduced-motion: skip animation entirely.

const SEQ = [
  "INIT · SYSTEM CORE",
  "LOADING · IDENTITY_MATRIX",
  "SYNC · VENTURES_REGISTRY",
  "CALIBRATE · STATS_MODULE",
  "MOUNT · PLAYER_LOG",
  "READY · COMMAND_CENTER",
];

const STORAGE_KEY = "theurk-booted";

export function BootOverlay() {
  const [show, setShow] = useState(false);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      return;
    }

    setShow(true);
    let i = 0;
    const iv = setInterval(() => {
      setLines((l) => [...l, SEQ[i]]);
      i++;
      if (i >= SEQ.length) {
        clearInterval(iv);
        setTimeout(() => {
          sessionStorage.setItem(STORAGE_KEY, "1");
          setShow(false);
        }, 450);
      }
    }, 140);

    return () => clearInterval(iv);
  }, []);

  if (!show) return null;

  return (
    <div className="ck-boot-overlay" aria-hidden="true">
      <div className="ck-boot-brand">
        The<span className="accent">Urk</span>
        <span className="ck-boot-brand-tag">· BOOT</span>
      </div>
      <div className="ck-boot-lines">
        {lines.map((l, i) => (
          <div key={i} className="ck-boot-line">
            <span>{`> ${l}`}</span>
            <span className="ck-boot-ok">[ OK ]</span>
          </div>
        ))}
        {lines.length < SEQ.length && (
          <div className="ck-boot-line ck-boot-line-cursor">
            <span>{">"}</span>
            <span className="ck-boot-cursor" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}
