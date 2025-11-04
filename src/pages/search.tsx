import { SearchProducts } from "@/features";
import { withLayout } from "@/hocs";
import { GetServerSideProps } from "next";

export default withLayout(SearchProducts);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = (context.query.q as string) || "";

  const res = await fetch(
    `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=60",
      },
    }
  );

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const data = await res.json();

  return {
    props: {
      products: data.products ?? [],
      query,
    },
  };
};
