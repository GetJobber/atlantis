import { HomePage } from "./pages/HomePage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { ContentLoader } from "./components/ContentLoader";
import { DesignPage } from "./pages/DesignPage";
import { ComponentView } from "./layout/ComponentView";
import { componentList } from "./componentList";
import { ComponentsChangelogPage } from "./pages/ComponentsChangelogPage";
import { ComponentsNativeChangelogPage } from "./pages/ComponentsNativeChangelogPage";
import { DesignChangelogPage } from "./pages/DesignChangelogPage";

interface AtlantisRoute {
  path: string;
  component?: () => JSX.Element;
  exact?: boolean;
  children?: Array<AtlantisRoute>;
  inNav?: boolean;
  handle: string;
}

const componentRoutes = componentList.map(component => ({
  path: component.to,
  component: ContentLoader,
  handle: component.title,
  inNav: true,
}));

export const routes: Array<AtlantisRoute> = [
  {
    path: "/docs",
    component: HomePage,
    exact: true,
    handle: "Home",
  },
  {
    path: "/docs/components",
    handle: "Components",
    exact: true,
    component: ComponentsPage,
  },
  {
    path: "/docs/design",
    handle: "Design",
    exact: true,
    component: DesignPage,
  },
  {
    path: "/docs/changelog",
    handle: "Changelog",
    exact: true,
    // component: ComponentsChangelogPage,
    children: [
      {
        path: "/docs/changelog/components",
        handle: "Components",
        exact: true,
        component: ComponentsChangelogPage,
      },
      {
        path: "/docs/changelog/components-native",
        handle: "Components Native",
        exact: true,
        component: ComponentsNativeChangelogPage,
      },
      {
        path: "/docs/changelog/design",
        handle: "Design",
        exact: true,
        component: DesignChangelogPage,
      },
    ],
  },
  {
    path: "/docs/components/:name",
    component: ComponentView,
    handle: "Web",
    inNav: false,
  },
  {
    path: "/docs/content/:type/:name",
    component: ContentLoader,
    handle: "Content",
    inNav: false,
  },
  ...componentRoutes,
];
