import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { Greeting } from "../components/Greeting";

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
          frontmatter {
            slug
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
    <PageLayout metadata={metadata}>
      <Greeting />
      <section>
        <h2 className="text-3xl font-bold">Latest blog posts</h2>
        <ul>
          {allMarkdownRemark.nodes.map((node: any) => {
            return (
              <li key={node.id}>
                <h3>
                  <Link to={`/blog/${node.frontmatter.slug}`}>
                    {node.frontmatter.title}
                  </Link>
                </h3>
              </li>
            );
          })}
        </ul>
      </section>
    </PageLayout>
  );
};

export default IndexPage;
