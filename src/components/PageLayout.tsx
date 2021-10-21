import * as React from "react";
import { Metadata } from "../types";
import { Layout } from "./Layout";
import { Seo } from "./Seo";

export type PageLayoutProps = React.PropsWithChildren<{
  header?: React.ReactNode;
  metadata: Metadata;
  activeLinkUrl: string;
  social: {
    twitter: string;
    github: string;
    linkedin: string;
  };
}>;

export const PageLayout = (props: PageLayoutProps) => {
  return (
    <>
      <Seo meta={props.metadata} />
      <Layout
        social={props.social}
        activeLinkUrl={props.activeLinkUrl}
        header={props.header}
      >
        {props.children}
      </Layout>
    </>
  );
};
