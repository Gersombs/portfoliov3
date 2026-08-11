import type { Metadata } from "next";
import localFont from "next/font/local";
import { absoluteUrl, siteConfig } from "./config/site";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  category: "technology",
  openGraph: {
    title: siteConfig.title,
    description: "Sitios web con estrategia, claridad y personalidad para profesionales y negocios.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: absoluteUrl("/images/hero-digital-forge.webp"),
        width: 1672,
        height: 941,
        alt: "Espacio digital tridimensional del portafolio de Gersom Bahena",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl("/images/hero-digital-forge.webp")],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
