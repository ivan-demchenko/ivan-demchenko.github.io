import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { Greeting } from "../components/Greeting";
import { BlogSnippet } from "../components/PostSnippet";
import { getUniqueTags } from "../utils";
import {
  SiteQueryResult,
  BlogPostsQueryResult,
  TagsQueryResult,
} from "../types";
import { PostTag } from "../components/PostTag";

export default function IndexPage({
  data,
}: PageProps<SiteQueryResult & BlogPostsQueryResult & TagsQueryResult>) {
  const { site, tags, blog } = data;
  const uniqueTags = getUniqueTags(tags);

  const metadata = {
    description: "Ivan's blog",
    image: "none",
    title: site.siteMetadata.title,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout metadata={metadata} header={<Greeting />} activeLinkUrl="/">
      <h2 className="text-4xl pb-10">Recent blog posts</h2>
      <div className="prose prose-lg dark:prose-dark mb-8">
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
      <h2 className="text-4xl pb-10">Topics I write about</h2>
      <div className="flex flex-wrap">
        {uniqueTags.map((tag) => (
          <PostTag key={tag} tag={tag} />
        ))}
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
    tags: allMarkdownRemark {
      nodes {
        frontmatter {
          tags
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
          tags
          date(formatString: "DD.MM.yyyy")
          title
        }
      }
    }
  }
`;
