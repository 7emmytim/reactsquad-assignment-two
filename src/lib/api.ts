import { BASE_URL, VARIANT_MULTIPLIER } from "./constants";

interface Props {
  limit?: number
  bucket?: "A" | "B"
}

export async function fetchProducts(params?: Props): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}${params?.limit ? `?limit=${params.limit}` : ""}`);
  if (!res.ok) throw new Error("Failed to fetch products");

  const data: { products: Product[] } = await res.json();
  return params?.bucket ? data.products.map(
    ({ id, title, price, ...rest }: Product) => ({
      ...rest,
      id,
      title,
      price: params.bucket === "B" ? price * VARIANT_MULTIPLIER : price,
    })
  ) : data.products;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  return data.products ?? [];
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch {
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

export async function fetchRelatedProducts(category: string, productId: string): Promise<Product[]> {
  const res = await fetch(
    `${BASE_URL}/category/${encodeURIComponent(category)}?limit=4`
  );
  if (!res.ok) throw new Error("Failed to fetch related products");

  const data: { products: Product[] } = await res.json();
  return data.products.filter(({ id }) => `${id}` !== productId);
}