"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map(({ q, a }, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={q}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
          >
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left font-medium text-foreground"
              >
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  {q}
                </span>
                <motion.span
                  aria-hidden
                  className="relative size-4 shrink-0 text-muted"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <span className="absolute top-1/2 left-0 h-px w-4 bg-current" />
                  <motion.span
                    className="absolute top-0 left-1/2 h-4 w-px bg-current"
                    animate={{ scaleY: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[60ch] pb-6 leading-relaxed text-muted">
                    {a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
