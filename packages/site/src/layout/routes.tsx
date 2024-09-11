import { ContentView } from "../pages/ContentView";
import { ComponentView } from "../components/ComponentView/ComponentView";
import { HomePage } from "../pages/HomePage";
import WelcomeGuideContent from "../../../../docs/README.md";
import ColorsContent from "../../../../docs/design/Colors.stories.mdx";
import { ComponentsPage } from "../pages/ComponentsPage";

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
    component: ComponentsPage,
  },
  {
    path: "/components/web/:name",
    component: ComponentView,
    handle: "Web",
    inNav: false,
  },
  {
    path: "/colors",
    component: () => (
      <ContentView intro="Colors!" title="Title!" content={<ColorsContent />} />
    ),
    handle: "Colors",
  },
  {
    path: "/welcome-guide",
    component: () => (
      <ContentView
        intro="Welcome!"
        title="Welcome Guide!"
        content={<WelcomeGuideContent />}
      />
    ),
    handle: "Welcome Guide",
  },
];
