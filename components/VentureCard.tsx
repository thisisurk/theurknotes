import { ExternalLink } from "lucide-react";
import type { Venture } from "@/lib/ventures";
import { StatusBadge } from "./StatusBadge";

type Props = {
  venture: Venture;
};

export function VentureCard({ venture }: Props) {
  const hasLink = venture.link.label !== "";
  const isClickable = venture.link.url !== null;

  return (
    <article className="venture-card flex flex-col">
      <header className="flex items-start justify-between gap-4">
        <h3
          className="text-primary"
          style={{
            fontSize: "1.15rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          {venture.title}
        </h3>
        <StatusBadge status={venture.status} />
      </header>

      <p
        className="text-secondary"
        style={{
          fontSize: "0.95rem",
          marginTop: "0.35rem",
        }}
      >
        {venture.subtitle}
      </p>

      <p
        className="text-secondary"
        style={{
          fontSize: "0.95rem",
          lineHeight: 1.7,
          marginTop: "1rem",
        }}
      >
        {venture.body}
      </p>

      {hasLink && (
        <div className="mt-6 flex items-center">
          {isClickable ? (
            <a
              href={venture.link.url ?? "#"}
              target={venture.link.url?.startsWith("http") ? "_blank" : undefined}
              rel={
                venture.link.url?.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="inline-flex items-center gap-1.5 text-sm font-medium"
              style={{ color: "var(--accent-gold)" }}
            >
              <span>{venture.link.label}</span>
              <ExternalLink size={14} strokeWidth={1.75} aria-hidden="true" />
            </a>
          ) : (
            <span className="text-muted text-sm">{venture.link.label}</span>
          )}
        </div>
      )}
    </article>
  );
}
