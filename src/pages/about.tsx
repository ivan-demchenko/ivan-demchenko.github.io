import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { WelcomeBanner } from "../components/WelcomeBanner";
import { SiteQueryResult } from "../types";

export default function IndexPage({
  data,
}: PageProps<SiteQueryResult & { pocket: any }>) {
  const { site, pocket } = data;
  const metadata = {
    description: "Ivan's blog",
    image: "none",
    title: `About me - ${site.siteMetadata.title}`,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout
      social={site.siteMetadata.social}
      activeLinkUrl="/about"
      metadata={metadata}
      header={<WelcomeBanner />}
    >
      <section>
        <h2 className="text-4xl pb-10">About me</h2>
        <p>Lorem ipsum</p>
      </section>
      <section className="mb-10">
        <h2 className="text-4xl pb-10">Articles in my Pocket</h2>
        <div className="flex flex-wrap box-border">
          {pocket.nodes.map((node: any) => {
            return (
              node.title && (
                <a
                  href={node.url}
                  target="_blank"
                  className="w-1/4 m-4 p-4 dark:border-gray-800 border-2 rounded-md hover:border-blue-800"
                >
                  {node.image && node.image.src && (
                    <img
                      className="w-full"
                      src={node.image.src}
                      title={node.title}
                      alt={node.title}
                    />
                  )}
                  <span className="font-bold mb-2 text-blue-300">
                    {node.title}
                  </span>
                </a>
              )
            );
          })}
        </div>
      </section>
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
    pocket: allPocketArticle(limit: 10) {
      nodes {
        title
        url
        image {
          src
        }
      }
    }
  }
`;
