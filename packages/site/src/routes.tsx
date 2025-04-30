import { HomePage } from "./pages/HomePage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { ContentLoader } from "./components/ContentLoader";
import { ContentPage } from "./pages/ContentPage";
import { DesignPage } from "./pages/DesignPage";
import { PatternsPage } from "./pages/PatternsPage";
import { ComponentView } from "./layout/ComponentView";
import { componentList } from "./componentList";
import { componentSections } from "./componentSections";
import { ChangelogPage } from "./pages/ChangelogPage";
import { HooksPage } from "./pages/HooksPage";
import { hooksList } from "./hooksList";
import { GuidesPage } from "./pages/GuidesPage";
import { PackagesPage } from "./pages/PackagesPage";
import { ComponentNotFound } from "./components/ComponentNotFound";
import { WelcomeGuidePage } from "./pages/WelcomeGuidePage";

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

const generateHooksSidebar = () => {
  const hookRoutes: Array<AtlantisRoute> = [];
  hooksList.map(hook => {
    hookRoutes.push({
      path: `/hooks/${hook.title}`,
      handle: hook.title,
      inNav: true,
      exact: true,
    });
  });

  return hookRoutes;
};

export const routes: Array<AtlantisRoute> = [
  {
    path: "/",
    component: HomePage,
    exact: true,
    handle: "Home",
  },
  {
    path: "/patterns",
    handle: "Patterns",
    exact: true,
    component: PatternsPage,
    children: [
      {
        path: "/patterns/interaction",
        handle: "Interaction",
        exact: true,
      },
      {
        path: "/patterns/empty-states",
        handle: "Empty states",
        exact: true,
      },
      {
        path: "/patterns/errors",
        handle: "Errors",
        exact: true,
      },
      {
        path: "/patterns/disabled-states",
        handle: "Disabled states",
        exact: true,
      },
    ],
  },
  {
    path: "/components",
    handle: "Components",
    exact: true,
    component: ComponentsPage,
    children: generateComponentSidebar(),
  },
  {
    path: "/content",
    handle: "Content",
    exact: true,
    component: ContentPage,
    children: [
      {
        path: "/content/formatting",
        handle: "Formatting",
        exact: true,
      },
      {
        path: "/content/product-vocabulary",
        handle: "Product Vocabulary",
        exact: true,
      },
      {
        path: "/content/voice-and-tone",
        handle: "Voice & tone",
        exact: true,
      },
    ],
  },
  {
    path: "/design",
    handle: "Design",
    exact: true,
    component: DesignPage,
    children: [
      {
        path: "/design/animation",
        handle: "Animation",
        exact: true,
      },
      {
        path: "/design/borders",
        handle: "Borders",
        exact: true,
      },
      {
        path: "/design/colors",
        handle: "Colors",
        exact: true,
      },
      {
        path: "/design/elevations",
        handle: "Elevations",
        exact: true,
      },
      {
        path: "/design/opacity",
        handle: "Opacity",
        exact: true,
      },
      {
        path: "/design/radii",
        handle: "Radii",
        exact: true,
      },
      {
        path: "/design/breakpoints",
        handle: "Breakpoints",
        exact: true,
      },
      {
        path: "/design/spacing",
        handle: "Spacing",
        exact: true,
      },
      {
        path: "/design/typography",
        handle: "Typography",
        exact: true,
      },
    ],
  },
  {
    path: "/hooks",
    handle: "Hooks",
    exact: true,
    component: HooksPage,
    children: generateHooksSidebar(),
  },
  {
    path: "/guides",
    handle: "Guides",
    exact: true,
    component: GuidesPage,
    children: [
      {
        path: "/guides/atlantis-overview",
        handle: "Atlantis overview",
        exact: true,
      },
      {
        path: "/guides/create-a-react-component",
        handle: "Create a React component",
        exact: true,
      },
      {
        path: "/guides/customizing-components",
        handle: "Customizing components",
        exact: true,
      },
      {
        path: "/guides/documentation-styleguide",
        handle: "Writing documentation",
        exact: true,
      },
      {
        path: "/guides/adding-an-icon",
        handle: "Adding an icon",
        exact: true,
      },
      {
        path: "/guides/frontend-styleguide",
        handle: "Frontend styleguide",
        exact: true,
      },
      {
        path: "/guides/figma-101",
        handle: "Figma 101",
        exact: true,
      },
      {
        path: "/guides/getting-started-with-react",
        handle: "Getting started with React",
        exact: true,
      },
      {
        path: "/guides/pull-request-title-generator",
        handle: "Pull request title generator",
        exact: true,
      },
      {
        path: "/guides/page-layouts",
        handle: "Page layouts",
        exact: true,
      },
      {
        path: "/guides/scaffolding",
        handle: "Scaffolding",
        exact: true,
      },
    ],
  },
  {
    path: "/packages",
    handle: "Packages",
    exact: true,
    component: PackagesPage,
    children: [
      {
        path: "/packages/components",
        handle: "Components",
        exact: true,
      },
      {
        path: "/packages/design",
        handle: "Design",
        exact: true,
      },
      {
        path: "/packages/eslint-config",
        handle: "Eslint Config",
        exact: true,
      },
      {
        path: "/packages/hooks",
        handle: "Hooks",
        exact: true,
      },
      {
        path: "/packages/stylelint-config",
        handle: "Stylelint Config",
        exact: true,
      },
    ],
  },
  {
    path: "/changelog",
    handle: "Changelog",
    exact: true,
    component: ChangelogPage,
    children: [
      {
        path: "/changelog/components",
        handle: "Components",
        exact: true,
      },
      {
        path: "/changelog/components-native",
        handle: "Components-Native",
        exact: true,
      },
      {
        path: "/changelog/design",
        handle: "Design",
        exact: true,
      },
      {
        path: "/changelog/docx",
        handle: "Docx",
        exact: true,
      },
      {
        path: "/changelog/eslint-config",
        handle: "Eslint Config",
        exact: true,
      },
      {
        path: "/changelog/formatters",
        handle: "Formatters",
        exact: true,
      },
      {
        path: "/changelog/generators",
        handle: "Generators",
        exact: true,
      },
      {
        path: "/changelog/hooks",
        handle: "Hooks",
        exact: true,
      },
      {
        path: "/changelog/stylelint-config",
        handle: "Stylelint Config",
        exact: true,
      },
    ],
  },
  {
    path: "/components/:name",
    component: ComponentView,
    handle: "Web",
    inNav: false,
    exact: true,
  },
  {
    path: "/design/:name",
    component: ContentLoader,
    handle: "DesignContent",
    inNav: false,
    exact: true,
  },
  {
    path: "/content/:name",
    component: ContentLoader,
    handle: "GeneralContent",
    inNav: false,
    exact: true,
  },
  {
    path: "/hooks/:name",
    component: ContentLoader,
    handle: "HooksContent",
    inNav: false,
    exact: true,
  },
  {
    path: "/guides/:name",
    component: ContentLoader,
    handle: "GuidesContent",
    inNav: false,
    exact: true,
  },
  {
    path: "/packages/:name",
    component: ContentLoader,
    handle: "PackagesContent",
    inNav: false,
    exact: true,
  },
  {
    path: "/patterns/:name",
    component: ContentLoader,
    handle: "PatternsContent",
    inNav: false,
    exact: true,
  },
  {
    path: "/changelog/:name",
    component: ContentLoader,
    handle: "ChangelogContent",
    inNav: false,
    exact: true,
  },
  {
    path: "/component-not-found",
    component: ComponentNotFound,
    handle: "ComponentNotFound",
    inNav: false,
    exact: true,
  },
  {
    path: "/welcome-guide",
    component: WelcomeGuidePage,
    handle: "WelcomeGuide",
    inNav: false,
    exact: true,
  },
];
