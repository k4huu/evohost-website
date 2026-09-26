import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import {
  displayName,
  formatNumber,
  formatPrice,
  formatSize,
  getCategories,
  getCategory,
  type Category,
  type Plan,
} from "@/lib/evohost";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  ORGANIZATION_ID,
  SITE_NAME,
} from "@/lib/site";
import minecraftBg from "../../../../public/hero/minecraft.jpg";
import discordBotBg from "../../../../public/hero/discord-bot.png";
import vpsBg from "../../../../public/hero/vps.png";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/oferta/[slug]">): Promise<Metadata> {
  const category = await getCategory((await params).slug);
  if (!category) return {};
  const title = `${displayName(category.name)}: ${category.typeLabel}`;
  const description = describe(category);
  const path = `/oferta/${category.slug}`;
  // Obrazek dokłada opengraph-image.tsx z tego folderu
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: path,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

// Opis do wyszukiwarki: z panelu, a gdy jest za krótki (np. „Serwery minecraft”),
// złożony z ceny i sprzętu
function describe(category: Category & { plans: Plan[] }) {
  if (category.description && category.description.length >= 80)
    return category.description;
  const name = displayName(category.name);
  const prices = category.plans.map((p) => p.price);
  return [
    `${name} w EvoHost: ${category.typeLabel.toLocaleLowerCase("pl")}`,
    prices.length ? ` od ${formatPrice(Math.min(...prices))} miesięcznie` : "",
    ".",
    category.hardware.summary ? ` ${category.hardware.summary}.` : "",
    " Zamów w panelu klienta i płać BLIK-iem, kartą lub przelewem.",
  ].join("");
}

// Specyfikacja planu jako pary etykieta–wartość; pomija pola, których usługa nie ma
function specs(plan: Plan): [string, string][] {
  const rows: [string, string | null][] = [
    [
      "Rdzenie CPU",
      plan.cpuCores ? `${formatNumber(plan.cpuCores)} vCPU` : null,
    ],
    ["RAM", plan.ramGb ? formatSize(plan.ramGb) : null],
    ["Dysk", plan.diskGb ? formatSize(plan.diskGb) : null],
    ["Transfer", plan.trafficGb ? formatSize(plan.trafficGb) : null],
    [
      plan.type === "protection" ? "Limit ochrony" : "Sloty graczy",
      plan.maxPlayers ? `${plan.maxPlayers}` : null,
    ],
    ["Backendy", plan.maxBackends ? `${plan.maxBackends}` : null],
    ["Domeny", plan.maxDomains ? `${plan.maxDomains}` : null],
  ];
  return rows.filter((r): r is [string, string] => r[1] !== null);
}

// Tło kart planów dla każdej kategorii. Bez obrazka zostaje sam gradient
// w kolorach kategorii; nowe grafiki wrzucaj do public/ i dopisuj tutaj.
const BACKGROUNDS: Record<
  string,
  { image?: StaticImageData; position?: string; tint: string }
> = {
  minecraft: { image: minecraftBg, tint: "rgb(74 222 128 / 0.18)" },
  "discord-bot": { image: discordBotBg, tint: "rgb(88 101 242 / 0.3)" },
  // Ochrona dzieli grafikę z VPS
  "ochrona-antyddos": {
    image: vpsBg,
    position: "100% 0%", // globus i szafy zamiast napisu „VPS”
    tint: "rgb(56 189 248 / 0.2)",
  },
};

function CardBackground({ slug }: { slug: string }) {
  const bg = BACKGROUNDS[slug];
  if (!bg) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {bg.image && (
        <Image
          src={bg.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-70"
          style={{ objectPosition: bg.position }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 70% at 100% 0%, ${bg.tint}, transparent 70%)`,
        }}
      />
      {/* Przyciemnienie ku dołowi, żeby parametry i cena były czytelne */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/70 to-background/95" />
    </div>
  );
}

// Sama kwota bez waluty, np. „29,00”, żeby cyfry mogły mieć własny krój
function formatAmount(price: number) {
  return new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

// „Minecraft 4 GB” → „4 GB”, bo nazwa gry jest już w nagłówku strony
function shortName(planName: string, categoryName: string) {
  const prefix = `${categoryName} `.toLocaleLowerCase("pl");
  return planName.toLocaleLowerCase("pl").startsWith(prefix)
    ? planName.slice(prefix.length)
    : planName;
}

export default async function CategoryPage({
  params,
}: PageProps<"/oferta/[slug]">) {
  const category = await getCategory((await params).slug);
  if (!category) notFound();

  const name = displayName(category.name);
  const url = absoluteUrl(`/oferta/${category.slug}`);
  const prices = category.plans.map((p) => p.price);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-10 sm:py-20">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "EvoHost", path: "/" },
            { name: "Oferta", path: "/oferta" },
            { name, path: `/oferta/${category.slug}` },
          ]),
          ...(prices.length > 0
            ? [
                {
                  "@type": "Product",
                  "@id": `${url}#product`,
                  name: `${name}: ${category.typeLabel}`,
                  description: describe(category),
                  url,
                  ...(category.imageUrl && { image: category.imageUrl }),
                  category: category.typeLabel,
                  brand: { "@type": "Brand", name: SITE_NAME },
                  offers: {
                    "@type": "AggregateOffer",
                    priceCurrency: "PLN",
                    lowPrice: Math.min(...prices),
                    highPrice: Math.max(...prices),
                    offerCount: prices.length,
                    offers: category.plans.map((plan) => ({
                      "@type": "Offer",
                      name: plan.name,
                      price: plan.price,
                      priceCurrency: plan.currency,
                      availability: "https://schema.org/InStock",
                      url: plan.orderUrl,
                      seller: { "@id": ORGANIZATION_ID },
                    })),
                  },
                },
              ]
            : []),
        ]}
      />
      <Link
        href="/oferta"
        className="group -ml-1 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
      >
        <svg
          viewBox="0 0 16 16"
          className="size-4 transition-transform duration-150 group-hover:-translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M10 12L6 8l4-4" />
        </svg>
        Oferta
      </Link>

      <header className="fade-up mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
        {category.imageUrl && (
          <Image
            src={category.imageUrl}
            alt=""
            width={80}
            height={80}
            priority
            className="size-20 object-contain"
          />
        )}
        <div>
          <p className="text-xs tracking-wide text-muted uppercase">
            {category.typeLabel}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] text-accent sm:text-5xl">
            {name}
          </h1>
          {category.hardware.summary &&
            category.hardware.summary !== category.description && (
              <p className="mt-3 text-muted">{category.hardware.summary}</p>
            )}
        </div>
      </header>

      {category.plans.length === 0 ? (
        <p className="mt-12 text-muted">
          W tej kategorii nie ma jeszcze planów.
        </p>
      ) : (
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {category.plans.map((plan, i) => (
            <li
              key={plan.slug}
              className={`fade-up relative isolate flex flex-col overflow-hidden rounded-2xl border bg-white/[0.02] p-7 ${
                plan.isPopular ? "border-white/25" : "border-white/10"
              }`}
              style={{ animationDelay: `${60 + i * 60}ms` }}
            >
              <CardBackground slug={category.slug} />

              <div className="flex items-center gap-4">
                {category.imageUrl && (
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Image
                      src={category.imageUrl}
                      alt=""
                      width={56}
                      height={56}
                      className="size-7 object-contain"
                    />
                  </span>
                )}
                <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                  {shortName(plan.name, name)}
                </h2>
                {plan.isPopular && (
                  <span className="ml-auto rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-background">
                    Popularny
                  </span>
                )}
              </div>

              <dl className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
                {specs(plan).map(([label, value]) => (
                  <div key={label} className="flex gap-2">
                    <dt className="text-muted">{label}</dt>
                    <dd className="font-medium text-foreground tabular-nums">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {plan.features.length > 0 && (
                <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <svg
                        viewBox="0 0 16 16"
                        className="mt-0.5 size-4 shrink-0 text-foreground"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.75}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M3.5 8.5l3 3 6-7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-6">
                <div className="border-t border-white/10 pt-6">
                  <p className="text-[11px] font-medium tracking-wider text-muted uppercase">
                    Cena
                  </p>
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-mono text-4xl font-semibold tracking-tight text-foreground tabular-nums">
                      {formatAmount(plan.price)}
                    </span>
                    <span className="text-sm text-muted">zł brutto</span>
                  </p>
                </div>

                <a
                  href={plan.orderUrl}
                  className="group mt-6 flex h-12 items-center justify-center gap-2 rounded-xl bg-accent text-[15px] font-semibold text-background transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
                >
                  Zamów
                  <svg
                    viewBox="0 0 16 16"
                    className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
