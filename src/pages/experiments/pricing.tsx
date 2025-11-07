import { ExperimentsPricing, getPricingServerSideProps } from "@/features";
import { withLayout, withSEO } from "@/hocs";

export default withLayout(
  withSEO({ title: "Experiments Pricing" })(ExperimentsPricing)
);

export const getServerSideProps = getPricingServerSideProps;
