import * as React from "react";
import * as css from "./WelcomeBanner.module.css";

export const WelcomeBanner = () => {
  return (
    <header className={css.wrapper}>
      <figure className={css.pic}>
        <figcaption className={css.picCaption}>
          <h1 className={css.picCaptionHeadline}>Ivan Demchenko</h1>
          <p className={css.picCaptionSubheader}>
            Software engineering enthusiast
          </p>
        </figcaption>
        <span role="image" className={css.portrait} />
      </figure>
    </header>
  );
};
