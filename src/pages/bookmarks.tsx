import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { PocketQueryResult, SiteQueryResult } from "../types";
import { PocketItem } from "../components/PocketItem";

export default function IndexPage({
  data,
}: PageProps<SiteQueryResult & PocketQueryResult>) {
  const { site, pocket } = data;
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
      <section className="prose prose-lg dark:prose-dark mb-10">
        <p>
          Here is my collection of different resources that helped me in the
          past with my self-study process. It strikes and inspires me, every
          time when I think about these people who gave all of these great
          materials to the public for free. What a contribution!
        </p>
        <ul>
          <li>
            Bartosz Milewski's Category theory playlists. His{" "}
            <a
              href="https://bartoszmilewski.com/"
              title="Bartosz Milewski's blog"
              target="_blank"
              rel="noopener noreferrer"
            >
              blog
            </a>{" "}
            and videos on Category Theory are priceless!
            <br />
            <ul>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=I8LbkfSSR58&amp;list=PLbgaMIhjbmEnaH_LTkxLI7FMa2HsnawM_"
                  title=" Bartosz Milewski's Category Theory playlist"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Part 1
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=3XTQSx1A3x8&amp;list=PLbgaMIhjbmElia1eCEZNvsVscFef9m0dm"
                  title=" Bartosz Milewski's Category Theory playlist"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Part 2
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=F5uEpKwHqdk&amp;list=PLbgaMIhjbmEn64WVX4B08B4h2rOtueWIL"
                  title=" Bartosz Milewski's Category Theory playlist"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Part 3
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="http://www.tomharding.me/fantasy-land/"
              title="Tom Harding's Fantasy Land specification explanation"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tom Harding's collection
            </a>{" "}
            on Fantasy Land specification for JavaScript. A truly interesting
            read for those who want a simple introduction to functional
            programming in JavaScript.
          </li>
          <li>
            <a
              href="https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript"
              title="Professor Frisby Introduces Composable Functional JavaScript"
              target="_blank"
              rel="noopener noreferrer"
            >
              Brian Lonsdorf's timeless course
            </a>{" "}
            on functional programming concepts.
          </li>
          <li>
            <a
              href="http://learnyouahaskell.com/"
              title="Timeless book for beginners in Haskell"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn You a Haskell for Great Good!
            </a>{" "}
            for those who want a easy to understand intro to Haskell. Great
            read!
          </li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-4xl pb-10 flex items-baseline">
          Articles in my Pocket
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
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {pocket.items.map((item) => (
            <PocketItem key={item.id} item={item} />
          ))}
        </div>
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
    pocket: allPocketArticle(
      limit: 10
      sort: { fields: [time_added], order: DESC }
    ) {
      distinct(field: url)
      items: nodes {
        id
        title
        url
        excerpt
        has_image
        image {
          src
        }
      }
    }
  }
`;
