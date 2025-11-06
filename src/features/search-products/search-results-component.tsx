import { EmptyComponent, ErrorComponent } from "@/components";
import { ProductsComponent } from "@/features";

type Props = {
  products: Product[];
  query: string;
  error?: string;
};

export function SearchResultComponent({ products, error, query }: Props) {
  if (!query)
    return <EmptyComponent message="Please input search to show products ):" />;

  if (error) return <ErrorComponent error={error} />;

  if (!products.length)
    return <EmptyComponent message={`No results found for “${query}”`} />;

  return <ProductsComponent products={products} />;
}
