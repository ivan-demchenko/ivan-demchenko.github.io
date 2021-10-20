import * as React from "react";
import { graphql, Link } from "gatsby";
import { PostLayout } from "../components/PostLayout";

export default function BlogPost({ data }: any) {
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
        Posted on {post.frontmatter.date}. Reading time{" "}
        {Math.ceil(post.wordCount.words / 100)} mins.
      </aside>
      <article
        className="prose prose-lg dark:prose-dark"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <aside className="my-12">
        <Link to="/blog">Back</Link> to other posts.
      </aside>
    </PostLayout>
  );
}

export const pageQuery = graphql`
  query BlogQuery($slug: String) {
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
        title
        date(formatString: "DD MMMM YYYY")
      }
    }
  }
`;
