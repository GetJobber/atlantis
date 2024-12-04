import { HomePage } from "./pages/HomePage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { ContentLoader } from "./components/ContentLoader";
import { DesignPage } from "./pages/DesignPage";
import { ComponentView } from "./layout/ComponentView";
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
