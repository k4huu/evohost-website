"use client";

import {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

// Animacje wejścia robi CSS (klasy .rv, .rv-word, .rv-line w globals.css).
// Tu tylko przełączamy data-rv: "now" animuje od razu, "wait" czeka na wjechanie
// w ekran i zmienia się w "in". Hero nie czeka więc na załadowanie JS.

type RvState = "now" | "wait" | "in";

/** Stan animacji: od razu albo po wjechaniu elementu w ekran (margines od dołu). */
function useReveal<T extends HTMLElement>(immediate: boolean, margin = 80) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (immediate || !el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: `0px 0px -${margin}px 0px` },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate, margin]);

  const state: RvState = immediate ? "now" : inView ? "in" : "wait";
  return [ref, state] as const;
}

function delayStyle(delay: number): CSSProperties | undefined {
  return delay ? ({ "--delay": `${delay}s` } as CSSProperties) : undefined;
}

/** Pojawia się przy wjechaniu w ekran. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, state] = useReveal<HTMLDivElement>(false);
  return (
    <div
      ref={ref}
      data-rv={state}
      className={`rv ${className ?? ""}`}
      style={delayStyle(delay)}
    >
      {children}
    </div>
  );
}

/** Kontener, którego dzieci (`StaggerItem`) pojawiają się jedno po drugim. */
export function Stagger({
  children,
  className,
  as = "div",
  delay = 0,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  delay?: number;
  /** Animuj od razu po załadowaniu, a nie przy przewinięciu (np. w hero). */
  immediate?: boolean;
}) {
  const [ref, state] = useReveal<HTMLElement>(immediate);
  return createElement(
    as,
    {
      ref,
      "data-rv": state,
      className: `rv-group ${className ?? ""}`,
      style: delayStyle(delay),
    },
    children,
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  return createElement(as, { className: `rv ${className ?? ""}` }, children);
}

/** Tło hero: pojawia się, a przy przewijaniu przesuwa się wolniej i lekko przybliża. */
export function ParallaxBackground({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      <div className="hero-parallax absolute inset-0">{children}</div>
      {/* Znika zasłona, a nie obrazek: obrazek z opacity 0 opóźnia LCP */}
      <div aria-hidden className="hero-cover absolute inset-0 bg-background" />
    </div>
  );
}

/** Nagłówek, którego słowa wyjeżdżają spod maski jedno po drugim. */
export function WordReveal({
  text,
  as = "h2",
  className,
  immediate = false,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  immediate?: boolean;
  delay?: number;
}) {
  const [ref, state] = useReveal<HTMLHeadingElement>(immediate, 60);
  const words = text.split(" ");

  return createElement(
    as,
    {
      ref,
      "data-rv": state,
      "aria-label": text,
      className,
      style: delayStyle(delay),
    },
    words.map((w, i) => (
      <Fragment key={i}>
        {/* pb/-mb zostawiają miejsce na ogonki liter (ę, ą, j) wewnątrz maski */}
        <span
          aria-hidden
          className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
        >
          <span
            className="rv-word inline-block origin-top-left"
            style={{ "--w": i } as CSSProperties}
          >
            {w}
          </span>
        </span>
        {/* Spacja poza maską: na końcu inline-block by się zwinęła */}
        {i < words.length - 1 && " "}
      </Fragment>
    )),
  );
}

/** Poświata podążająca za kursorem. Rodzic musi mieć `relative` i `overflow-hidden`. */
export function Spotlight({
  children,
  className,
  color = "rgb(255 255 255 / 0.07)",
  size = 420,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      className={`group/spot relative ${className ?? ""}`}
      onPointerMove={(e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, -9999px) var(--spot-y, -9999px), ${color}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

/** Przycisk przyciągany do kursora. */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  return (
    <div
      className={`inline-block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${className ?? ""}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}

/** Linia rysująca się od lewej przy wjechaniu w ekran. */
export function DrawLine({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const [ref, state] = useReveal<HTMLSpanElement>(false, 60);
  return (
    <span
      ref={ref}
      aria-hidden
      data-rv={state}
      className={`rv-line block origin-left ${className ?? ""}`}
      style={delayStyle(delay)}
    />
  );
}
