import { getProductsStaticProps, Home } from "@/features";
import { withLayout, withSEO } from "@/hocs";
// import { compose } from "ramda";

// export default compose(withLayout, withSEO({ title: "Home" }))(Home);
export default withLayout(withSEO({ title: "Home" })(Home));

export const getStaticProps = getProductsStaticProps;
