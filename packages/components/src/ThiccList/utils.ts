import { ListEdges } from "./gqlUtils";

export const SORT_ORDER = ["A-Z", "Z-A"];

export type SortOrder = "A-Z" | "Z-A";

export function getSortedItems(items: ListEdges, sortOrder: SortOrder) {
  const sortedItems = [...items].sort((a, b) => {
    if (sortOrder === "A-Z") {
      return a.node.name > b.node.name ? 1 : -1;
    } else {
      return a.node.name < b.node.name ? 1 : -1;
    }
  });

  return sortedItems;
}
