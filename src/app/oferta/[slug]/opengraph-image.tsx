import {
  displayName,
  formatPrice,
  getCategories,
  getCategory,
} from "@/lib/evohost";
import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Oferta EvoHost";
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const category = await getCategory((await params).slug);
  if (!category) return ogImage({ title: "Oferta" });

  const prices = category.plans.map((p) => p.price);
  return ogImage({
    eyebrow: category.typeLabel,
    title: displayName(category.name),
    subtitle: prices.length
      ? `od ${formatPrice(Math.min(...prices))} miesięcznie`
      : category.hardware.summary ?? undefined,
  });
}
