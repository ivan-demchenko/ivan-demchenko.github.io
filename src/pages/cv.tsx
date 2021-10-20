import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { PageLayout } from "../components/PageLayout";

const CVPage = () => {
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
  const { site, allMarkdownRemark } = queryResult;
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
};

export default CVPage;
