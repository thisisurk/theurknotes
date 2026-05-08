"use client";

import { useState } from "react";
import type { PortfolioItem } from "@/lib/portfolio";
import { CreationCard } from "./CreationCard";
import { VideoLightbox } from "./VideoLightbox";

type Props = {
  items: PortfolioItem[];
};

type LightboxState = { src: string; title: string; tag: string } | null;

// Owns the video-lightbox state for the Creations pillar so WhatIDoSection
// can stay a server component.
export function CreationGrid({ items }: Props) {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  return (
    <>
      <div className="ck-creation-grid">
        {items.map((item, i) => (
          <CreationCard
            key={item.id}
            item={item}
            index={i + 1}
            onPlay={setLightbox}
          />
        ))}
      </div>
      {lightbox && (
        <VideoLightbox
          src={lightbox.src}
          title={lightbox.title}
          tag={lightbox.tag}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
