import { ProductDetails } from "@/features";
import { withLayout, withSEO } from "@/hocs";
import { GetStaticProps } from "next";

export default withLayout(
  withSEO({ title: "Product Details" })(ProductDetails)
);

export const getStaticPaths = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=5");
  const data: { products: Product[] } = await res.json();

  const paths = data.products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;

    if (!id) {
      return { notFound: true };
    }

    const productResponse = await fetch(`https://dummyjson.com/products/${id}`);
    if (!productResponse.ok) throw new Error("Failed to fetch product");

    const product: Product = await productResponse.json();

    const relatedResponse = await fetch(
      `https://dummyjson.com/products/category/${encodeURIComponent(
        product.category
      )}?limit=4`
    );

    const data: { products: Product[] } = await relatedResponse.json();
    const products = data.products.filter((product) => `${product.id}` !== id);

    return {
      props: {
        product,
        products,
      },
      revalidate: 300,
    };
  } catch {
    return { notFound: true };
  }
};
