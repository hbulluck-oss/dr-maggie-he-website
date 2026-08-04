// ============================================================================
// SITE CONFIGURATION
// ============================================================================
// Content is stored in src/data/site-content.json (editable via the admin panel).
// This file imports the JSON and re-exports it with TypeScript types.
// To edit content: visit yoursite.com/admin/ or edit site-content.json directly.
// ============================================================================

import siteContentJson from "@/data/site-content.json";

export const siteConfig = siteContentJson as {
  doctor: {
    firstName: string;
    lastName: string;
    fullName: string;
    displayName: string;
    credentials: string;
    specialty: string;
    // Generic medical-registration fields (field name kept for kit compatibility —
    // holds AHPRA registration number for Australian doctors, GMC for UK doctors, etc.)
    gmcNumber: string;
    gmcRegisterUrl: string;
    photoPath: string;
    bio: string[];
    roles: string[];
  };
  trustBadges: string[];
  hero: {
    headline: string;
    subheadline: string;
    primaryCTA: string;
    secondaryCTA: string;
  };
  conditions: {
    slug: string;
    title: string;
    shortDescription: string;
    icon: string;
  }[];
  services: {
    investigations: { name: string; description: string }[];
    procedures: { name: string; description: string }[];
  };
  locations: {
    name: string;
    area: string;
    type: string;
    days: string;
    mapUrl: string;
    note: string;
  }[];
  fees: {
    initialConsultation: string;
    followUp: string;
    note: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  contact: {
    email: string;
    phone: string;
    bookingType: "cal" | "email" | "phone";
    bookingUrl: string;
    calLink: string;
    formspreeId: string;
    formDisclaimer: string;
    urgentBanner: string;
    secretaryName?: string;
  };
  seo: {
    siteUrl: string;
    title: string;
    description: string;
    locale: string;
  };
  design: {
    primaryColour: string;
    accentColour: string;
    backgroundColour: string;
    textColour: string;
    mutedTextColour: string;
    borderColour: string;
    bgSecondaryColour?: string;
    // Optional bespoke dark-mode palette. If omitted, dark mode is auto-generated
    // by lightening the light-mode primary/accent colours (see layout.tsx).
    darkPrimaryColour?: string;
    darkPrimaryHoverColour?: string;
    darkAccentColour?: string;
    darkAccentHoverColour?: string;
    darkBackgroundColour?: string;
    darkBgSecondaryColour?: string;
    darkTextColour?: string;
    darkMutedTextColour?: string;
    darkBorderColour?: string;
  };
  publications: {
    title: string;
    authors: string;
    journal: string;
    year: number;
    url?: string;
    doi?: string;
  }[];
  articles: {
    title: string;
    excerpt: string;
    image: string;
    slug: string;
    url: string;
    date: string;
  }[];
  insurers?: string[];
  copyrightName?: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  analytics: {
    plausibleDomain: string;
  };
  nav: {
    label: string;
    href: string;
  }[];
};

export type SiteConfig = typeof siteConfig;
