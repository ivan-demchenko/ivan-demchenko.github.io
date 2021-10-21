import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { Metadata, SiteQueryResult } from "../types";

export default function NotFoundPage({ data }: PageProps<SiteQueryResult>) {
  const { site } = data;

  const metadata: Metadata = {
    description: `The requested page was not found. But here are the alternatives`,
    title: `Page not found - ${site.siteMetadata.title}`,
    url: site.siteMetadata.siteUrl,
    twitter: site.siteMetadata.social.twitter,
  };

  return (
    <PageLayout
      social={site.siteMetadata.social}
      activeLinkUrl="/404"
      metadata={metadata}
      header={
        <h1 className="text-4xl font-bold py-10">
          Page not found
          <span role="img" aria-label="Pensive emoji">
            😔
          </span>
        </h1>
      }
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
          github
          linkedin
        }
      }
    }
  }
`;
