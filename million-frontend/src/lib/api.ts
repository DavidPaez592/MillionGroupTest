export type PropertyListItem = {
  id: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  imageUrl?: string | null;
  images?: string[];
};

export type PagedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type PropertyFilters = {
  name?: string;
  address?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  sort?: string;
  page?: string | number;
  pageSize?: string | number;
};

const API_BASE =
  typeof window === "undefined"
    ? "http://million-backend:8080" // Dentro del contenedor de Docker
    : "http://localhost:5084"; // Desde el navegador

export async function fetchProperties(
  filters: PropertyFilters,
): Promise<PagedResult<PropertyListItem>> {
  const url = new URL("/api/properties", API_BASE);
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).length > 0) url.searchParams.set(k, String(v));
  });

  console.log("Fetching from URL:", url.toString()); // Added for debugging

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return (await res.json()) as PagedResult<PropertyListItem>;
}

export type PropertyDetail = PropertyListItem & { year?: number; codeInternal?: string };

export async function fetchProperty(id: string): Promise<PropertyDetail> {
  const res = await fetch(`${API_BASE}/api/properties/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Not found`);
  return (await res.json()) as PropertyDetail;
}
