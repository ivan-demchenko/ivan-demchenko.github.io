import * as React from "react";
import { Link } from "gatsby";

export type BlogSnippetProps = {
  id: string;
  date: string;
  slug: string;
  title: string;
  excerpt: string;
};

export const BlogSnippet: React.FC<BlogSnippetProps> = (props) => {
  return (
    <div key={props.id} className="mb-8 pb-8 border-b-2 border-gray-900">
      <time dateTime={props.date} className="text-s text-gray-400 italic">
        Published on the {props.date}
      </time>
      <h3 className="text-xl font-bold">
        <Link to={props.slug}>{props.title}</Link>
      </h3>
      <p>{props.excerpt}</p>
    </div>
  );
};
