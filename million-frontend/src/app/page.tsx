import Filters from "@/components/Filters";
import SortSelect from "@/components/SortSelect";
import Results from "@/app/_components/Results";
import SkeletonCard from "@/components/SkeletonCard";
import FeaturedProperty from "@/components/FeaturedProperty";
import { fetchProperties } from "@/lib/api";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const params = (await searchParams) ?? {};
  // Obtener la propiedad más cara GLOBAL (sin filtros)
  const featuredResult = await fetchProperties({ sort: "priceDesc", page: 1, pageSize: 1 });
  const featured = featuredResult?.items?.[0];
  return (
    <main className="mx-auto max-w-7xl p-8 space-y-8">
      {/* Propiedad destacada */}
      <FeaturedProperty property={featured} />
      <header className="space-y-3">
        <h1 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-saira), sans-serif', fontWeight: 400 }}>Explora propiedades de lujo</h1>
        <p className="text-zinc-600 muted">Filtra por nombre, dirección y rango de precio.</p>
        <div className="flex items-center gap-3 justify-between flex-wrap">
          <Filters />
          <SortSelect />
        </div>
      </header>

      <Suspense
        key={JSON.stringify(params)}
        fallback={
          <section className="grid md:grid-cols-2 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </section>
        }
      >
        {/* Server component renders results and pagination */}
        <Results params={params} />
      </Suspense>
    </main>
  );
}
