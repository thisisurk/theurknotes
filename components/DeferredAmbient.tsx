"use client";

import dynamic from "next/dynamic";

const AmbientLayer = dynamic(
  () => import("./AmbientLayer").then((m) => ({ default: m.AmbientLayer })),
  { ssr: false },
);
const BootOverlay = dynamic(
  () => import("./BootOverlay").then((m) => ({ default: m.BootOverlay })),
  { ssr: false },
);

export function DeferredAmbient() {
  return (
    <>
      <AmbientLayer />
      <BootOverlay />
    </>
  );
}
