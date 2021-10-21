import { Link } from "gatsby";
import * as React from "react";

export type PostTagProps = {
  tag: string;
};

export const PostTag: React.FC<PostTagProps> = ({ tag }) => {
  return (
    <Link
      className="dark:bg-gray-900 bg-gray-100 m-2 py-2 px-6 rounded-full uppercase font-bold text-sm tracking-wide"
      to={`/tag/${tag}`}
    >
      {tag}
    </Link>
  );
};
