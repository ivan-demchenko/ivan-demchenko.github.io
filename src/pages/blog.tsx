import * as React from "react";
import { graphql } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { BlogSnippet } from "../components/PostSnippet";

export default function IndexPage({ data }: any) {
  const { site, blog } = data;
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
      {blog.posts.map((post: any) => {
        return (
          <BlogSnippet
            id={post.id}
            date={post.frontmatter.date}
            slug={post.frontmatter.slug}
            title={post.frontmatter.title}
            excerpt={post.excerpt}
          />
        );
      })}
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
    blog: allMarkdownRemark(limit: 10) {
      posts: nodes {
        id
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD.MM.yyyy")
          title
        }
      }
    }
  }
`;
