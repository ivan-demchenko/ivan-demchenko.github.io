import * as React from "react";
import { graphql } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { WelcomeBanner } from "../components/WelcomeBanner";

export default function IndexPage({ data }: any) {
  const { site } = data;
  const metadata = {
    description: "Ivan's blog",
    image: "none",
    title: `About me - ${site.siteMetadata.title}`,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout metadata={metadata} header={<WelcomeBanner />}>
      <h1 className="text-4xl font-bold">About me</h1>
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
