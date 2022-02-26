import * as React from "react";
import * as GreetingCSS from "./Greeting.module.css";

export type GreetingsProps = {
  salutation: string;
};

export const Greeting: React.FC<GreetingsProps> = ({ salutation }) => {
  return (
    <div className={GreetingCSS.wrapper}>
      <h1 className={GreetingCSS.welcomeTextWrapper}>
        <span className={GreetingCSS.welcomeText}>Good {salutation}!</span>
      </h1>
      <p className={GreetingCSS.tagLine}>
        Welcome to my personal corner of the Internet!
      </p>
      <p className={GreetingCSS.tagLine}>
        I share my thoughts here and experiment with tech.
      </p>
    </div>
  );
};
