import * as React from "react";
import { Metadata } from "../types";
import { Container } from "./Container";
import { Layout } from "./Layout";
import { Seo } from "./Seo";

export type PageLayoutProps = React.PropsWithChildren<{
  header?: React.ReactNode;
  metadata: Metadata;
}>;

export const PageLayout = (props: PageLayoutProps) => {
  return (
    <>
      <Seo meta={props.metadata} />
      <Layout header={props.header}>
        <Container>{props.children}</Container>
      </Layout>
    </>
  );
};
