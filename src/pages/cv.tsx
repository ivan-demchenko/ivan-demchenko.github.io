import * as React from "react";
import { graphql } from "gatsby";
import { PageLayout } from "../components/PageLayout";

export default function CVPage({ data }: any) {
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
      metadata={metadata}
      header={<h1 className="text-4xl font-bold">CV</h1>}
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
        }
      }
    }
  }
`;
