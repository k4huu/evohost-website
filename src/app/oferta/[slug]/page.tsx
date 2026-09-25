import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  displayName,
  formatNumber,
  formatPrice,
  formatSize,
  getCategories,
  getCategory,
  type Plan,
} from "@/lib/evohost";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/oferta/[slug]">): Promise<Metadata> {
  const category = await getCategory((await params).slug);
  if (!category) return {};
  return {
    title: `${displayName(category.name)} | EvoHost`,
    description: category.description ?? undefined,
  };
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

export default async function CategoryPage({
  params,
}: PageProps<"/oferta/[slug]">) {
  const category = await getCategory((await params).slug);
  if (!category) notFound();

  const name = displayName(category.name);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-10 sm:py-20">
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
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {category.plans.map((plan, i) => (
            <li
              key={plan.slug}
              className={`fade-up relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
                plan.isPopular
                  ? "border-white/40 bg-white/[0.03]"
                  : "border-white/10"
              }`}
              style={{ animationDelay: `${60 + i * 60}ms` }}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-background">
                  Najpopularniejszy
                </span>
              )}

              <h2 className="text-lg font-semibold text-foreground">
                {plan.name}
              </h2>
              <p className="mt-3">
                <span className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
                  {formatPrice(plan.price)}
                </span>{" "}
                <span className="text-sm text-muted">brutto</span>
              </p>

              <dl className="mt-6 divide-y divide-white/5 border-y border-white/5 text-sm">
                {specs(plan).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 py-2.5"
                  >
                    <dt className="text-muted">{label}</dt>
                    <dd className="font-medium text-foreground tabular-nums">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {plan.features.length > 0 && (
                <ul className="mt-5 space-y-2 text-sm text-muted">
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

              <div className="mt-auto pt-7">
                <a
                  href={plan.orderUrl}
                  className={`flex h-11 items-center justify-center rounded-full text-sm font-medium transition-[transform,opacity,background-color] duration-150 active:scale-[0.97] ${
                    plan.isPopular
                      ? "bg-accent text-background hover:opacity-90"
                      : "border border-white/15 text-foreground hover:bg-white/5"
                  }`}
                >
                  Zamów
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
