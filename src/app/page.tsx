import Image from "next/image";

const EMAIL = "kontakt@evohost.pl";

export default function Home() {
  return (
    <div className="relative isolate flex flex-1 flex-col overflow-hidden">
      {/* Znak marki jako jedyny element graficzny, przycięty przez krawędź ekranu */}
      <Image
        src="/logos/logo-white.png"
        alt=""
        aria-hidden
        width={656}
        height={632}
        priority
        className="pointer-events-none absolute -z-10 w-[560px] opacity-[0.035] select-none max-md:-right-56 max-md:-bottom-40 md:top-1/2 md:-right-40 md:w-[820px] md:-translate-y-1/2"
      />

      <header className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-10 sm:pt-10">
        <Image
          src="/logos/logotype-white.png"
          alt="EvoHost"
          width={1193}
          height={232}
          priority
          className="h-auto w-[120px]"
        />
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-20 sm:px-10">
        <p className="fade-up flex items-center gap-2.5 text-sm text-muted">
          <span className="relative flex size-1.5" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50 motion-reduce:hidden" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          Trwają ostatnie prace
        </p>

        <h1 className="fade-up mt-6 text-[clamp(3.25rem,10vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-balance text-accent [animation-delay:60ms]">
          Już wkrótce.
        </h1>

        <p className="fade-up mt-6 max-w-[34ch] text-lg leading-relaxed text-pretty text-muted [animation-delay:120ms]">
          Hosting serwerów gier od EvoHost. Serwery VPS dołączą w kolejnym etapie.
        </p>

        <div className="fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 [animation-delay:180ms]">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-background transition-[transform,opacity] duration-150 ease-out hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.97]"
          >
            Napisz do nas
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="text-sm text-muted underline decoration-faint underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
          >
            {EMAIL}
          </a>
        </div>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 pb-8 text-sm text-muted sm:px-10 sm:pb-10">
        <p>© {new Date().getFullYear()} EvoHost</p>
      </footer>
    </div>
  );
}
