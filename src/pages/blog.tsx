import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { BlogSnippet } from "../components/PostSnippet";
import { getUniqueTags } from "../utils";
import {
  SiteQueryResult,
  BlogPostsQueryResult,
  TagsQueryResult,
} from "../types";
import { PostTag } from "../components/PostTag";

export default function BlogPage({
  data,
}: PageProps<SiteQueryResult & BlogPostsQueryResult & TagsQueryResult>) {
  const { site, blog, tags } = data;
  const uniqueTags = getUniqueTags(tags);
  const metadata = {
    description: "There are the articles I wrote",
    image: "none",
    title: `Blog - ${site.siteMetadata.title}`,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout
      social={site.siteMetadata.social}
      activeLinkUrl="/blog"
      metadata={metadata}
      header={<h1 className="text-4xl font-bold py-10">Blog</h1>}
    >
      <div className="flex flex-wrap items-start">
        {uniqueTags.map((tag) => (
          <PostTag key={tag} tag={tag} />
        ))}
      </div>
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
  query BlogPage {
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
    tags: allMarkdownRemark {
      nodes {
        frontmatter {
          tags
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
