import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { Metadata } from "../types";

const NotFoundPage = () => {
  const meta = useStaticQuery(graphql`
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
  const metadata: Metadata = {
    description: `The requested page was not found. But here are the alternatives`,
    title: `Page not found - ${meta.site.siteMetadata.title}`,
    url: meta.site.siteMetadata.siteUrl,
    twitter: meta.site.siteMetadata.social.twitter,
  };
  return (
    <PageLayout
      metadata={metadata}
      header={
        <h1 className="text-4xl font-bold">
          Page not found
          <span role="img" aria-label="Pensive emoji">
            😔
          </span>
        </h1>
      }
    />
  );
};

export default NotFoundPage;
