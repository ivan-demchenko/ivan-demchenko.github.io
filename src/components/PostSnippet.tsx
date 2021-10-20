import { Link } from "gatsby";
import * as React from "react";
import { PostPublishDate } from "./PostPublishDate";

export type BlogSnippetProps = {
  id: string;
  date: string;
  slug: string;
  title: string;
  excerpt: string;
};

export const BlogSnippet: React.FC<BlogSnippetProps> = (props) => {
  return (
    <div key={props.id}>
      <PostPublishDate dateTime={props.date} />
      <h3 className="text-xl font-bold">
        <Link to={`/blog/${props.slug}`}>{props.title}</Link>
      </h3>
      <p>{props.excerpt}</p>
    </div>
  );
};
