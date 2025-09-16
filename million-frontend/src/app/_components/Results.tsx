import PropertyCard from "@/components/PropertyCard";
import Pagination from "@/components/Pagination";
import { fetchProperties } from "@/lib/api";

export default async function Results({
  params,
}: {
  params: Record<string, string | string[] | undefined>;
}) {
  const result = await fetchProperties({
    name: s(params.name),
    address: s(params.address),
    minPrice: s(params.minPrice),
    maxPrice: s(params.maxPrice),
    sort: s(params.sort),
    page: s(params.page) ?? 1,
    pageSize: s(params.pageSize) ?? 8,
  });

  return (
    <>
      {result.total === 0 ? (
        <p className="text-zinc-500">No se encontraron propiedades.</p>
      ) : (
        <>
          <section className="grid md:grid-cols-2 gap-8">
            {result.items.map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </section>
          <Pagination total={result.total} page={result.page} pageSize={result.pageSize} />
        </>
      )}
    </>
  );
}

function s(v: string | string[] | undefined): string | undefined {
  if (!v) return undefined;
  if (Array.isArray(v)) return v[0];
  return v;
}
