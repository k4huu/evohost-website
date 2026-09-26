import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Navbar, type OfferItem } from "@/components/navbar";
import { displayName, getCategories } from "@/lib/evohost";
import {
  organizationJsonLd,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  THEME_COLOR,
  websiteJsonLd,
} from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: hosting serwerów Minecraft, botów Discord i AntyDDoS`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "hosting Minecraft",
    "serwer Minecraft",
    "hosting botów Discord",
    "ochrona AntyDDoS",
    "hosting serwerów gier",
    "EvoHost",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  colorScheme: "dark",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const categories = await getCategories();
  const offer: OfferItem[] = categories.map((c) => ({
    href: `/oferta/${c.slug}`,
    label: displayName(c.name),
    // Część kategorii ma w „sprzęcie” wpisaną własną nazwę — wtedy pokaż typ usługi
    description:
      c.hardware.summary && c.hardware.summary !== c.name
        ? c.hardware.summary
        : c.typeLabel,
    imageUrl: c.imageUrl,
  }));

  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <Navbar offer={offer} />
        {children}
        <Footer categories={categories} />
      </body>
    </html>
  );
}
