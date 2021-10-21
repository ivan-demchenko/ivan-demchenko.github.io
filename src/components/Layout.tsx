import * as React from "react";
import { Container } from "./Container";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

export type LayoutProps = {
  header?: React.ReactNode;
  activeLinkUrl: string;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <Container>
      <Navigation activeLinkUrl={props.activeLinkUrl} />
      {props.header && <header className="text-center">{props.header}</header>}
      {props.children}
      <Footer />
    </Container>
  );
};
