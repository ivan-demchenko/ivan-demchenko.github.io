import * as React from "react";
import { Link } from "gatsby";
import * as PostSnippetCSS from "./PostSnippet.module.css";

export type BlogSnippetProps = {
  date: string;
  slug: string;
  title: string;
  excerpt: string;
};

export const BlogSnippet: React.FC<BlogSnippetProps> = (props) => {
  return (
    <div className={PostSnippetCSS.wrapper}>
      <h3>
        <Link to={props.slug}>{props.title}</Link>
      </h3>
      <p>{props.excerpt}</p>
      <time dateTime={props.date} className={PostSnippetCSS.publishingDateTime}>
        Published on the {props.date}
      </time>
      <div className={PostSnippetCSS.divider}>
        <i />
      </div>
    </div>
  );
};
