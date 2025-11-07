import { fetchCategories, searchProducts } from "@/lib";
import type { GetServerSideProps } from "next";

interface ServerProps {
  query: string;
  products: Product[];
  categories: string[] | null;
  error?: string;
}

export const getSearchServerSideProps: GetServerSideProps<ServerProps> = async ({ query, res }) => {
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

    const products = await searchProducts(q);

    const categories = products.length === 0 ? await fetchCategories() : null;

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
