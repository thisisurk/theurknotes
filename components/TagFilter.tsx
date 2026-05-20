import Link from "next/link";
import { TAGS, tagLabels, type Tag } from "@/lib/content";

type Props = {
  activeTag?: Tag | "all";
};

// Tag filter — Link-based SSR navigation (each tag = its own /notes/tag/[tag]
// route). Styled as .ck-act-pill to match the controls bar pattern used on
// /activity and /what-i-do. F/5 chrome unify.
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
    <nav className="ck-page-filter" aria-label="Filter notes by tag">
      {pills.map((p) => {
        const active = p.key === activeTag;
        return (
          <Link
            key={p.key}
            href={p.href}
            className="ck-act-pill"
            data-active={active}
            aria-current={active ? "page" : undefined}
          >
            {p.label}
          </Link>
        );
      })}
    </nav>
  );
}
