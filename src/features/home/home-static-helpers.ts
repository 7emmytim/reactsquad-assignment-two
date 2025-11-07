import { fetchProducts } from "@/lib";
import type { GetStaticProps } from "next";

interface StaticProps {
  products: Product[];
  error?: string;
}

export const getProductsStaticProps: GetStaticProps<StaticProps> = async () => {
  try {
    const products = await fetchProducts();

    return {
      props: { products },
      revalidate: 300,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      props: {
        products: [],
        error: message,
      },
      revalidate: 300,
    };
  }
};
