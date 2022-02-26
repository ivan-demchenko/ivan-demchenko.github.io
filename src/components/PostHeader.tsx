import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { PostQueryResult } from "../types";
import * as PostHeaderCSS from "./PostHeader.module.css";

export type PostHeaderProps = Pick<PostQueryResult, "post">;

const PostHeaderWithImage: React.FC<PostHeaderProps["post"]["frontmatter"]> = ({
  image,
  title,
  children,
}) => {
  let finalImage = getImage(image!.childImageSharp.gatsbyImageData)!;

  return (
    <div className={PostHeaderCSS.imgWrapper}>
      <GatsbyImage
        className={PostHeaderCSS.imgPic}
        image={finalImage}
        alt={title}
      />
      <div className={PostHeaderCSS.imgOvercast} />
      <div className={PostHeaderCSS.imgText}>{children}</div>
    </div>
  );
};

const PostHeaderWithoutImage: React.FC = ({ children }) => {
  return <div className={PostHeaderCSS.noimgWrapper}>{children}</div>;
};

const PostHeaderText: React.FC<PostHeaderProps> = ({ post }) => (
  <>
    <h1 className={PostHeaderCSS.textHeading}>{post.frontmatter.title}</h1>
    {post.frontmatter.imageCredits && (
      <span
        className={PostHeaderCSS.textPicCredit}
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
