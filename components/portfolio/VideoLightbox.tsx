"use client";

import { useEffect } from "react";

type Props = {
  src: string;
  title: string;
  tag: string;
  onClose: () => void;
};

// Modal video player — Esc closes, body scroll locked while open.
export function VideoLightbox({ src, title, tag, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="ck-lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="ck-lightbox-frame" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="ck-lightbox-close"
          onClick={onClose}
          aria-label="Close video"
        >
          ×
        </button>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video src={src} controls autoPlay playsInline />
        <div className="ck-lightbox-meta">
          <span className="ck-lightbox-meta-tag">{tag}</span>
          <span className="ck-lightbox-meta-title">{title}</span>
        </div>
      </div>
    </div>
  );
}
