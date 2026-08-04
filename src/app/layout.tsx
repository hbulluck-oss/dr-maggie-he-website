import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/config/site.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UrgentBanner } from "@/components/layout/UrgentBanner";
import { BackToTop } from "@/components/ui/BackToTop";
import "./globals.css";

// Darken/lighten a hex colour by a percentage
function adjustColour(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// Generate lighter versions for dark mode
function lightVariant(hex: string): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + 80);
  const g = Math.min(255, ((num >> 8) & 0xff) + 80);
  const b = Math.min(255, (num & 0xff) + 80);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.doctor.displayName,
    locale: siteConfig.seo.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.seo.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const d = siteConfig.design;
  // Bespoke dark palette if provided (e.g. hand-tuned per theme in colour-schemes/theme-options.html),
  // otherwise auto-generate one by lightening the light-mode colours.
  const darkPrimary = d.darkPrimaryColour ?? lightVariant(d.primaryColour);
  const darkPrimaryHover = d.darkPrimaryHoverColour ?? lightVariant(adjustColour(d.primaryColour, 20));
  const darkAccent = d.darkAccentColour ?? lightVariant(d.accentColour);
  const darkAccentHover = d.darkAccentHoverColour ?? lightVariant(adjustColour(d.accentColour, 20));
  const darkBg = d.darkBackgroundColour ?? "#0f1724";
  const darkBgSecondary = d.darkBgSecondaryColour ?? "#1a2435";
  const darkText = d.darkTextColour ?? "#e8ecf1";
  const darkMutedText = d.darkMutedTextColour ?? "#94a3b8";
  const darkBorder = d.darkBorderColour ?? "#2d3a4f";

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: ${d.primaryColour};
            --primary-hover: ${adjustColour(d.primaryColour, -20)};
            --accent: ${d.accentColour};
            --accent-hover: ${adjustColour(d.accentColour, -20)};
            --on-accent: #ffffff;
            --bg-primary: ${d.backgroundColour};
            --bg-secondary: ${d.bgSecondaryColour ?? "#f7fafc"};
            --text-primary: ${d.textColour};
            --text-secondary: ${d.mutedTextColour};
            --border: ${d.borderColour};
          }
          @media (prefers-color-scheme: dark) {
            :root:not(.light) {
              --primary: ${darkPrimary};
              --primary-hover: ${darkPrimaryHover};
              --accent: ${darkAccent};
              --accent-hover: ${darkAccentHover};
              --on-accent: ${d.primaryColour};
              --bg-primary: ${darkBg};
              --bg-secondary: ${darkBgSecondary};
              --text-primary: ${darkText};
              --text-secondary: ${darkMutedText};
              --border: ${darkBorder};
            }
          }
          :root.dark {
            --primary: ${darkPrimary};
            --primary-hover: ${darkPrimaryHover};
            --accent: ${darkAccent};
            --accent-hover: ${darkAccentHover};
            --on-accent: ${d.primaryColour};
            --bg-primary: ${darkBg};
            --bg-secondary: ${darkBgSecondary};
            --text-primary: ${darkText};
            --text-secondary: ${darkMutedText};
            --border: ${darkBorder};
          }
        `}} />
      </head>
      <body className="font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: `
          if("scrollRestoration"in history){history.scrollRestoration="manual"}
          window.scrollTo(0,0);
          window.addEventListener("beforeunload",function(){window.scrollTo(0,0)});
          window.addEventListener("load",function(){setTimeout(function(){window.scrollTo(0,0)},0)});
          window.addEventListener("DOMContentLoaded",function(){window.scrollTo(0,0)});
        ` }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--bg-primary)] focus:px-4 focus:py-2 focus:text-[var(--text-primary)] focus:shadow-lg"
        >
          Skip to main content
        </a>

        <UrgentBanner />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <BackToTop />

        {siteConfig.analytics.plausibleDomain && (
          <Script
            defer
            data-domain={siteConfig.analytics.plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
