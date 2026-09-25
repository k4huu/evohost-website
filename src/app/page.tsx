import Image from "next/image";
import Link from "next/link";
import {
  displayName,
  formatPrice,
  formatSize,
  getCategories,
  getPlans,
  DISCORD_URL,
  PANEL_URL,
  type Category,
  type Plan,
} from "@/lib/evohost";
import hero from "../../public/hero/minecraft.jpg";
import mascot from "../../public/discord-mascot.webp";
import {
  FloatingMascot,
  ParallaxBackground,
  Reveal,
  Stagger,
  DrawLine,
  Magnetic,
  Spotlight,
  StaggerItem,
  WordReveal,
} from "@/components/motion";
import { Faq } from "@/components/faq";

// Odpowiedzi oparte na regulaminie — przy zmianie regulaminu zaktualizuj też tutaj
const FAQ = [
  {
    q: "Jak zamówić usługę?",
    a: "Wybierz plan w ofercie i kliknij „Zamów”. Zamówienie składasz i opłacasz w panelu klienta, a usługa rusza po potwierdzeniu zamówienia i zaksięgowaniu płatności.",
  },
  {
    q: "Jakie są metody płatności?",
    a: "Płatności obsługuje operator Simpay: BLIK, karta, szybkie przelewy online z większości polskich banków oraz PayPal.",
  },
  {
    q: "Czy wystawiacie faktury VAT?",
    a: "Nie jesteśmy płatnikiem VAT, więc nie wystawiamy faktur VAT. Na życzenie wystawimy rachunek potwierdzający płatność.",
  },
  {
    q: "Jak działa przedłużanie usługi?",
    a: "Usługi działają w okresach rozliczeniowych. Przed końcem okresu dostaniesz przypomnienie o płatności za kolejny. Nieopłacona usługa może zostać zawieszona.",
  },
  {
    q: "Czy mogę zrezygnować?",
    a: "Tak. Rezygnację zgłosisz w panelu klienta albo mailowo, a usługa działa do końca opłaconego okresu.",
  },
  {
    q: "Czy robicie kopie zapasowe?",
    a: "Tak, według zasad opisanych w ofercie danej usługi. Serwery Minecraft mają na przykład kopie co 6 godzin.",
  },
];

const STEPS = [
  {
    title: "Wybierz plan",
    text: "Porównaj plany w ofercie i wybierz ten, który pasuje do Twojego projektu.",
  },
  {
    title: "Zamów w panelu",
    text: "Załóż konto w panelu klienta i opłać usługę.",
  },
  {
    title: "Zarządzaj w jednym miejscu",
    text: "Konsola, pliki i kopie zapasowe czekają w tym samym panelu.",
  },
];

export default async function Home() {
  const [categories, plans] = await Promise.all([getCategories(), getPlans()]);

  const plansOf = (slug: string) =>
    plans.filter((p) => p.category?.slug === slug);
  const minPrice = (slug: string) => {
    const prices = plansOf(slug).map((p) => p.price);
    return prices.length ? Math.min(...prices) : null;
  };

  // Największy kafelek dostaje kategoria z najszerszą ofertą
  const [featured, ...rest] = [...categories].sort(
    (a, b) => plansOf(b.slug).length - plansOf(a.slug).length,
  );

  return (
    <>
      {/* -mt-20 wsuwa hero pod przezroczysty navbar (h-20) */}
      <section className="relative isolate -mt-20 flex min-h-[min(100svh,960px)] flex-col overflow-hidden">
        <ParallaxBackground>
          <Image
            src={hero}
            alt=""
            priority
            placeholder="blur"
            sizes="100vw"
            className="size-full object-cover object-[65%_center]"
          />
        </ParallaxBackground>
        {/* Przyciemnienie: od lewej pod tekst, od dołu w kolor strony */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_80%,transparent)_35%,transparent_75%),linear-gradient(0deg,var(--background)_0%,transparent_40%),linear-gradient(180deg,color-mix(in_oklab,var(--background)_70%,transparent)_0%,transparent_25%)]"
        />

        <Stagger
          immediate
          delay={0.15}
          className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pt-36 pb-16 sm:px-10"
        >
          <WordReveal
            as="h1"
            immediate
            delay={0.2}
            text="Hosting, który po prostu działa."
            className="max-w-[14ch] text-[clamp(2.75rem,7vw,5rem)] leading-[1] font-semibold tracking-[-0.035em] text-balance text-accent"
          />

          <StaggerItem>
            <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-pretty text-foreground/75">
              Serwery Minecraft, boty Discord i ochrona AntyDDoS. Wszystko w
              jednym panelu.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Link
                href="/oferta"
                className="inline-flex h-12 items-center rounded-full bg-accent px-7 text-[15px] font-medium text-background transition-[transform,opacity] duration-150 ease-out hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.97]"
              >
                Zobacz ofertę
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={PANEL_URL}
                className="inline-flex h-12 items-center rounded-full border border-white/20 bg-white/5 px-7 text-[15px] font-medium text-foreground backdrop-blur-sm transition-[transform,background-color] duration-150 ease-out hover:bg-white/10 active:scale-[0.97]"
              >
                Panel klienta
              </a>
            </Magnetic>
          </StaggerItem>

          {categories.length > 0 && (
            <StaggerItem>
              <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-5">
                {categories.map((c) => {
                  const from = minPrice(c.slug);
                  return (
                    <li key={c.slug}>
                      <Link
                        href={`/oferta/${c.slug}`}
                        className="group flex items-center gap-3"
                      >
                        {c.imageUrl && (
                          <Image
                            src={c.imageUrl}
                            alt=""
                            width={36}
                            height={36}
                            className="size-9 object-contain transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:-rotate-6"
                          />
                        )}
                        <span>
                          <span className="block text-sm font-medium text-foreground underline-offset-4 group-hover:underline">
                            {displayName(c.name)}
                          </span>
                          {from !== null && (
                            <span className="block text-xs text-muted tabular-nums">
                              od {formatPrice(from)}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </StaggerItem>
          )}
        </Stagger>
      </section>

      {featured && (
        <section className="mx-auto w-full max-w-6xl px-4 pt-8 pb-24 sm:px-10 sm:pb-32">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <WordReveal
              text="Jedna firma, wszystko czego potrzebuje Twój projekt."
              className="max-w-[18ch] text-3xl font-semibold tracking-[-0.03em] text-balance text-accent sm:text-4xl"
            />
            <Link
              href="/oferta"
              className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Cała oferta
            </Link>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            <StaggerItem className="lg:col-span-2 lg:row-span-2">
              <Spotlight className="h-full rounded-3xl transition-transform duration-300 ease-out hover:-translate-y-1">
                <FeaturedTile
                  category={featured}
                  plans={plansOf(featured.slug)}
                />
              </Spotlight>
            </StaggerItem>
            {rest.map((c) => (
              <StaggerItem key={c.slug}>
                <Spotlight className="h-full rounded-3xl transition-transform duration-300 ease-out hover:-translate-y-1">
                  <SmallTile category={c} from={minPrice(c.slug)} />
                </Spotlight>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      <section className="bg-[linear-gradient(180deg,transparent,rgb(255_255_255/0.025)_20%,rgb(255_255_255/0.025)_80%,transparent)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-10 sm:py-28">
          <Reveal>
            <WordReveal
              text="Start w trzech krokach"
              className="text-3xl font-semibold tracking-[-0.03em] text-accent sm:text-4xl"
            />
          </Reveal>

          <Stagger
            as="ol"
            className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8"
          >
            {STEPS.map((step, i) => (
              <StaggerItem as="li" key={step.title}>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted tabular-nums">
                    0{i + 1}
                  </span>
                  <DrawLine
                    delay={0.2 + i * 0.15}
                    className="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[32ch] leading-relaxed text-muted">
                  {step.text}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-24 sm:px-10 sm:py-32 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <Reveal>
          <WordReveal
            text="Częste pytania"
            className="text-3xl font-semibold tracking-[-0.03em] text-accent sm:text-4xl"
          />
          <p className="mt-4 max-w-[32ch] leading-relaxed text-muted">
            Szczegóły znajdziesz w{" "}
            <Link
              href="/regulamin"
              className="text-foreground underline decoration-faint underline-offset-4 hover:decoration-foreground"
            >
              regulaminie
            </Link>
            . Nie ma tu Twojego pytania?{" "}
            <a
              href={DISCORD_URL}
              className="text-foreground underline decoration-faint underline-offset-4 hover:decoration-foreground"
            >
              Zapytaj na Discordzie
            </a>
            .
          </p>
        </Reveal>

        <Faq items={FAQ} />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-10 sm:pb-32">
        <Reveal>
          <Spotlight
            color="rgb(88 101 242 / 0.25)"
            size={600}
            className="rounded-[2rem]"
          >
            <div className="relative isolate overflow-hidden rounded-[2rem] border border-[#5865F2]/25 bg-[radial-gradient(90%_120%_at_85%_60%,rgb(88_101_242/0.35),transparent_60%),linear-gradient(135deg,rgb(88_101_242/0.08),transparent_60%)] px-7 pt-12 sm:px-12 sm:pt-16 md:min-h-[26rem] md:pb-16">
              <div className="relative z-10 max-w-md">
                <p className="text-xs tracking-wide text-[#aab3ff] uppercase">
                  Społeczność EvoHost
                </p>
                <WordReveal
                  text="Dołącz do naszego Discorda."
                  className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-balance text-accent sm:text-5xl"
                />
                <p className="mt-4 text-lg leading-relaxed text-pretty text-foreground/75">
                  Nowości, promocje i pomoc przy konfiguracji. Zapytaj o
                  cokolwiek, zanim zamówisz.
                </p>
                <Magnetic className="mt-8">
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-[#5865F2] px-7 text-[15px] font-medium text-white shadow-[0_10px_40px_-10px_rgb(88_101_242/0.8)] transition-[transform,background-color] duration-150 ease-out hover:bg-[#4752c4] active:scale-[0.97]"
                  >
                    <DiscordIcon />
                    Dołącz do serwera
                    <Arrow />
                  </a>
                </Magnetic>
              </div>

              <FloatingMascot className="mx-auto mt-10 w-60 translate-y-[6%] md:absolute md:right-12 md:bottom-0 md:mt-0 md:w-[22rem] lg:right-20">
                <Image
                  src={mascot}
                  alt=""
                  sizes="(min-width: 768px) 352px, 240px"
                  className="pointer-events-none drop-shadow-[0_30px_60px_rgb(88_101_242/0.45)]"
                />
              </FloatingMascot>
            </div>
          </Spotlight>
        </Reveal>
      </section>
    </>
  );
}

function FeaturedTile({
  category,
  plans,
}: {
  category: Category;
  plans: Plan[];
}) {
  return (
    <Link
      href={`/oferta/${category.slug}`}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 p-7 transition-colors duration-300 hover:border-white/20 sm:p-9"
    >
      {/* Ikona kategorii jako akcent w rogu */}
      {category.imageUrl && (
        <Image
          src={category.imageUrl}
          alt=""
          width={320}
          height={320}
          className="pointer-events-none absolute top-7 right-7 -z-10 size-24 object-contain transition-transform duration-500 ease-out group-hover:-rotate-6 sm:top-9 sm:right-9 sm:size-36"
        />
      )}

      <p className="text-xs tracking-wide text-muted uppercase">
        {category.typeLabel}
      </p>
      <h3 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">
        {displayName(category.name)}
      </h3>
      {category.hardware.summary && (
        <p className="mt-2 pr-24 text-muted sm:pr-40">
          {category.hardware.summary}
        </p>
      )}

      <ul className="mt-auto divide-y divide-white/5 pt-14">
        {plans.map((plan) => (
          <li
            key={plan.slug}
            className="flex items-center justify-between gap-4 py-3.5"
          >
            <span className="flex items-center gap-2.5">
              <span className="font-medium text-foreground">{plan.name}</span>
              {plan.isPopular && (
                <span className="rounded-full bg-accent px-2 py-px text-[11px] font-medium text-background">
                  Popularny
                </span>
              )}
            </span>
            <span className="flex items-center gap-5 text-sm tabular-nums">
              <span className="hidden text-muted sm:inline">
                {[
                  plan.ramGb && `${formatSize(plan.ramGb)} RAM`,
                  plan.maxPlayers && `${plan.maxPlayers} slotów`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
              <span className="font-medium text-foreground">
                {formatPrice(plan.price)}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
        Zobacz plany
        <Arrow />
      </span>
    </Link>
  );
}

function SmallTile({
  category,
  from,
}: {
  category: Category;
  from: number | null;
}) {
  return (
    <Link
      href={`/oferta/${category.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-white/10 p-7 transition-colors duration-300 hover:border-white/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs tracking-wide text-muted uppercase">
            {category.typeLabel}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-foreground">
            {displayName(category.name)}
          </h3>
        </div>
        {category.imageUrl && (
          <Image
            src={category.imageUrl}
            alt=""
            width={48}
            height={48}
            className="size-12 object-contain transition-transform duration-300 ease-out group-hover:-rotate-6"
          />
        )}
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 pt-10">
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
        <Arrow />
      </div>
    </Link>
  );
}

function Arrow() {
  return (
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
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.44.87-.61 1.25a18.27 18.27 0 0 0-5.49 0 12.64 12.64 0 0 0-.62-1.25.08.08 0 0 0-.08-.04 19.74 19.74 0 0 0-4.88 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.3 1.23-1.99a.08.08 0 0 0-.04-.1 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1 0-.12l.37-.29a.07.07 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08 0l.37.3a.08.08 0 0 1 0 .12 12.3 12.3 0 0 1-1.88.9.08.08 0 0 0-.04.1c.36.7.78 1.36 1.23 1.99a.08.08 0 0 0 .08.03 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .03-.06c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.09-2.15-2.42s.95-2.42 2.15-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42Z" />
    </svg>
  );
}
