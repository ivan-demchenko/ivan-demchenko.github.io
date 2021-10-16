import * as React from "react";

const getTimeOfTheDay = (hours: number) => {
  if (hours >= 0 && hours < 5) return "night";
  if (hours >= 5 && hours < 11) return "morning";
  if (hours >= 11 && hours < 17) return "day";
  if (hours >= 17 && hours < 20) return "afternoon";
  return "evening";
};

export const Greeting: React.FC = () => {
  return <>Good {getTimeOfTheDay(new Date().getHours())}!</>;
};
