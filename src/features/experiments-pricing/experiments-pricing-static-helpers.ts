import { fetchProducts, PRICING_COOKIE } from "@/lib";
import cookie from "cookie";
import { IncomingMessage, ServerResponse } from "http";
import type { GetServerSideProps } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

interface PricingProps {
  products: Product[];
  bucket: "A" | "B";
}

export type Bucket = "A" | "B";

export function parseBucketCookie(req: IncomingMessage & {
  cookies: NextApiRequestCookies
}): Bucket | undefined {
  const cookies = cookie.parse(req.headers.cookie || "");
  return cookies[PRICING_COOKIE] as Bucket | undefined;
}

export function createBucket(): Bucket {
  return Math.random() < 0.5 ? "A" : "B";
}

export function setBucketCookie(res: ServerResponse<IncomingMessage>, bucket: Bucket) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(PRICING_COOKIE, bucket, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      httpOnly: false,
    })
  );
}

export function clearBucketCookie(res: ServerResponse<IncomingMessage>) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(PRICING_COOKIE, "", {
      maxAge: 0,
      path: "/",
    })
  );
}


export const getPricingServerSideProps: GetServerSideProps<PricingProps> = async ({
  req,
  res,
  query,
}) => {
  const reset = query.reset === "1";
  if (reset) {
    clearBucketCookie(res);
    return {
      redirect: {
        destination: "/experiments/pricing",
        permanent: false,
      },
    };
  }

  let bucket = parseBucketCookie(req);

  if (!bucket) {
    bucket = createBucket();
    setBucketCookie(res, bucket);
  }

  const products = await fetchProducts({ limit: 6, bucket });

  return {
    props: {
      products,
      bucket,
    },
  };
};
