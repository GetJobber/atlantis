import { Entry, useMenus } from "docz";

export type PageOrGroup = Page | Group;

interface Page {
  type: "page";
  id: string;
  name: string;
  item: Entry;
}

export interface Group {
  type: "group";
  id: string;
  name: string;
  items: PageOrGroup[];
}

export function useJobberMenu(query?: string) {
  const doczMenus = useMenus({ query }) ?? [];
  const maxMenuDepth = 2;

  const menuEntries = doczMenus
    .reduce((entries, item) => {
      if (item.menu && typeof item.menu !== "string") {
        item.menu.forEach(menuItem =>
          entries.push(menuItem as unknown as Entry),
        );
      } else {
        entries.push(item as unknown as Entry);
      }
      return entries;
    }, [] as Entry[])
    .filter(entry => !entry.hidden);

  const structuredMenu = menuEntries.reduce((menu, entry) => {
    const page: Page = {
      type: "page",
      id: entry.id,
      name: entry.name,
      item: entry,
    };

    if (entry.name.endsWith(".stories")) return menu;

    if (entry.menu == undefined) {
      menu.push(page);
    } else {
      const path = entry.menu.split("/", maxMenuDepth);
      buildStructuredMenu(menu, page, path);
    }
    return menu;
  }, [] as PageOrGroup[]);

  return structuredMenu;
}

function buildStructuredMenu(
  menu: PageOrGroup[],
  page: Page,
  path: string[],
): PageOrGroup[] {
  const firstPart = path.shift() ?? "";
  const firstPartsMenu = findOrCreate(menu, firstPart);

  if (path.length === 0) {
    firstPartsMenu.items.push(page);
  } else {
    buildStructuredMenu(firstPartsMenu.items, page, path);
  }

  return menu;
}

function findOrCreate(groups: PageOrGroup[], key: string): Group {
  const existingGroup = groups.find(
    item => item.type === "group" && item.name === key,
  ) as Group;
  if (existingGroup) return existingGroup;

  const newGroup: Group = { type: "group", id: key, name: key, items: [] };
  groups.push(newGroup);
  return newGroup;
}
