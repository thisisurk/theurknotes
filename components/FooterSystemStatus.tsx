"use client";

import { useEffect, useState } from "react";
import { footer } from "@/lib/content";

// Phase C/4.6 — small client island that owns the live SESSION timestamp
// for the footer SYSTEM_STATUS box. Render server-side without it (avoids
// hydration mismatch) and fill it in on mount.
export function FooterSystemStatus() {
  const [session, setSession] = useState<string>("––––––––·––––");

  useEffect(() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setSession(
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}·${pad(d.getHours())}${pad(d.getMinutes())}`
    );
  }, []);

  return (
    <div className="footer-status">
      <div className="footer-status-head">
        <span className="pulse" aria-hidden="true" />
        {footer.systemStatus.headLabel}
      </div>
      <div className="footer-status-row">
        <span className="k">SESSION</span>
        <span className="v">{session}</span>
      </div>
      {footer.systemStatus.rows.map((r) => (
        <div key={r.k} className="footer-status-row">
          <span className="k">{r.k}</span>
          <span className="v">{r.v}</span>
        </div>
      ))}
    </div>
  );
}
