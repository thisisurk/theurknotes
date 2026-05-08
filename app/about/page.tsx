import type { Metadata } from "next";
import { AboutFull } from "@/components/sections/AboutFull";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: meta.about.title,
  description: meta.about.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: meta.about.title,
    description: meta.about.description,
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutFull />;
}
