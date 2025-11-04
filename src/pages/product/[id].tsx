import { ProductDetails } from "@/features";
import { withLayout } from "@/hocs";
import { GetStaticProps } from "next";

export default withLayout(ProductDetails);

export const getStaticPaths = async () => {
  // const res = await fetch("https://dummyjson.com/products");
  // const products: Product[] = await res.json();

  // const paths = products.map((product) => ({
  //   params: { id: product.id.toString() },
  // }));

  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
      { params: { id: "5" } },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const product = await res.json();

  return {
    props: {
      product,
    },
    revalidate: 300,
  };
};
