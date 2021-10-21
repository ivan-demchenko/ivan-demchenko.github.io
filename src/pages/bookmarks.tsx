import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { SiteQueryResult } from "../types";

export default function IndexPage({ data }: PageProps<SiteQueryResult>) {
  const { site } = data;
  const metadata = {
    description: "Ivan's blog",
    image: "none",
    title: `Bookmarks - ${site.siteMetadata.title}`,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout
      metadata={metadata}
      header={<h1 className="text-4xl font-bold py-10">Bookmarks</h1>}
    />
  );
}

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`;
