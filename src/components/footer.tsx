import Image from "next/image";
import Link from "next/link";
import {
  COMPANY,
  DISCORD_URL,
  displayName,
  PANEL_URL,
  type Category,
} from "@/lib/evohost";

const linkClass = "text-muted transition-colors hover:text-foreground";

export function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="EvoHost — strona główna">
            <Image
              src="/logos/logotype-white.png"
              alt="EvoHost"
              width={1193}
              height={232}
              className="h-auto w-[120px]"
            />
          </Link>
        </div>

        <nav aria-label="Oferta">
          <h2 className="text-sm font-medium text-foreground">Oferta</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/oferta/${c.slug}`} className={linkClass}>
                  {displayName(c.name)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="EvoHost">
          <h2 className="text-sm font-medium text-foreground">EvoHost</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={PANEL_URL} className={linkClass}>
                Panel klienta
              </a>
            </li>
            <li>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Discord
              </a>
            </li>
            <li>
              <Link href="/kontakt" className={linkClass}>
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/regulamin" className={linkClass}>
                Regulamin
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-medium text-foreground">Firma</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              {COMPANY.name}. {COMPANY.form}
            </li>
            <li className="tabular-nums">NIP: {COMPANY.nip ?? "---------"}</li>
            <li className="tabular-nums">
              Regon: {COMPANY.regon ?? "---------"}
            </li>
            <li className="tabular-nums">ASN: {COMPANY.asn}</li>
            <li>
              Email:{" "}
              <a href={`mailto:${COMPANY.email}`} className={linkClass}>
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl border-t border-white/5 px-4 py-8 text-xs text-muted sm:px-10">
        © {new Date().getFullYear()} EvoHost
      </div>
    </footer>
  );
}
