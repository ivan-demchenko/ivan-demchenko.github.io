import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { Greeting } from "../components/Greeting";
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
      allMarkdownRemark(limit: 3) {
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
    description: "Ivan's blog",
    image: "none",
    title: site.siteMetadata.title,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout metadata={metadata} header={<Greeting />}>
      <>
        <h2 className="text-3xl pb-6">Latest blog posts</h2>
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
      </>
    </PageLayout>
  );
};

export default IndexPage;
