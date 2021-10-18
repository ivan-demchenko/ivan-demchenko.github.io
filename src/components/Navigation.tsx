import * as React from "react";
import { Link } from "gatsby";
import { Container } from "./Container";

const LINKS = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog/" },
  { name: "Bookmarks", url: "/bookmarks/" },
  { name: "About me", url: "/about/" },
];

export const Navigation: React.FC = () => {
  return (
    <Container as="nav">
      <ul className="flex text-gray-700">
        {LINKS.map((link) => (
          <Link
            key={link.url}
            to={link.url}
            className="py-2 pr-4 hover:text-blue-700"
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </Container>
  );
};
