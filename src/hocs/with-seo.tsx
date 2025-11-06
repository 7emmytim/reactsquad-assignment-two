import Head from "next/head";
import React from "react";

export type Props = {
  title: string;
};

export const withSEO =
  (seo: Props) =>
  <T extends object>(WrappedComponent: React.ComponentType<T>): React.FC<T> => {
    const WithSEO: React.FC<T> = (props) => (
      <>
        <Head>
          <title>{seo.title}</title>
        </Head>
        <WrappedComponent {...props} />
      </>
    );

    return WithSEO;
  };
