import * as React from "react";
import { Helmet } from "react-helmet";
import { Metadata } from "../types";

export type SeoProps = {
  isBlogPost?: boolean;
  meta: Metadata;
};

export const Seo = (props: SeoProps) => {
  const { isBlogPost, meta } = props;
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="image" content={meta.image} />
      <link rel="canonical" href={meta.url} />

      <meta property="og:url" content={meta.url} />
      {isBlogPost ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      {meta.image ? <meta property="og:image" content={meta.image} /> : null}

      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:creator" content={meta.twitter} />
      <meta name="twitter:card" content="summary_large_image" />
      {meta.image ? <meta name="twitter:image" content={meta.image} /> : null}
    </Helmet>
  );
};
