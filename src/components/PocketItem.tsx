import * as React from "react";
import { PocketItemRecord } from "../types";

export type PocketItemProps = {
  item: PocketItemRecord;
};

export const PocketItem: React.FC<PocketItemProps> = ({ item }) => {
  return (
    <a
      href={item.url}
      target="_blank"
      className="m-4 p-4 border-2 border-gray-200 hover:border-blue-200 hover:bg-blue-50 dark:border-gray-800 dark:hover:border-blue-800 dark:hover:bg-gray-900 rounded-2xl transition-colors"
    >
      {item.has_image && (
        <img
          src={item.image!.src}
          title={item.title}
          alt={item.title}
          className="mb-2"
        />
      )}
      <span className="font-bold mb-2 text-blue-800 dark:text-blue-300">
        {item.title}
      </span>
      <p>{item.excerpt}</p>
    </a>
  );
};
