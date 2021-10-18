import * as React from "react";
import { Container } from "./Container";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      <Container className="flex flex-col">
        <section className="flex-1 bg-gray-200 m-2 p-4 rounded-lg">
          <p>Ivan Demchenko's web site</p>
          <p>Copyright &copy; 2021.</p>
        </section>
        <section className="flex-1 bg-gray-200 m-2 p-4 rounded-lg">
          Social:
          <ul>
            <li>Twitter</li>
            <li>GitHub</li>
            <li>LinkedIn</li>
          </ul>
        </section>
      </Container>
    </footer>
  );
};
