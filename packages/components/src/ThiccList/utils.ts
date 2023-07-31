import { DataArray, DataKeysType } from "./data";
import { ListEdges } from "./gqlUtils";

export const SORT_ORDER = ["A-Z", "Z-A"];
export type SortOrder = "A-Z" | "Z-A";
export type SortKey = keyof ListEdges[number]["node"];

export function getSortedItems(
  items: DataArray,
  sortOrder: SortOrder,
  sortKey: DataKeysType = "name",
) {
  const sortedItems = [...items].sort((a, b) => {
    let aa = a[sortKey];
    let bb = b[sortKey];

    if (sortKey === "status") {
      aa = a[sortKey].label;
      bb = b[sortKey].label;
    }

    if (sortOrder === "A-Z") {
      return aa > bb ? 1 : -1;
    } else {
      return aa < bb ? 1 : -1;
    }
  });

  return sortedItems;
}
