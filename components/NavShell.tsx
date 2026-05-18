"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { nav } from "@/lib/content";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// Cockpit nav (Phase C/2 + C/4.6): SVG brand mark + 5 mono links + sticky
// blur on scroll. Last item is a mailto: contact — rendered as a plain <a>.
// Mobile: existing Radix Sheet, restyled with `.nav-mobile-link`.
function isExternal(href: string) {
  return href.startsWith("mailto:") || href.startsWith("http");
}

export function NavShell() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="nav-cockpit"
      data-scrolled={scrolled ? "true" : "false"}
    >
      <Link href="/" className="nav-brand" aria-label="TheUrk — home">
        {/* Plain <img> avoids next/image's dangerouslyAllowSVG opt-in.
            CSS sizes it via .nav-brand-mark. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/theurk-logo-noBG.svg"
          alt="TheUrk"
          className="nav-brand-mark"
          width={72}
          height={72}
          fetchPriority="high"
          decoding="async"
        />
      </Link>

      <nav className="nav-list hidden min-[769px]:flex" aria-label="Primary">
        {nav.items.map((it) =>
          isExternal(it.href) ? (
            <a key={it.href} href={it.href} className="nav-link">
              {it.label}
            </a>
          ) : (
            <Link key={it.href} href={it.href} className="nav-link">
              {it.label}
            </Link>
          ),
        )}
      </nav>

      <div className="min-[769px]:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger aria-label="Open menu" className="nav-burger">
            <Menu size={20} strokeWidth={1.75} />
          </SheetTrigger>
          <SheetContent>
            <nav className="mt-12 flex flex-col" aria-label="Primary">
              {nav.items.map((it) =>
                isExternal(it.href) ? (
                  <a
                    key={it.href}
                    href={it.href}
                    className="nav-mobile-link"
                    onClick={() => setOpen(false)}
                  >
                    {it.label}
                  </a>
                ) : (
                  <SheetClose key={it.href} asChild>
                    <Link href={it.href} className="nav-mobile-link">
                      {it.label}
                    </Link>
                  </SheetClose>
                ),
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
