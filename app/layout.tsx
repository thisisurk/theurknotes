import type { Metadata } from "next";
import { Outfit, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TheUrk",
  description: "Solo Founder · Systems Designer",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      className={`${outfit.variable} ${notoThai.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
