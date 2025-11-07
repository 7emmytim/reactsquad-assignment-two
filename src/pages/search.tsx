import { getSearchServerSideProps, SearchProducts } from "@/features";
import { withLayout, withSEO } from "@/hocs";

export default withLayout(
  withSEO({ title: "Search Products" })(SearchProducts)
);

export const getServerSideProps = getSearchServerSideProps;
