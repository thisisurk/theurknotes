import { StarField } from "./StarField";

// Phase C/4.6 — global ambient HUD layer.
// Wraps three fixed-position decorations:
//   z:0  StarField canvas (parallax stars + nodes + shooting stars)
//   z:2  scan-overlay (sliding gold gradient)
//   z:3  CRT noise (SVG fractal noise, mix-blend-mode: overlay)
// Each respects prefers-reduced-motion via globals.css overrides.
export function AmbientLayer() {
  return (
    <>
      <StarField intensity={70} />
      <div className="ck-scan-overlay" aria-hidden="true" />
      <div className="ck-crt-noise" aria-hidden="true" />
    </>
  );
}
