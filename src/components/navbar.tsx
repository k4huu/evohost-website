"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PANEL_URL } from "@/lib/evohost";

export type OfferItem = {
  href: string;
  label: string;
  description: string | null;
  imageUrl: string | null;
};

const linkBase =
  "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[15px] transition-colors hover:bg-white/5 hover:text-foreground";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function Navbar({ offer }: { offer: OfferItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dropdown zamyka się kliknięciem poza nim i klawiszem Escape
  useEffect(() => {
    if (!offerOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOfferOpen(false);
    };
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setOfferOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [offerOpen]);

  const closeAll = () => {
    setOpen(false);
    setOfferOpen(false);
  };

  const solid = scrolled || open;
  const color = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)
      ? "text-foreground"
      : "text-muted";

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        solid
          ? "border-white/10 bg-background/80 backdrop-blur-md"
          : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center gap-6 px-4 sm:px-10">
        <Link
          href="/"
          aria-label="EvoHost — strona główna"
          className="flex-1 md:flex-none lg:flex-1"
          onClick={closeAll}
        >
          <Image
            src="/logos/logotype-white.png"
            alt="EvoHost"
            width={1193}
            height={232}
            loading="eager"
            className="h-auto w-[136px]"
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          <li>
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={`${linkBase} ${color("/")}`}
            >
              Strona główna
            </Link>
          </li>

          <li
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setOfferOpen(true)}
            onMouseLeave={() => setOfferOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOfferOpen((v) => !v)}
              aria-expanded={offerOpen}
              aria-controls="offer-menu"
              className={`${linkBase} ${offerOpen ? "text-foreground" : color("/oferta")}`}
            >
              Oferta
              <Chevron open={offerOpen} />
            </button>

            {/* pt-2 zamiast marginesu, żeby kursor nie gubił hovera w szczelinie */}
            <div
              id="offer-menu"
              className={`absolute top-full left-1/2 w-80 -translate-x-1/2 pt-2 transition-[opacity,transform] duration-150 ease-out ${
                offerOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0"
              }`}
            >
              <div className="rounded-2xl border border-white/10 bg-background/95 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-md">
                <ul>
                  {offer.map(({ href, label, description, imageUrl }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={closeAll}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center text-foreground">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt=""
                              width={40}
                              height={40}
                              className="size-full object-contain"
                            />
                          ) : (
                            <span className="text-sm font-semibold text-muted">
                              {label.charAt(0)}
                            </span>
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                            {label}
                          </span>
                          {description && (
                            <span className="mt-0.5 block truncate text-xs text-muted">
                              {description}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/oferta"
                  onClick={closeAll}
                  className="mt-1.5 flex items-center justify-between rounded-xl border-t border-white/10 px-3 pt-3 pb-2.5 text-xs text-muted transition-colors hover:text-foreground"
                >
                  Zobacz całą ofertę
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </li>

          <li>
            <Link
              href="/kontakt"
              aria-current={pathname === "/kontakt" ? "page" : undefined}
              className={`${linkBase} ${color("/kontakt")}`}
            >
              Kontakt
            </Link>
          </li>
        </ul>

        <div className="flex items-center justify-end gap-2 md:ml-auto lg:ml-0 lg:flex-1">
          <a
            href={PANEL_URL}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-background transition-[transform,opacity] duration-150 ease-out hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.97] max-sm:hidden sm:h-11"
          >
            <svg
              viewBox="0 0 16 16"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              aria-hidden
            >
              <circle cx="8" cy="5.5" r="2.75" />
              <path d="M2.75 13.75c.9-2.3 2.9-3.5 5.25-3.5s4.35 1.2 5.25 3.5" />
            </svg>
            Panel klienta
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-foreground hover:bg-white/5 md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-10">
            <li>
              <Link
                href="/"
                onClick={closeAll}
                className="flex h-12 items-center text-base text-foreground"
              >
                Strona główna
              </Link>
            </li>
            <li>
              <Link
                href="/oferta"
                onClick={closeAll}
                className="flex h-12 items-center text-base text-foreground"
              >
                Oferta
              </Link>
              <ul className="mb-2 border-l border-white/10 pl-4">
                {offer.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeAll}
                      className="flex h-11 items-center gap-2 text-[15px] text-muted"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                href="/kontakt"
                onClick={closeAll}
                className="flex h-12 items-center text-base text-foreground"
              >
                Kontakt
              </Link>
            </li>
            <li className="pt-3 pb-2 sm:hidden">
              <a
                href={PANEL_URL}
                className="flex h-12 items-center justify-center rounded-full bg-accent text-sm font-medium text-background"
              >
                Panel klienta
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
