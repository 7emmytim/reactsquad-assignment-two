import { fetchProductById, fetchProducts, fetchRelatedProducts } from "@/lib";
import type { GetStaticPaths, GetStaticProps } from "next";

export const getProductStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await fetchProducts();

    const paths = products.map((product) => ({
      params: { id: product.id.toString() },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getProductStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id as string;

    if (!id) {
      return { notFound: true };
    }

    const product = await fetchProductById(id);
    const related = await fetchRelatedProducts(product.category, id);

    return {
      props: {
        product,
        products: related,
      },
      revalidate: 300,
    };
  } catch {
    return { notFound: true };
  }
};
