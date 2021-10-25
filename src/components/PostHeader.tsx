import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { PostQueryResult } from "../types";

export type PostHeaderProps = Pick<PostQueryResult, "post">;

const PostHeaderWithImage: React.FC<PostHeaderProps["post"]["frontmatter"]> = ({
  image,
  title,
  children,
}) => {
  let finalImage = getImage(image!.childImageSharp.gatsbyImageData)!;

  return (
    <div className="grid grid-cols-1 grid-rows-4 h-64 lg:h-auto">
      <GatsbyImage
        className="col-start-1 row-start-1 row-span-4"
        image={finalImage}
        alt={title}
      />
      <div className="bg-gradient-to-b from-transparent to-white dark:to-black z-10 col-start-1 row-start-1 row-span-4" />
      <div className="col-start-1 col-span-1 row-start-4 self-end row-span-1 z-20">
        {children}
      </div>
    </div>
  );
};

const PostHeaderWithoutImage: React.FC = ({ children }) => {
  return (
    <div className="px-2 py-12 lg:py-16 bg-gradient-to-br from-gray-200 to-white dark:from-gray-900 dark:to-black">
      <div className="z-10">{children}</div>
    </div>
  );
};

const PostHeaderText: React.FC<PostHeaderProps> = ({ post }) => (
  <>
    <h1 className="text-4xl font-bold">{post.frontmatter.title}</h1>
    {post.frontmatter.imageCredits && (
      <span
        className="italic"
        dangerouslySetInnerHTML={{
          __html: post.frontmatter.imageCredits,
        }}
      />
    )}
  </>
);

export const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const { frontmatter } = post;
  if (frontmatter.image) {
    return (
      <PostHeaderWithImage {...frontmatter}>
        <PostHeaderText post={post} />
      </PostHeaderWithImage>
    );
  }
  return (
    <PostHeaderWithoutImage>
      <PostHeaderText post={post} />
    </PostHeaderWithoutImage>
  );
};
