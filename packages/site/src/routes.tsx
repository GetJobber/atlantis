import { HomePage } from "./pages/HomePage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { ContentLoader } from "./components/ContentLoader";
import { DesignPage } from "./pages/DesignPage";
import { ComponentView } from "./layout/ComponentView";
import { componentList } from "./componentList";
import { ComponentsChangelogPage } from "./pages/ComponentsChangelogPage";
import { ComponentsNativeChangelogPage } from "./pages/ComponentsNativeChangelogPage";
import { DesignChangelogPage } from "./pages/DesignChangelogPage";
import { componentGroupings } from "./componentGroupings";

interface AtlantisRoute {
  path?: string;
  component?: () => JSX.Element;
  exact?: boolean;
  children?: Array<AtlantisRoute>;
  inNav?: boolean;
  handle: string;
}

const groupedComponentNavRoutes: Array<AtlantisRoute> = [];

const populateComponentRoutes = () => {
  for (const [grouping, components] of Object.entries(componentGroupings)) {
    const tempGrouping = { handle: grouping, children: [] };

    for (const component of components) {
      tempGrouping.children.push({
        path: `/components/${component}`,
        component: ContentLoader,
        handle: component,
        inNav: true,
      });
    }
    groupedComponentNavRoutes.push(tempGrouping);
  }
};

const componentRoutes = componentList.map(component => ({
  path: component.to,
  component: ContentLoader,
  handle: component.title,
  inNav: true,
}));

populateComponentRoutes();

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
    children: groupedComponentNavRoutes,
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
