import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { BlogSnippet } from "../components/PostSnippet";
import { SiteQueryResult, BlogPostsQueryResult } from "../types";

export default function TagPage(
  props: PageProps<SiteQueryResult & BlogPostsQueryResult, { tags: string[] }>
) {
  const { data, pageContext } = props;
  const { site, blog } = data;
  const metadata = {
    description: `My posts I wrote about ${pageContext.tags[0]}`,
    image: "none",
    title: `Topic: ${pageContext.tags[0]} - ${site.siteMetadata.title}`,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout
      social={site.siteMetadata.social}
      activeLinkUrl="/blog"
      metadata={metadata}
      header={
        <h1 className="text-4xl font-bold py-10">
          Topic: {pageContext.tags[0]}
        </h1>
      }
    >
      <div className="prose prose-lg dark:prose-dark">
        {blog.posts.map((post) => {
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
  query TagPage($tags: [String]) {
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
    blog: allMarkdownRemark(filter: { frontmatter: { tags: { in: $tags } } }) {
      posts: nodes {
        id
        excerpt
        fields {
          slug
        }
        frontmatter {
          tags
          date(formatString: "DD.MM.yyyy")
          title
        }
      }
    }
  }
`;
