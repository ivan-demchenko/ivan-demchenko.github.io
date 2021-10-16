import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { PageLayout } from "../components/PageLayout";

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
    title: `Bookmarks - ${queryResult.site.siteMetadata.title}`,
    twitter: queryResult.site.siteMetadata.social.twitter,
    url: queryResult.site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout
      metadata={metadata}
      header={<h1 className="text-4xl font-bold">Bookmarks</h1>}
    />
  );
};

export default IndexPage;
