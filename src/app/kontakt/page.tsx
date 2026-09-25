import type { Metadata } from "next";

const EMAIL = "kontakt@evohost.pl";

export const metadata: Metadata = {
  title: "Kontakt | EvoHost",
  description: "Skontaktuj się z EvoHost.",
};

export default function KontaktPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-20 sm:px-10">
      <h1 className="fade-up text-4xl font-semibold tracking-[-0.03em] text-accent sm:text-5xl">
        Kontakt
      </h1>
      <p className="fade-up mt-4 max-w-[48ch] text-lg text-pretty text-muted [animation-delay:60ms]">
        Masz pytanie o ofertę albo współpracę? Napisz do nas.
      </p>

      <div className="fade-up mt-12 max-w-md rounded-2xl border border-white/10 p-6 sm:p-8 [animation-delay:120ms]">
        <p className="text-sm text-muted">E-mail</p>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-1 block text-xl font-medium text-foreground underline decoration-faint underline-offset-4 transition-colors hover:decoration-foreground"
        >
          {EMAIL}
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-6 inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-background transition-[transform,opacity] duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.97]"
        >
          Napisz wiadomość
        </a>
      </div>
    </main>
  );
}
