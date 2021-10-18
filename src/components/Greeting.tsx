import * as React from "react";

const getTimeOfTheDay = (hours: number) => {
  if (hours >= 0 && hours < 5) return "night";
  if (hours >= 5 && hours < 11) return "morning";
  if (hours >= 11 && hours < 17) return "day";
  if (hours >= 17 && hours < 20) return "afternoon";
  return "evening";
};

export const Greeting: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <h1 className="font-extrabold text-8xl mb-4">
        <span className="bg-clip-text text-transparent hero-text-bg">
          Good {getTimeOfTheDay(new Date().getHours())}!
        </span>
      </h1>
      <p className="text-xl">Welcome to my personal corner on the Internet!</p>
      <p className="text-xl">
        I share my thoughts here and experiment with tech.
      </p>
    </header>
  );
};
