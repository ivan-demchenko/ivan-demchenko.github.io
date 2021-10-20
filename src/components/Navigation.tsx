import * as React from "react";
import { Link } from "gatsby";

const LINKS = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog" },
  { name: "Bookmarks", url: "/bookmarks" },
  { name: "CV", url: "/cv" },
  { name: "About", url: "/about" },
];

export const Navigation: React.FC = () => {
  return (
    <nav className="font-bold py-4 max-w-md">
      <ul className="flex justify-between">
        {LINKS.map((link) => (
          <Link key={link.url} to={link.url} className="hover:text-blue-400">
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
