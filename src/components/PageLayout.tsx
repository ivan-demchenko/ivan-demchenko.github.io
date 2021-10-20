import * as React from "react";
import { Metadata } from "../types";
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
      <Layout header={props.header}>{props.children}</Layout>
    </>
  );
};
