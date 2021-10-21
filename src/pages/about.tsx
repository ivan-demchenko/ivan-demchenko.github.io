import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { WelcomeBanner } from "../components/WelcomeBanner";
import { SiteQueryResult } from "../types";

export default function IndexPage({
  data,
}: PageProps<SiteQueryResult & { pocket: any }>) {
  const { site, pocket } = data;
  const metadata = {
    description: "Ivan's blog",
    image: "none",
    title: `About me - ${site.siteMetadata.title}`,
    twitter: site.siteMetadata.social.twitter,
    url: site.siteMetadata.siteUrl,
  };
  return (
    <PageLayout
      social={site.siteMetadata.social}
      activeLinkUrl="/about"
      metadata={metadata}
      header={<WelcomeBanner />}
    >
      <section className="prose prose-lg dark:prose-dark mb-8">
        <h2>About me</h2>
        <p>Hi, I'm Ivan. I love building web apps and working with great people! I am Ukrainian, but currently, I reside in Germany; I also spent a few fantastic years with my family in Australia.</p>
        <p>You are very welcome to checkout my LinkedIn and GitHub profiles.</p>
        <h3>A bit of nostalgia</h3>
        <p>I got my first computer when I was at 10th grade (children in Ukraine go to school for 12 years). That was a really nice PC: Celeron 700 MHz, 128 MB RAM, 15 GB HDD, nVidia Vanta Video card and awesome 15” Sony monitor. I was a really cool guy with that set up. At that time, the most comfortable resolution was 1024x768 because monitor could keep 72 Hz refresh rate. I could set a higher resolution but then, the refresh rate would drop dramatically. Also, I think I still remember how to reinstall Windows 98 using floppy disk. Oh, good old days…</p>
        <p>After the first two weeks of non stop Quake III Area, I finally got access to the Internet. Yes via modem and land line. The next question was "what is behind a web-page"? Thus, I started searching how to build a web-page. It was a great time! One discovery led to another. Later, I decided that I need a good text editor. This is how I started with Delphi. Actually, I built quite a nice text editor with syntax highlight, tabs, live-preview and configurable set of functions (something like macros, but simpler). However, I had to start my preparations for final exams and I stopped working on an editor.</p>
      </section>
      <section className="mb-10">
        <h2 className="text-4xl pb-10">Articles in my Pocket</h2>
        <div className="flex flex-wrap box-border">
          {pocket.nodes.map((node: any) => {
            return (
              node.title && (
                <a
                  href={node.url}
                  target="_blank"
                  className="w-1/4 m-4 p-4 dark:border-gray-800 border-2 rounded-md hover:border-blue-800"
                >
                  {node.image && node.image.src && (
                    <img
                      className="w-full"
                      src={node.image.src}
                      title={node.title}
                      alt={node.title}
                    />
                  )}
                  <span className="font-bold mb-2 text-blue-300">
                    {node.title}
                  </span>
                </a>
              )
            );
          })}
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
    pocket: allPocketArticle(limit: 10) {
      nodes {
        title
        url
        image {
          src
        }
      }
    }
  }
`;
