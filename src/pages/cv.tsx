import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { SiteQueryResult } from "../types";

export default function CVPage({ data }: PageProps<SiteQueryResult>) {
  const { site } = data;
  const metadata = {
    description: "There are the articles I wrote",
    image: "none",
    title: `CV - ${site.siteMetadata.title}`,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout
      social={site.siteMetadata.social}
      activeLinkUrl="/cv"
      metadata={metadata}
      header={<h1 className="text-4xl font-bold py-10">CV</h1>}
    >
      I did this and that...
    </PageLayout>
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
