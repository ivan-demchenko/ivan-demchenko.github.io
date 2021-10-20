import * as React from "react";

export type PostPublishDateProps = {
  dateTime: string;
};

const toReadableDate = (dateTime: string) => {
  const date = new Date(dateTime);
  const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const PostPublishDate: React.FC<PostPublishDateProps> = (props) => {
  return (
    <time dateTime={props.dateTime} className="text-s text-gray-400 italic">
      Published on the {toReadableDate(props.dateTime)}
    </time>
  );
};
