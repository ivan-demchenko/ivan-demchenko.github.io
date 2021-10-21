import * as React from "react";
import { Metadata } from "../types";
import { Layout } from "./Layout";
import { Seo } from "./Seo";

export type PostLayoutProps = React.PropsWithChildren<{
  header?: React.ReactNode;
  metadata: Metadata;
  activeLinkUrl: string;
}>;

export const PostLayout = (props: PostLayoutProps) => {
  return (
    <>
      <Seo meta={props.metadata} isBlogPost />
      <Layout activeLinkUrl={props.activeLinkUrl} header={props.header}>
        {props.children}
      </Layout>
    </>
  );
};
