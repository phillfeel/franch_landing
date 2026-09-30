import type { Metadata, Viewport } from "next";
import { Geologica, Golos_Text, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://robotism.online";

// Шрифты скачиваются на этапе сборки и отдаются с того же домена — без запросов к Google у посетителя.
// Geologica — заголовки и цифры, Golos Text — основной текст, IBM Plex Mono — подписи и данные в интерфейсах.
const geologica = Geologica({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  variable: "--font-display",
  display: "swap",
});
const golos = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "ru_RU",
    siteName: site.name,
    url: siteUrl,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F2F3F4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${geologica.variable} ${golos.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
