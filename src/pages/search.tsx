import { SearchProducts } from "@/features";
import { withLayout, withSEO } from "@/hocs";
import { GetServerSideProps } from "next";

export default withLayout(
  withSEO({ title: "Search Products" })(SearchProducts)
);

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const q = (query.q as string) || "";

  res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60");

  try {
    if (!q) {
      return {
        props: {
          query: q,
          products: [],
          categories: null,
        },
      };
    }

    const productResponse = await fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`
    );

    if (!productResponse.ok) throw new Error("Failed to fetch products");

    const productData = await productResponse.json();
    const products: Product[] = productData.products ?? [];

    const categories =
      products.length === 0
        ? await fetch("https://dummyjson.com/products/categories")
            .then((r) => r.json())
            .catch(() => [])
        : null;

    return {
      props: {
        query: q,
        products,
        categories,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return {
      props: {
        query: q,
        products: [],
        categories: null,
        error: message,
      },
    };
  }
};
