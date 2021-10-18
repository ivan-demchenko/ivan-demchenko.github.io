import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { WelcomeBanner } from "../components/WelcomeBanner";

const IndexPage = () => {
  const queryResult = useStaticQuery(graphql`
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
  `);
  const metadata = {
    description: "Ivan's blog",
    image: "none",
    title: `About me - ${queryResult.site.siteMetadata.title}`,
    twitter: queryResult.site.siteMetadata.social.twitter,
    url: queryResult.site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout metadata={metadata} header={<WelcomeBanner />}>
      <h1 className="text-4xl font-bold">About me</h1>
    </PageLayout>
  );
};

export default IndexPage;
