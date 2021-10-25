import * as React from "react";

export type GreetingsProps = {
  salutation: string;
};

export const Greeting: React.FC<GreetingsProps> = ({ salutation }) => {
  return (
    <div className="text-center py-16 md:py-20">
      <h1 className="welcomeBanner__textWrapper">
        <span className="welcomeBanner__text">Good {salutation}!</span>
      </h1>
      <p className="text-xl font-serif italic">
        Welcome to my personal corner of the Internet!
      </p>
      <p className="text-xl font-serif italic">
        I share my thoughts here and experiment with tech.
      </p>
    </div>
  );
};
