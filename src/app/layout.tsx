import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CommandBar from "@/components/ui/CommandBar";
import { LanguageProvider } from "@/context/LanguageContext";
import { SpeedInsights } from "@vercel/speed-insights/next"

/**
 * Font optimization
 *
 * `display: 'swap'` ensures text remains visible while the font is loading,
 * improving perceived performance.
 */
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap', 
});
const space = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space",
  display: 'swap',
});

/**
 * SEO & metadata
 *
 * Application-level metadata used by Next.js for SEO and social previews.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://gersombahena.dev'), 
  title: {
    default: "Gersom Bahena | Frontend Developer & UI Engineer",
    template: "%s | Gersom Bahena"
  },
  description: "Desarrollador Frontend especializado en React, Next.js y Diseño UI. Creo experiencias web modernas, rápidas y accesibles.",
  keywords: ["Frontend Developer", "React", "Next.js", "UI Design", "Web Development", "Mexico"],
  authors: [{ name: "Gersom Bahena" }],
  creator: "Gersom Bahena",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://gersombahena.dev",
    title: "Gersom Bahena | Frontend Developer",
    description: "Ingeniería Frontend y Diseño UI de alto nivel. Mira mi portafolio.",
    siteName: "Gersom Bahena Portfolio",
    images: [
      {
        url: "/og-image.webp", 
        width: 1200,
        height: 630,
        alt: "Gersom Bahena Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gersom Bahena | Frontend Developer",
    description: "Ingeniería Frontend y Diseño UI de alto nivel.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Viewport configuration
 *
 * Basic viewport settings for mobile-friendly rendering.
 */
export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // A11Y: 
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${space.variable} font-body antialiased relative bg-background text-primary overflow-x-hidden selection:bg-neon-cyan/30 selection:text-white`}>
        <LanguageProvider>
          {/*
            Main landmark
            - Provides the primary document landmark for improved accessibility.
          */}
          <main className="min-h-screen flex flex-col items-center justify-between">
            {children}
          </main>

          {/*
            Global navigation (visually outside the main landmark)
            - Rendered here to keep the main content as the primary landmark.
          */}
          <CommandBar />
        </LanguageProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}