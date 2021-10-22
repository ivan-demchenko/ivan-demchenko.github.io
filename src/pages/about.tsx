import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { PageLayout } from "../components/PageLayout";
import { WelcomeBanner } from "../components/WelcomeBanner";
import { SiteQueryResult } from "../types";

export default function IndexPage({ data }: PageProps<SiteQueryResult>) {
  const { site } = data;
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
      <h2 className="text-4xl pb-10">A bit of biography</h2>
      <section className="prose prose-lg dark:prose-dark mb-8">
        <p>
          Hi, I'm Ivan. I love building web apps and working with great people!
          I am Ukrainian, but currently, I reside in Germany; I also spent a few
          fantastic years with my family in Australia.
        </p>
        <p>
          You are very welcome to checkout my{" "}
          <a
            href={`https://www.linkedin.com/in/${site.siteMetadata.social.linkedin}`}
            target="_black"
          >
            LinkedIn
          </a>{" "}
          and 
          <a
            href={`https://www.github.com/${site.siteMetadata.social.github}`}
            target="_black"
          >
            GitHub
          </a>{" "}
          profiles.
        </p>
        <h3>A bit of nostalgia</h3>
        <p>
          I got my first computer when I was at 10th grade (children in Ukraine
          go to school for 12 years). That was a really nice PC: Celeron 700
          MHz, 128 MB RAM, 15 GB HDD, nVidia Vanta Video card and awesome 15”
          Sony monitor. I was a really cool guy with that set up. At that time,
          the most comfortable resolution was 1024x768 because monitor could
          keep 72 Hz refresh rate. I could set a higher resolution but then, the
          refresh rate would drop dramatically. Also, I think I still remember
          how to reinstall Windows 98 using floppy disk. Oh, good old days…
        </p>
        <p>
          After the first two weeks of non stop Quake III Area, I finally got
          access to the Internet. Yes via modem and land line. The next question
          was "what is behind a web-page"? Thus, I started searching how to
          build a web-page. It was a great time! One discovery led to another.
          Later, I decided that I need a good text editor. This is how I started
          with Delphi. Actually, I built quite a nice text editor with syntax
          highlight, tabs, live-preview and configurable set of functions
          (something like macros, but simpler). However, I had to start my
          preparations for final exams and I stopped working on an editor.
        </p>
      </section>
      <h2 className="text-4xl pb-10">About this site</h2>
      <section className="prose prose-lg dark:prose-dark mb-8">
        <p>
          This is the 5th iteration. It all started with{" "}
          <a href="https://jekyllrb.com/" target="_blank">
            Jekyll
          </a>
          , then I was playing around with{" "}
          <a href="https://nextjs.org/" target="_blank">
            NextJS
          </a>{" "}
          +{" "}
          <a href="https://www.contentful.com/" target="_blank">
            Contentful
          </a>
          ,{" "}
          <a href="https://www.11ty.dev/" target="_blank">
            11ty
          </a>
          ,{" "}
          <a href="https://getpublii.com/" target="_blank">
            Publii
          </a>
          ...
        </p>
        <p>
          This time around I am using{" "}
          <a href="https://www.gatsbyjs.com/" target="_blank">
            Gatsby
          </a>{" "}
          and{" "}
          <a href="https://tailwindcss.com/" target="_blank">
            TailwindCSS
          </a>
          . I tried Gatsby some time ago, but, for the reason I don't remember
          already, it didn't clicked. I have to admit, the experience is great.
          The set-up was very intuitive, the ecosystem of plugins is mature. I
          should probably write a blog post about it...
        </p>
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
