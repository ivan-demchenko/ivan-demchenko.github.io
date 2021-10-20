import * as React from "react";
import { graphql } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { Greeting } from "../components/Greeting";
import { BlogSnippet } from "../components/PostSnippet";

export default function IndexPage({ data }: any) {
  const { site, blog } = data;
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
        {blog.posts.map((post: any) => {
          return (
            <BlogSnippet
              id={post.id}
              date={post.frontmatter.date}
              slug={post.fields.slug}
              title={post.frontmatter.title}
              excerpt={post.excerpt}
            />
          );
        })}
      </>
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
    blog: allMarkdownRemark(limit: 3) {
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
