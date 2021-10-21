import * as React from "react";
import { graphql } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { BlogSnippet } from "../components/PostSnippet";

export default function BlogPage({ data }: any) {
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
      header={<h1 className="text-4xl font-bold py-10">Blog</h1>}
    >
      <div className="prose prose-lg dark:prose-dark">
        {blog.posts.map((post: any) => {
          return (
            <BlogSnippet
              key={post.id}
              date={post.frontmatter.date}
              slug={post.fields.slug}
              title={post.frontmatter.title}
              excerpt={post.excerpt}
            />
          );
        })}
      </div>
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
          date(formatString: "DD MMMM YYYY")
          title
        }
      }
    }
  }
`;
