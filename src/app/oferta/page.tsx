import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  displayName,
  formatPrice,
  getCategories,
  getPlans,
} from "@/lib/evohost";

export const metadata: Metadata = {
  title: "Oferta | EvoHost",
  description: "Serwery Minecraft i ochrona AntyDDoS od EvoHost.",
};

export default async function OfertaPage() {
  const [categories, plans] = await Promise.all([getCategories(), getPlans()]);

  // Plany przychodzą posortowane, ale „od” liczymy z najniższej ceny
  const minPrice = (slug: string) => {
    const prices = plans
      .filter((p) => p.category?.slug === slug)
      .map((p) => p.price);
    return prices.length ? Math.min(...prices) : null;
  };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-10 sm:py-20">
      <h1 className="fade-up text-4xl font-semibold tracking-[-0.03em] text-accent sm:text-5xl">
        Oferta
      </h1>
      <p className="fade-up mt-4 max-w-[48ch] text-lg text-pretty text-muted [animation-delay:60ms]">
        Wybierz usługę, żeby zobaczyć dostępne plany.
      </p>

      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => {
          const from = minPrice(c.slug);
          return (
            <li
              key={c.slug}
              className="fade-up"
              style={{ animationDelay: `${120 + i * 60}ms` }}
            >
              <Link
                href={`/oferta/${c.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 p-6 transition-colors hover:border-white/25 hover:bg-white/[0.02] sm:p-7"
              >
                <div className="flex items-center gap-4">
                  {c.imageUrl && (
                    <Image
                      src={c.imageUrl}
                      alt=""
                      width={56}
                      height={56}
                      className="size-14 object-contain"
                    />
                  )}
                  <div>
                    <p className="text-xs tracking-wide text-muted uppercase">
                      {c.typeLabel}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-foreground">
                      {displayName(c.name)}
                    </h2>
                  </div>
                </div>

                {c.description && (
                  <p className="mt-5 leading-relaxed text-muted">
                    {c.description}
                  </p>
                )}
                {c.hardware.summary && c.hardware.summary !== c.description && (
                  <p className="mt-2 text-sm text-muted">
                    {c.hardware.summary}
                  </p>
                )}

                <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                  {from !== null ? (
                    <p className="text-sm text-muted">
                      od{" "}
                      <span className="text-2xl font-semibold text-foreground tabular-nums">
                        {formatPrice(from)}
                      </span>
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-sm text-muted transition-colors group-hover:text-foreground">
                    Zobacz plany <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {categories.length === 0 && (
        <p className="mt-6 text-sm text-muted">
          Nie udało się teraz wczytać oferty. Spróbuj odświeżyć stronę za
          chwilę.
        </p>
      )}
    </main>
  );
}
