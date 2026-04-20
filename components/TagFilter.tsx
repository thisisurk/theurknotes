import Link from "next/link";
import { TAGS, tagLabels, type Tag } from "@/lib/content";
import { cn } from "@/lib/utils";

type Props = {
  activeTag?: Tag | "all";
};

const pillBase =
  "inline-flex items-center rounded-full transition-colors text-sm";

export function TagFilter({ activeTag = "all" }: Props) {
  const pills: Array<{ key: Tag | "all"; href: string; label: string }> = [
    { key: "all", href: "/notes", label: "All" },
    ...TAGS.map((t) => ({
      key: t,
      href: `/notes/tag/${t}`,
      label: tagLabels[t],
    })),
  ];

  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label="Filter notes by tag">
      {pills.map((p) => {
        const active = p.key === activeTag;
        return (
          <li key={p.key}>
            <Link
              href={p.href}
              className={cn(pillBase, "border")}
              style={
                active
                  ? {
                      backgroundColor: "var(--accent-gold-dim)",
                      borderColor: "var(--accent-gold)",
                      color: "var(--accent-gold)",
                      padding: "0.4rem 1rem",
                      fontSize: "0.85rem",
                    }
                  : {
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                      padding: "0.4rem 1rem",
                      fontSize: "0.85rem",
                    }
              }
            >
              {p.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
