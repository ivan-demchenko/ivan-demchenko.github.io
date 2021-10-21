import * as React from "react";
import { Link } from "gatsby";

export type BlogSnippetProps = {
  date: string;
  slug: string;
  title: string;
  excerpt: string;
};

export const BlogSnippet: React.FC<BlogSnippetProps> = (props) => {
  return (
    <div className="mb-8 pb-8 dark:border-gray-900">
      <h3>
        <Link to={props.slug}>{props.title}</Link>
      </h3>
      <p>{props.excerpt}</p>
      <time dateTime={props.date} className="text-s text-gray-400 italic">
        Published on the {props.date}
      </time>
      <div className="divider mt-8">
        <i />
      </div>
    </div>
  );
};
