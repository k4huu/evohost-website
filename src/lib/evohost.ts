// Publiczne API katalogu: https://docs.evohost.pl/
const API_URL = "https://dash.evohost.pl/api/v1";

// Katalog odświeżany co 5 minut — zmiany w panelu pojawią się na stronie bez przebudowy.
const REVALIDATE = 300;

export const PANEL_URL = "https://dash.evohost.pl";
export const DISCORD_URL = "https://discord.gg/k5tXxNNXRc";

// Dane firmy w stopce. Puste NIP i REGON wyświetlają się jako kreski.
export const COMPANY = {
  name: "EvoHost",
  form: "Niezarejestrowana działalność gospodarcza",
  nip: null as string | null, // np. "123-456-78-90"
  regon: null as string | null,
  asn: "AS219173",
  email: "kontakt@evohost.pl",
};

export type ServiceType = "vps" | "game" | "protection";

// Typy usług, których na razie nie pokazujemy, nawet jeśli przyjdą z API
const HIDDEN_TYPES: ServiceType[] = ["vps"];

export type Category = {
  slug: string;
  name: string;
  type: ServiceType;
  typeLabel: string;
  description: string | null;
  imageUrl: string | null;
  hardware: {
    cpu: string | null;
    memoryType: "DDR3" | "DDR4" | "DDR5" | null;
    diskType: "NVMe" | "SSD" | "HDD" | null;
    summary: string | null;
  };
};

export type Plan = {
  slug: string;
  name: string;
  type: ServiceType;
  typeLabel: string;
  game: string | null;
  price: number;
  currency: "PLN";
  cpuCores: number | null;
  ramGb: number | null;
  diskGb: number | null;
  trafficGb: number | null;
  maxPlayers: number | null;
  maxBackends: number | null;
  maxDomains: number | null;
  features: string[];
  isPopular: boolean;
  orderUrl: string;
  category: { slug: string; name: string } | null;
};

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    return ((await res.json()) as { data: T }).data;
  } catch {
    return null;
  }
}

/** Kategorie widoczne w sklepie. Przy błędzie API zwraca pustą listę, żeby strona dalej działała. */
export async function getCategories(): Promise<Category[]> {
  const categories = (await get<Category[]>("/categories")) ?? [];
  return categories.filter((c) => !HIDDEN_TYPES.includes(c.type));
}

/** Kategoria z planami albo `null`, gdy nie istnieje lub jest ukryta. */
export async function getCategory(slug: string) {
  const category = await get<Category & { plans: Plan[] }>(
    `/categories/${encodeURIComponent(slug)}`,
  );
  return category && !HIDDEN_TYPES.includes(category.type) ? category : null;
}

/** Wszystkie widoczne plany, w kolejności ze sklepu. */
export async function getPlans(): Promise<Plan[]> {
  const plans = (await get<Plan[]>("/plans")) ?? [];
  return plans.filter((p) => !HIDDEN_TYPES.includes(p.type));
}

// Nazwy w panelu bywają wpisane małą literą („minecraft”)
export function displayName(name: string) {
  return name.charAt(0).toLocaleUpperCase("pl") + name.slice(1);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);
}

// API podaje ułamki (np. 0.5 vCPU, 0.5 GB RAM), więc liczby formatujemy po polsku
export function formatNumber(value: number) {
  return new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 2 }).format(
    value,
  );
}

export function formatSize(gb: number) {
  return gb < 1 ? `${formatNumber(gb * 1024)} MB` : `${formatNumber(gb)} GB`;
}
