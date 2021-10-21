import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { PostLayout } from "../components/PostLayout";
import { PostQueryResult, SiteQueryResult } from "../types";
import { PostTag } from "../components/PostTag";

export default function BlogPost({
  data,
}: PageProps<SiteQueryResult & PostQueryResult>) {
  const { site, post } = data;
  const metadata = {
    description: post.excerpt,
    image: "none",
    title: `${post.frontmatter.title} - ${site.siteMetadata.title}`,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PostLayout
      metadata={metadata}
      header={
        <div className="bg-gradient-to-br dark:from-gray-800 dark:to-black from-gray-100 to-white py-16">
          <h1 className="text-4xl font-bold">{post.frontmatter.title}</h1>
        </div>
      }
    >
      <aside className="text-sm py-6 italic">
        <p>Posted on {post.frontmatter.date}.</p>
        <p>Reading time {Math.ceil(post.wordCount.words / 100)} mins.</p>
      </aside>
      <article
        className="prose prose-lg dark:prose-dark border-b-2 border-gray-800 pb-8 mb-8"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <aside>
        Topic(s) of this post:{" "}
        {post.frontmatter.tags.map((tag) => (
          <PostTag key={tag} tag={tag} />
        ))}
      </aside>
      <aside className="my-12">
        <Link to="/blog">&larr; Back to other posts.</Link>
      </aside>
    </PostLayout>
  );
}

export const pageQuery = graphql`
  query BlogQuery($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        social {
          twitter
        }
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      wordCount {
        words
      }
      html
      excerpt
      frontmatter {
        tags
        title
        date(formatString: "DD MMMM YYYY")
      }
    }
  }
`;
