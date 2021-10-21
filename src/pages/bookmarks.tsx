import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { SiteQueryResult } from "../types";

export default function IndexPage({ data }: PageProps<SiteQueryResult>) {
  const { site } = data;
  const metadata = {
    description: "Ivan's blog",
    image: "none",
    title: `Bookmarks - ${site.siteMetadata.title}`,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout
      social={site.siteMetadata.social}
      activeLinkUrl="/bookmarks"
      metadata={metadata}
      header={<h1 className="text-4xl font-bold py-10">Bookmarks</h1>}
    >
      <section className="prose prose-lg dark:prose-dark mb-8">
        <p>Here is my collection of different resources that helped me in the past with my self-study process. It strikes and inspires me, every time when I think about these people who gave all of these great materials to the public for free. What a contribution!</p>
        <ul>
          <li>Bartosz Milewski's Category theory playlists. His <a href="https://bartoszmilewski.com/" title="Bartosz Milewski's blog" target="_blank" rel="noopener noreferrer">blog</a> and videos on Category Theory are priceless!<br />
            <ul>
              <li><a href="https://www.youtube.com/watch?v=I8LbkfSSR58&amp;list=PLbgaMIhjbmEnaH_LTkxLI7FMa2HsnawM_" title=" Bartosz Milewski's Category Theory playlist" target="_blank" rel="noopener noreferrer">Part 1</a></li>
              <li><a href="https://www.youtube.com/watch?v=3XTQSx1A3x8&amp;list=PLbgaMIhjbmElia1eCEZNvsVscFef9m0dm" title=" Bartosz Milewski's Category Theory playlist" target="_blank" rel="noopener noreferrer">Part 2</a></li>
              <li><a href="https://www.youtube.com/watch?v=F5uEpKwHqdk&amp;list=PLbgaMIhjbmEn64WVX4B08B4h2rOtueWIL" title=" Bartosz Milewski's Category Theory playlist" target="_blank" rel="noopener noreferrer">Part 3</a></li>
            </ul>
          </li>
          <li><a href="http://www.tomharding.me/fantasy-land/" title="Tom Harding's Fantasy Land specification explanation" target="_blank" rel="noopener noreferrer">Tom Harding's collection</a> on Fantasy Land specification for JavaScript. A truly interesting read for those who want a simple introduction to functional programming in JavaScript.</li>
          <li><a href="https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript" title="Professor Frisby Introduces Composable Functional JavaScript" target="_blank" rel="noopener noreferrer">Brian Lonsdorf's timeless course</a> on functional programming concepts.</li>
          <li><a href="http://learnyouahaskell.com/" title="Timeless book for beginners in Haskell" target="_blank" rel="noopener noreferrer">Learn You a Haskell for Great Good!</a> for those who want a easy to understand intro to Haskell. Great read!</li>
        </ul>
      </section>
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
          github
          linkedin
        }
      }
    }
  }
`;
