import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { BlogSnippet } from "../components/PostSnippet";

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
      allMarkdownRemark(limit: 10) {
        nodes {
          id
          excerpt
          frontmatter {
            slug
            date
            title
          }
        }
      }
    }
  `);
  const { site, allMarkdownRemark } = queryResult;
  const metadata = {
    description: "There are the articles I wrote",
    image: "none",
    title: `Blog - ${site.siteMetadata.title}`,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout
      metadata={metadata}
      header={<h1 className="text-4xl font-bold">Blog</h1>}
    >
      {allMarkdownRemark.nodes.map((node: any) => {
        return (
          <BlogSnippet
            id={node.id}
            date={node.frontmatter.date}
            slug={node.frontmatter.slug}
            title={node.frontmatter.title}
            excerpt={node.excerpt}
          />
        );
      })}
    </PageLayout>
  );
};

export default IndexPage;
