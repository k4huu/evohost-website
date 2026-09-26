import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/evohost";
import { absoluteUrl } from "@/lib/site";

// Odświeżana razem z katalogiem, więc nowe kategorie trafią tu bez przebudowy
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/oferta"), changeFrequency: "weekly", priority: 0.9 },
    ...categories.map((c) => ({
      url: absoluteUrl(`/oferta/${c.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/kontakt"), changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/regulamin"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
