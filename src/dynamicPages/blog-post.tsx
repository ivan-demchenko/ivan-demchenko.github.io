import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { PostLayout } from "../components/PostLayout";
import { PostQueryResult, SiteQueryResult } from "../types";
import { PostTag } from "../components/PostTag";

export default function BlogPost({
  data,
}: PageProps<SiteQueryResult & PostQueryResult & { pocket: any }>) {
  const { site, post, pocket } = data;
  const metadata = {
    description: post.excerpt,
    image: "none",
    title: `${post.frontmatter.title} - ${site.siteMetadata.title}`,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PostLayout
      social={site.siteMetadata.social}
      activeLinkUrl="/blog"
      metadata={metadata}
      header={
        <div className="bg-gradient-to-br dark:from-gray-800 dark:to-black from-gray-100 to-white py-16">
          <h1 className="text-4xl font-bold">{post.frontmatter.title}</h1>
        </div>
      }
    >
      <aside className="text-sm py-10 italic">
        <p>Posted on {post.frontmatter.date}.</p>
        <p>Reading time {Math.ceil(post.wordCount.words / 100)} mins.</p>
      </aside>
      <article
        className="prose prose-lg dark:prose-dark pb-8 mb-8"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <div className="divider">
        <i />
      </div>
      <aside className="my-12">
        Topic(s) of this post:{" "}
        {post.frontmatter.tags.map((tag) => (
          <PostTag key={tag} tag={tag} />
        ))}
      </aside>
      <aside className="my-12">
        <Link to="/blog">&larr; Back to other posts</Link>
      </aside>
      {pocket.nodes.length > 0 && (
        <>
          <h4 className="text-4xl pb-10 flex items-baseline">
            Related items from my Pocket
            <svg
              className="fill-current ml-2"
              role="img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Pocket</title>
              <path d="M18.813 10.259l-5.646 5.419c-.32.305-.73.458-1.141.458-.41 0-.821-.153-1.141-.458l-5.646-5.419c-.657-.628-.677-1.671-.049-2.326.63-.657 1.671-.679 2.325-.05l4.511 4.322 4.517-4.322c.66-.631 1.697-.607 2.326.049.631.645.615 1.695-.045 2.326l-.011.001zm5.083-7.546c-.299-.858-1.125-1.436-2.041-1.436H2.179c-.9 0-1.717.564-2.037 1.405-.094.25-.142.511-.142.774v7.245l.084 1.441c.348 3.277 2.047 6.142 4.682 8.139.045.036.094.07.143.105l.03.023c1.411 1.03 2.989 1.728 4.694 2.072.786.158 1.591.24 2.389.24.739 0 1.481-.067 2.209-.204.088-.029.176-.045.264-.06.023 0 .049-.015.074-.029 1.633-.36 3.148-1.036 4.508-2.025l.029-.031.135-.105c2.627-1.995 4.324-4.862 4.686-8.148L24 10.678V3.445c0-.251-.031-.5-.121-.742l.017.01z" />
            </svg>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {pocket.nodes.map((article: any) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                className="m-4 p-4 border-2 dark:border-gray-800 dark:hover:border-blue-800 dark:hover:bg-gray-900 rounded-2xl transition-colors"
              >
                <strong className="font-bold mb-2 text-blue-300">
                  {article.title}
                </strong>
                <p>{article.excerpt}</p>
              </a>
            ))}
          </div>
        </>
      )}
    </PostLayout>
  );
}

export const pageQuery = graphql`
  query BlogQuery($slug: String!, $tags: [String!]!) {
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
    pocket: allPocketArticle(limit: 10, filter: { tags: { in: $tags } }) {
      distinct(field: url)
      nodes {
        id
        title
        url
        excerpt
      }
    }
  }
`;
