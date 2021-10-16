import * as React from "react";
import { Navigation } from "./Navigation";

export type LayoutProps = {
  header: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <main className="container mx-auto px-4">
      <Navigation
        links={[
          { name: "Home", url: "/" },
          { name: "About me", url: "/about/" },
          { name: "Bookmarks", url: "/bookmarks/" },
        ]}
      />
      <section>{props.header}</section>
      {props.children}
    </main>
  );
};
