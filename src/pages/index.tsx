import { Home } from "@/features";
import { withLayout, withSEO } from "@/hocs";
import { GetStaticProps } from "next";
// import { compose } from "ramda";

// export default compose(withLayout, withSEO({ title: "Home" }))(Home);
export default withLayout(withSEO({ title: "Home" })(Home));

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data: { products: Product[] } = await res.json();

    return {
      props: {
        products: data.products,
      },
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
