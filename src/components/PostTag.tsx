import { Link } from "gatsby";
import * as React from "react";
import * as PostTagCSS from "./PostTag.module.css";

export type PostTagProps = {
  tag: string;
};

export const PostTag: React.FC<PostTagProps> = ({ tag }) => {
  return (
    <Link className={PostTagCSS.tag} to={`/tag/${tag}`}>
      {tag}
    </Link>
  );
};
