import * as React from "react";

const currHours = () => new Date().getHours();

const getTimeOfTheDay = (hours: number) => {
  if (hours >= 0 && hours < 5) return "night";
  if (hours >= 5 && hours < 11) return "morning";
  if (hours >= 11 && hours < 17) return "day";
  if (hours >= 17 && hours < 20) return "afternoon";
  return "evening";
};

export const Greeting: React.FC = () => {
  return (
    <div className="text-center py-16 md:py-20">
      <h1 className="welcomeBanner__textWrapper">
        <span className="welcomeBanner__text">
          Good {getTimeOfTheDay(currHours())}!
        </span>
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
