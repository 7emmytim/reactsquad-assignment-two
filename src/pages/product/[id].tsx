import {
  getProductStaticPaths,
  getProductStaticProps,
  ProductDetails,
} from "@/features";
import { withLayout, withSEO } from "@/hocs";

export default withLayout(
  withSEO({ title: "Product Details" })(ProductDetails)
);

export const getStaticPaths = getProductStaticPaths;
export const getStaticProps = getProductStaticProps;
