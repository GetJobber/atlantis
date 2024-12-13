import { HomePage } from "./pages/HomePage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { ContentLoader } from "./components/ContentLoader";
import { DesignPage } from "./pages/DesignPage";
import { ComponentView } from "./layout/ComponentView";
import { componentList } from "./componentList";
import { ComponentsChangelogPage } from "./pages/ComponentsChangelogPage";
import { ComponentsNativeChangelogPage } from "./pages/ComponentsNativeChangelogPage";
import { DesignChangelogPage } from "./pages/DesignChangelogPage";
import { componentSections } from "./componentSections";

// STODO: Move this react-router implementation to Tanstack Router.

export interface AtlantisRoute {
  path?: string;
  component?: () => JSX.Element;
  exact?: boolean;
  children?: Array<AtlantisRoute>;
  inNav?: boolean;
  handle: string;
}

const generateComponentSidebar = () => {
  const sectionedComponentRoutes: Array<AtlantisRoute> = [];

  for (const section of componentSections) {
    const sectionRoutes: AtlantisRoute = { handle: section, children: [] };
    const filteredComponents = componentList.filter(component => {
      return component.sections && component.sections.includes(section);
    });

    filteredComponents.map(component => {
      if (!sectionRoutes.children) return;
      sectionRoutes.children.push({
        path: "/components/:name",
        component: ComponentView,
        handle: component.title,
        inNav: true,
        exact: true,
      });
    });
    sectionedComponentRoutes.push(sectionRoutes);
  }

  return sectionedComponentRoutes;
};

export const routes: Array<AtlantisRoute> = [
  {
    path: "/",
    component: HomePage,
    exact: true,
    handle: "Home",
  },
  {
    path: "/components",
    handle: "Components",
    exact: true,
    component: ComponentsPage,
    children: generateComponentSidebar(),
  },
  {
    path: "/design",
    handle: "Design",
    exact: true,
    component: DesignPage,
  },
  {
    path: "/changelog",
    handle: "Changelog",
    exact: true,
    // component: ComponentsChangelogPage,
    children: [
      {
        path: "/changelog/components",
        handle: "Components",
        exact: true,
        component: ComponentsChangelogPage,
      },
      {
        path: "/changelog/components-native",
        handle: "Components Native",
        exact: true,
        component: ComponentsNativeChangelogPage,
      },
      {
        path: "/changelog/design",
        handle: "Design",
        exact: true,
        component: DesignChangelogPage,
      },
    ],
  },
  {
    path: "/components/:name",
    component: ComponentView,
    handle: "Web",
    inNav: false,
  },
  {
    path: "/content/:type/:name",
    component: ContentLoader,
    handle: "Content",
    inNav: false,
  },
];
