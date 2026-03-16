import { componentList } from "./componentList";
import { componentSections } from "./componentSections";
import { contentList } from "./contentList";
import { designList } from "./designList";
import { hooksList } from "./hooksList";
import { guidesList } from "./guidesList";
import { packagesList } from "./packagesList";
import { patternsList } from "./patternsList";
import { changelogList } from "./changelogList";

/**
 * Nav/sidebar route config. Used by NavMenu for the left menu structure.
 * Routing is file-based under src/routes; update lists (e.g., designList)
 * rather than duplicating paths here.
 */
export interface AtlantisRoute {
  path?: string;
  children?: Array<AtlantisRoute>;
  inNav?: boolean;
  handle: string;
}

const mapListToNavItems = (
  list: Array<{ title: string; to: string }>,
): Array<AtlantisRoute> =>
  list.map(item => ({
    path: item.to,
    handle: item.title,
    inNav: true,
  }));

const generateComponentSidebar = () => {
  return componentSections
    .map(section => {
      const children = componentList
        .filter(component => component.sections?.includes(section))
        .map(component => ({
          path: component.to,
          handle: component.title,
          inNav: true,
        }));

      const sectionRoute: AtlantisRoute | null =
        children.length > 0 ? { handle: section, children } : null;

      return sectionRoute;
    })
    .filter((route): route is AtlantisRoute => route !== null);
};

export const routes: Array<AtlantisRoute> = [
  {
    path: "/",
    handle: "Home",
  },
  {
    path: "/patterns",
    handle: "Patterns",
    children: mapListToNavItems(patternsList),
  },
  {
    path: "/components",
    handle: "Components",
    children: generateComponentSidebar(),
  },
  {
    path: "/content",
    handle: "Content",
    children: mapListToNavItems(contentList),
  },
  {
    path: "/design",
    handle: "Design",
    children: mapListToNavItems(designList),
  },
  {
    path: "/hooks",
    handle: "Hooks",
    children: mapListToNavItems(hooksList),
  },
  {
    path: "/guides",
    handle: "Guides",
    children: mapListToNavItems(guidesList),
  },
  {
    path: "/packages",
    handle: "Packages",
    children: mapListToNavItems(packagesList),
  },
  {
    path: "/changelog",
    handle: "Changelog",
    children: mapListToNavItems(changelogList),
  },
];
