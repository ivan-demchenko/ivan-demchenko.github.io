import * as React from "react";
import { Link } from "gatsby";
import cx from "classnames";
import * as NavigationCSS from "./Navigation.module.css";

const LINKS = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog" },
  { name: "Bookmarks", url: "/bookmarks" },
  { name: "CV", url: "/cv" },
  { name: "About", url: "/about" },
];

export type NavigationProps = {
  activeLinkUrl: string;
};

export const Navigation: React.FC<NavigationProps> = ({ activeLinkUrl }) => {
  return (
    <nav className={NavigationCSS.wrapper}>
      <div className={NavigationCSS.bar}>
        {LINKS.map((link) => (
          <Link
            key={link.url}
            to={link.url}
            className={cx(NavigationCSS.link, {
              [NavigationCSS.linkActive]: activeLinkUrl === link.url,
            })}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};
