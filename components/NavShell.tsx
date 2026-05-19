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

// Cockpit nav (Phase C/2 + C/4.6): brand mark + 5 mono links + sticky blur
// on scroll. All items are internal routes since F/2; `isExternal()` still
// branches for any future mailto:/http href that may appear in nav.items.
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
        <picture>
          <source srcSet="/logo/theurk-logo-mark-144.webp" type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/theurk-logo-mark-144.png"
            alt="TheUrk"
            className="nav-brand-mark"
            width={144}
            height={144}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
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
