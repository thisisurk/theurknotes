"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

type Props = {
  showNotes: boolean;
};

type LinkItem = { href: string; label: string };

export function NavShell({ showNotes }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: LinkItem[] = [
    { href: "/#ventures", label: nav.links.ventures },
    ...(showNotes ? [{ href: "/notes", label: nav.links.notes }] : []),
    { href: "/#about", label: nav.links.about },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-200",
        scrolled
          ? "bg-deep/70 backdrop-blur-md border-b border-border/60"
          : "bg-transparent",
      )}
      style={{ height: 72 }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-primary font-semibold"
          style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}
        >
          {nav.brand}
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link-gold text-sm font-medium"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="link-gold inline-flex items-center justify-center p-1"
            >
              <Menu size={22} strokeWidth={1.75} />
            </SheetTrigger>
            <SheetContent>
              <nav className="mt-12 flex flex-col gap-2">
                {links.map((l) => (
                  <SheetClose key={l.href} asChild>
                    <Link
                      href={l.href}
                      className="link-gold py-3 text-base"
                    >
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
