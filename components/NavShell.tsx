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

// Cockpit nav (Phase C/2): brand dot + 4 mono links + sticky blur on scroll.
// Mobile: existing Radix Sheet, restyled with `.nav-mobile-link`.
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
        <span className="dot" aria-hidden="true" />
        {nav.brand.lead}
        <span className="accent">{nav.brand.accent}</span>
      </Link>

      <nav className="nav-list hidden md:flex" aria-label="Primary">
        {nav.items.map((it) => (
          <Link key={it.href} href={it.href} className="nav-link">
            {it.label}
          </Link>
        ))}
      </nav>

      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger aria-label="Open menu" className="nav-burger">
            <Menu size={20} strokeWidth={1.75} />
          </SheetTrigger>
          <SheetContent>
            <nav className="mt-12 flex flex-col" aria-label="Primary">
              {nav.items.map((it) => (
                <SheetClose key={it.href} asChild>
                  <Link href={it.href} className="nav-mobile-link">
                    {it.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
