import { ProductsComponent } from "@/features";
import Link from "next/link";

export function ExperimentsPricing({
  products,
  bucket,
}: {
  products: Product[];
  bucket: string;
}) {
  return (
    <div>
      <p className="text-3xl font-bold text-center">
        Pricing Experiment — Variant {bucket}
      </p>

      <div className="text-center my-10">
        <Link
          href="?reset=1"
          className="text-sm text-red-600 border border-red-600 px-3 py-2 rounded hover:bg-red-50"
        >
          Reset Experiment
        </Link>
      </div>

      <ProductsComponent products={products} withPrice />
    </div>
  );
}
