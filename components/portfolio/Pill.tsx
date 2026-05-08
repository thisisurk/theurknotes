import type { ReactNode } from "react";
import type { StatusKind } from "@/lib/portfolio";

type Props = {
  kind?: StatusKind;
  children: ReactNode;
};

// Status pill — 5 tones via [data-kind]. Dot on the left.
export function Pill({ kind = "neutral", children }: Props) {
  return (
    <span className="ck-pill" data-kind={kind}>
      <span className="ck-pill-dot" aria-hidden="true" />
      {children}
    </span>
  );
}
