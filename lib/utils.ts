import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

/** ISO date string → "15 Apr 2026" */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** Replace `<` with unicode escape — XSS-safe JSON-LD per Next docs */
export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}
