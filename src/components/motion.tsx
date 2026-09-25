"use client";

import {
  motion,
  MotionConfig,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef, type ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

/** Wyłącza animacje ruchu dla osób z włączonym „ogranicz ruch” w systemie. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

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
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
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
  const Component = motion[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };
  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "-80px" } })}
    >
      {children}
    </Component>
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
  const Component = motion[as];
  return (
    <Component className={className} variants={revealVariants}>
      {children}
    </Component>
  );
}

/** Tło hero: przy przewijaniu przesuwa się wolniej i lekko przybliża. */
export function ParallaxBackground({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <div ref={ref} className="absolute inset-0 -z-20 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Kafelek, który lekko unosi się pod kursorem. */
export function Lift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
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
  const Component = motion[as];
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "110%", rotate: 4 },
    show: {
      y: "0%",
      rotate: 0,
      transition: { duration: 0.9, ease: EASE },
    },
  };

  return (
    <Component
      className={className}
      aria-label={text}
      variants={container}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "-60px" } })}
    >
      {words.map((w, i) => (
        // pb/-mb zostawiają miejsce na ogonki liter (ę, ą, j) wewnątrz maski
        <span
          key={i}
          aria-hidden
          className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
        >
          <motion.span className="inline-block origin-top-left" variants={word}>
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Component>
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
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const background = useTransform(
    [x, y],
    ([lx, ly]) =>
      `radial-gradient(${size}px circle at ${lx}px ${ly}px, ${color}, transparent 70%)`,
  );

  return (
    <div
      className={`group/spot relative ${className ?? ""}`}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background }}
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
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.3 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.3 });

  return (
    <motion.div
      className={`inline-block ${className ?? ""}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
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
  return (
    <motion.span
      aria-hidden
      className={`block origin-left ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    />
  );
}
