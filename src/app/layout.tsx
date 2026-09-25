import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion";
import { Navbar, type OfferItem } from "@/components/navbar";
import { displayName, getCategories } from "@/lib/evohost";
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
  title: "EvoHost",
  description: "EvoHost: hosting serwerów gier. Już wkrótce.",
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
        <MotionProvider>
          <Navbar offer={offer} />
          {children}
          <Footer categories={categories} />
        </MotionProvider>
      </body>
    </html>
  );
}
