import { TagsQueryResult } from "./types";

export const currHours = () => new Date().getHours();

export const getTimeOfTheDay = (hours: number) => {
  if (hours >= 0 && hours < 5) return "night";
  if (hours >= 5 && hours < 11) return "morning";
  if (hours >= 11 && hours < 17) return "day";
  if (hours >= 17 && hours < 20) return "afternoon";
  return "evening";
};

export function getUniqueTags(tags: TagsQueryResult["tags"]) {
  const tagSet = new Set<string>();

  tags.nodes.forEach(({ frontmatter }: any) => {
    frontmatter.tags.forEach((tag: any) => tagSet.add(tag));
  });

  return Array.from(tagSet);
}
