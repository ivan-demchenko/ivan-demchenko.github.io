import * as React from "react";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

export type LayoutProps = {
  header?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Navigation />
      {props.header && <header>{props.header}</header>}
      {props.children}
      <Footer />
    </>
  );
};
