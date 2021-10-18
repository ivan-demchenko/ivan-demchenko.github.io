import * as React from "react";
import { Metadata } from "../types";
import { Container } from "./Container";
import { Layout } from "./Layout";
import { Seo } from "./Seo";

export type PostLayoutProps = React.PropsWithChildren<{
  header?: React.ReactNode;
  metadata: Metadata;
}>;

export const PostLayout = (props: PostLayoutProps) => {
  return (
    <>
      <Seo meta={props.metadata} isBlogPost />
      <Layout header={props.header}>
        <Container>{props.children}</Container>
      </Layout>
    </>
  );
};
