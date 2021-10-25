import { ImageDataLike } from "gatsby-plugin-image";

export type Metadata = {
  title: string;
  description: string;
  url: string;
  twitter: string;
  image?: string;
};

export type SitePageLink = {
  name: string;
  url: string;
};

export type SiteQueryResult = {
  site: {
    siteMetadata: {
      title: string;
      siteUrl: string;
      social: {
        twitter: string;
        github: string;
        linkedin: string;
      };
    };
  };
};

export type TagsQueryResult = {
  tags: {
    nodes: Array<{
      frontmatter: {
        tags: string[];
      };
    }>;
  };
};

export type BlogPostsQueryResult = {
  blog: {
    posts: Array<{
      id: string;
      excerpt: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        tags: string[];
        date: string;
        title: string;
      };
    }>;
  };
};

export type PostQueryResult = {
  post: {
    wordCount: {
      words: number;
    };
    html: string;
    excerpt: string;
    frontmatter: {
      tags: string[];
      title: string;
      date: string;
      image?: {
        childImageSharp: {
          gatsbyImageData: ImageDataLike;
        };
      };
      imageCredits?: string;
    };
  };
};

export type PocketItemRecord = {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  has_image?: boolean;
  image?: {
    src: string;
  };
};

export type PocketQueryResult = {
  pocket: {
    items: PocketItemRecord[];
  };
};
