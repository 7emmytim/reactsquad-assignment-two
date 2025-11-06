import { ExperimentsPricing } from "@/features";
import { withLayout, withSEO } from "@/hocs";
import cookie from "cookie";
import { GetServerSideProps } from "next";

const PRICING_COOKIE = "exp_price_bucket";
const VARIANT_MULTIPLIER = 1.08;

export default withLayout(
  withSEO({ title: "Experiments Pricing" })(ExperimentsPricing)
);

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  let bucket = cookies[PRICING_COOKIE] as "A" | "B" | undefined;

  if (query.reset === "1") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(PRICING_COOKIE, "", {
        maxAge: 0,
        path: "/",
      })
    );
    return {
      redirect: {
        destination: "/experiments/pricing",
        permanent: false,
      },
    };
  }

  if (!bucket) {
    bucket = Math.random() < 0.5 ? "A" : "B";
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(PRICING_COOKIE, bucket, {
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
        httpOnly: false,
      })
    );
  }

  const response = await fetch("https://dummyjson.com/products?limit=6");
  const data = await response.json();
  const products: Product[] = data.products.map(
    ({ id, title, price, ...products }: Product) => ({
      ...products,
      id,
      title,
      price: bucket === "B" ? price * VARIANT_MULTIPLIER : price,
    })
  );

  return {
    props: {
      products,
      bucket,
    },
  };
};
