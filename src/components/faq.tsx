"use client";

import { useId, useState } from "react";
import { Stagger } from "@/components/motion";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <Stagger className="divide-y divide-white/10 border-y border-white/10">
      {items.map(({ q, a }, i) => {
        const isOpen = open === i;
        return (
          <div key={q} className="rv">
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
                <span
                  aria-hidden
                  className={`relative size-4 shrink-0 text-muted transition-transform duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <span className="absolute top-1/2 left-0 h-px w-4 bg-current" />
                  <span
                    className={`absolute top-0 left-1/2 h-4 w-px bg-current transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      isOpen ? "scale-y-0" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>
            {/* Odpowiedź zostaje w HTML także po zwinięciu (czytają ją wyszukiwarki),
                a grid-rows 0fr → 1fr animuje wysokość bez mierzenia w JS */}
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-450 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[60ch] pb-6 leading-relaxed text-muted">
                  {a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Stagger>
  );
}
