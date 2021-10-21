import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { WelcomeBanner } from "../components/WelcomeBanner";
import { SiteQueryResult } from "../types";

export default function IndexPage({ data }: PageProps<SiteQueryResult>) {
  const { site } = data;
  const metadata = {
    description: "Ivan's blog",
    image: "none",
    title: `About me - ${site.siteMetadata.title}`,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout
      activeLinkUrl="/about"
      metadata={metadata}
      header={<WelcomeBanner />}
    >
      <h1 className="text-4xl font-bold py-10">About me</h1>
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
