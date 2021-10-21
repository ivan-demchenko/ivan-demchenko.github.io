import { TagsQueryResult } from "./types";

export function getUniqueTags(tags: TagsQueryResult["tags"]) {
  const tagSet = new Set<string>();

  tags.nodes.forEach(({ frontmatter }: any) => {
    frontmatter.tags.forEach((tag: any) => tagSet.add(tag));
  });

  return Array.from(tagSet);
}
