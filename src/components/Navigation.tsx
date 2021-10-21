import * as React from "react";
import { Link } from "gatsby";
import cx from "classnames";

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
    <nav className="font-bold py-4 border-gray-200 dark:border-gray-800 border-b-2">
      <ul className="flex justify-between max-w-md">
        {LINKS.map((link) => (
          <Link
            key={link.url}
            to={link.url}
            className={cx("hover:text-blue-400", {
              underline: activeLinkUrl === link.url,
            })}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
