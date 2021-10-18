import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
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
      allMarkdownRemark(limit: 10) {
        nodes {
          id
          frontmatter {
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
      header={<h1 className="text-7xl font-bold">Blog</h1>}
    >
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
    </PageLayout>
  );
};

export default IndexPage;
