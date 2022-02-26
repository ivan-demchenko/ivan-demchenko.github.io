import * as React from "react";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "./Icons";
import * as FooterCSS from "./Footer.module.css";

export type FooterProps = {
  twitter: string;
  github: string;
  linkedin: string;
};

export const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer className={FooterCSS.wrapper}>
      <section className={FooterCSS.aboutSection}>
        <p>
          Ivan Demchenko's corner of the internet. I use this website for
          writing about my work-life experience as well as for experimenting
          with tech.
        </p>
        <p>Copyright &copy; 2021.</p>
      </section>
      <section className={FooterCSS.socialSection}>
        <p>My profile on other platforms</p>
        <div className={FooterCSS.socialIconsGroup}>
          <a href={`https://www.twitter.com/${props.twitter}`} target="_black">
            <TwitterIcon />
          </a>
          <a href={`https://www.github.com/${props.github}`} target="_black">
            <GitHubIcon />
          </a>
          <a
            href={`https://www.linkedin.com/in/${props.linkedin}`}
            target="_black"
          >
            <LinkedInIcon />
          </a>
        </div>
      </section>
    </footer>
  );
};
