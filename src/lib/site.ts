import type { Metadata } from "next";
import { COMPANY, DISCORD_URL } from "@/lib/evohost";

// Adres produkcyjny: od niego liczą się canonicale, sitemap i linki w Open Graph.
// Na podglądach (np. staging) nadpisz przez NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://evohost.pl"
).replace(/\/$/, "");

export const SITE_NAME = COMPANY.name;

export const SITE_DESCRIPTION =
  "Hosting serwerów Minecraft, botów Discord i ochrona AntyDDoS. Szybkie dyski NVMe, kopie zapasowe i wygodny panel klienta. Płatność BLIK, kartą lub przelewem.";

export const THEME_COLOR = "#161515";

/** Pełny adres podstrony, np. `absoluteUrl("/oferta")`. */
export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

// Obrazek generowany przez app/opengraph-image.tsx
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

/**
 * Metadane podstrony. Next nie scala zagnieżdżonych obiektów z layoutem
 * (openGraph podstrony zastępuje cały openGraph z layoutu, razem z obrazkiem
 * z app/opengraph-image), więc składamy komplet tutaj.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: path,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

// Wspólne encje JSON-LD, na które powołują się dane strukturalne podstron
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/logos/logo-white.png"),
  email: COMPANY.email,
  sameAs: [DISCORD_URL],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: COMPANY.email,
    availableLanguage: ["pl"],
  },
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "pl-PL",
  publisher: { "@id": ORGANIZATION_ID },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
