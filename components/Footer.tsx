import { footer, site } from "@/lib/content";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer
      className="mt-auto px-6"
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "3rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Row 1 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted text-sm">
            {footer.copyright} · {site.domain}
          </p>
          <SocialIcons size={18} gap="1.25rem" />
        </div>

        {/* Row 2 — spacer */}
        <div style={{ height: "2rem" }} />

        {/* Row 3 — easter egg */}
        <p
          className="text-center text-muted italic"
          style={{ fontSize: "0.8rem" }}
        >
          {footer.easterEgg}
        </p>
      </div>
    </footer>
  );
}
