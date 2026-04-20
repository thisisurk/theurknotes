import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Swords } from "lucide-react";
import { hero } from "@/lib/content";
import { SocialIcons } from "./SocialIcons";

const AVATAR_PATH = path.join(process.cwd(), "public", "avatar.png");

export function Hero() {
  const hasAvatar = fs.existsSync(AVATAR_PATH);

  return (
    <section
      className="relative flex flex-col items-center justify-center px-6"
      style={{ minHeight: "90vh" }}
    >
      <div className="hero-stagger flex w-full max-w-[720px] flex-col items-center text-center">
        {/* 1. Avatar */}
        <div className="relative mb-7" style={{ width: 128, height: 128 }}>
          <span
            aria-hidden="true"
            className="avatar-ring absolute -inset-1.5 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, var(--accent-gold) 25%, transparent 50%, var(--accent-gold) 75%, transparent)",
              opacity: 0.4,
            }}
          />
          <div
            className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-card"
            style={{ border: "1px solid var(--border)" }}
          >
            {hasAvatar ? (
              <Image
                src="/avatar.png"
                alt="Urk"
                width={128}
                height={128}
                priority
                className="h-full w-full object-cover"
              />
            ) : (
              <Swords
                size={56}
                strokeWidth={1.5}
                aria-hidden="true"
                style={{ color: "var(--accent-gold)" }}
              />
            )}
          </div>
        </div>

        {/* 2. Wordmark */}
        <p
          className="text-muted"
          style={{
            fontSize: "0.9rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            marginBottom: "0.75rem",
          }}
        >
          {hero.wordmark}
        </p>

        {/* 3. Name (h1) */}
        <h1
          className="text-primary"
          style={{
            fontSize: "clamp(2.75rem, 6vw, 4rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: "1.25rem",
          }}
        >
          {hero.name}
        </h1>

        {/* 4. Identity line */}
        <p
          className="text-secondary"
          style={{
            fontSize: "1.1rem",
            maxWidth: 560,
            marginBottom: "2rem",
          }}
        >
          {hero.identity}
        </p>

        {/* 5. Tagline */}
        <p
          className="gold-underline"
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            color: "var(--accent-gold)",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          {hero.tagline}
        </p>

        {/* 6. Micro-line */}
        <p
          className="text-muted"
          style={{
            fontSize: "0.9rem",
            marginBottom: "2rem",
          }}
        >
          {hero.microLine}
        </p>

        {/* 7. Socials */}
        <SocialIcons />
      </div>
    </section>
  );
}
