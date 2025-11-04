import { Home } from "@/features";
import { withLayout } from "@/hocs";

export default withLayout(Home);

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/products");
  const data: { products: Product[] } = await res.json();

  return {
    props: {
      products: data?.products,
    },
    revalidate: 300,
  };
}
