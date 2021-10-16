import * as React from "react";
import { Link } from "gatsby";
import { SitePageLink } from "../types";

export type NavigationProps = {
  links: SitePageLink[];
};

export const Navigation: React.FC<NavigationProps> = ({ links }) => {
  return (
    <nav>
      <ul className="flex">
        {links.map((link) => (
          <Link key={link.url} to={link.url} className="py-2 pr-8">
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
