import * as React from "react";
import { PocketItemRecord } from "../types";
import * as PocketItemCSS from "./PocketItem.module.css";

export type PocketItemProps = {
  item: PocketItemRecord;
};

export const PocketItem: React.FC<PocketItemProps> = ({ item }) => {
  return (
    <a href={item.url} target="_blank" className={PocketItemCSS.wrapper}>
      {item.has_image && (
        <img
          src={item.image!.src}
          title={item.title}
          alt={item.title}
          className={PocketItemCSS.pic}
        />
      )}
      <span className={PocketItemCSS.headline}>{item.title}</span>
      <p>{item.excerpt}</p>
    </a>
  );
};
