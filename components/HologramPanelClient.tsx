"use client";

import dynamic from "next/dynamic";

export const HologramPanelClient = dynamic(
  () => import("./HologramPanel").then((m) => ({ default: m.HologramPanel })),
  {
    ssr: false,
    loading: () => <div className="ck-hologram-wrap" aria-hidden="true" />,
  },
);
