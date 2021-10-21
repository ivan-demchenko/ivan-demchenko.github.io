import * as React from "react";
import { Container } from "./Container";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

export type LayoutProps = {
  header?: React.ReactNode;
  activeLinkUrl: string;
  social: {
    twitter: string;
    github: string;
    linkedin: string;
  };
};

export const Layout: React.FC<LayoutProps> = (props) => {
  const { children, header, activeLinkUrl, social } = props;
  return (
    <Container>
      <Navigation activeLinkUrl={activeLinkUrl} />
      {header && <header className="text-center">{header}</header>}
      {children}
      <Footer
        twitter={social.twitter}
        linkedin={social.linkedin}
        github={social.github}
      />
    </Container>
  );
};
