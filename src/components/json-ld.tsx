// Dane strukturalne dla wyszukiwarek. Kilka encji na stronie łączymy w jeden @graph.
export function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };

  return (
    <script
      type="application/ld+json"
      // `<` zamieniamy, żeby tekst z API nie mógł zamknąć tagu <script>
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(json).replace(/</g, "\\u003c"),
      }}
    />
  );
}
