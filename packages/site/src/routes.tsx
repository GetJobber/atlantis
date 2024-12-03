import { HomePage } from "./pages/HomePage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { ContentLoader } from "./components/ContentLoader";
import { DesignPage } from "./pages/DesignPage";
import { ComponentView } from "./layout/ComponentView";
import { componentList } from "./componentList";

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
  ...componentRoutes,
];
