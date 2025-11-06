import { EmptyComponent, ErrorComponent } from "@/components";
import { ProductsComponent } from "./products-component";

export function Home({
  products,
  error,
}: {
  products: Product[];
  error?: string;
}) {
  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (!products.length) {
    return <EmptyComponent message="No product(s) to show ):" />;
  }

  return <ProductsComponent products={products} />;
}
