/**
 * TanStack Router route tree - code-based routes for Atlantis site.
 *
 * Routes here mirror the paths and components defined in routes.tsx (the original
 * React Router config). When adding or changing routes:
 * 1. Update routes.tsx (path, component, handle, inNav, children for nav/sidebar).
 * 2. Update this file (path + component for the router).
 *
 * Mapping from routes.tsx:
 *   / → HomePage, /patterns → PatternsPage, /components → ComponentsPage,
 *   /components/:name → ComponentView, /content → ContentPage, /content/:name → ContentLoader,
 *   /design → DesignPage, /design/:name → ContentLoader, /hooks → HooksPage, /hooks/:name → ContentLoader,
 *   /guides → GuidesPage, /guides/:name → ContentLoader, /packages → PackagesPage, /packages/:name → ContentLoader,
 *   /changelog → ChangelogPage, /changelog/:name → ContentLoader, /patterns/:name → ContentLoader,
 *   /component-not-found → ComponentNotFound, /welcome-guide → WelcomeGuidePage.
 * Visual-tests routes (visual-tests, visual-tests/:path) were defined in Layout.tsx and are included here.
 */
import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Layout } from "./layout/Layout";
import { HomePage } from "./pages/HomePage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { ContentLoader } from "./components/ContentLoader";
import { ContentPage } from "./pages/ContentPage";
import { DesignPage } from "./pages/DesignPage";
import { PatternsPage } from "./pages/PatternsPage";
import { ComponentView } from "./layout/ComponentView";
import { ChangelogPage } from "./pages/ChangelogPage";
import { HooksPage } from "./pages/HooksPage";
import { GuidesPage } from "./pages/GuidesPage";
import { PackagesPage } from "./pages/PackagesPage";
import { ComponentNotFound } from "./components/ComponentNotFound";
import { WelcomeGuidePage } from "./pages/WelcomeGuidePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { VisualTestRouter } from "./pages/visualTests/VisualTestRouter";
import { VisualTestCatchAll } from "./pages/visualTests/VisualTestCatchAll";

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFoundPage,
  validateSearch: (search: Record<string, unknown>) => ({
    isLegacy:
      search?.isLegacy === true ||
      String(search?.isLegacy).toLowerCase() === "true",
    minimal:
      search?.minimal === true ||
      String(search?.minimal).toLowerCase() === "true",
  }),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const patternsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "patterns",
  component: PatternsPage,
});

const componentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "components",
  component: ComponentsPage,
});

const componentViewSearchSchema = (search: Record<string, unknown>) => ({
  isLegacy:
    search?.isLegacy === true ||
    String(search?.isLegacy).toLowerCase() === "true",
});

const componentsNameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "components/$name",
  component: ComponentView,
  validateSearch: componentViewSearchSchema,
});

const componentsNameTabRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "components/$name/$tab",
  component: ComponentView,
  validateSearch: componentViewSearchSchema,
});

const contentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "content",
  component: ContentPage,
});

const contentNameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "content/$name",
  component: ContentLoader,
});

const designRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "design",
  component: DesignPage,
});

const designNameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "design/$name",
  component: ContentLoader,
});

const hooksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "hooks",
  component: HooksPage,
});

const hooksNameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "hooks/$name",
  component: ContentLoader,
});

const guidesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "guides",
  component: GuidesPage,
});

const guidesNameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "guides/$name",
  component: ContentLoader,
});

const packagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "packages",
  component: PackagesPage,
});

const packagesNameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "packages/$name",
  component: ContentLoader,
});

const changelogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "changelog",
  component: ChangelogPage,
});

const changelogNameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "changelog/$name",
  component: ContentLoader,
});

const patternsNameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "patterns/$name",
  component: ContentLoader,
});

const componentNotFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "component-not-found",
  component: ComponentNotFound,
});

const welcomeGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "welcome-guide",
  component: WelcomeGuidePage,
});

const visualTestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "visual-tests",
  component: VisualTestCatchAll,
});

const visualTestsPathRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "visual-tests/$path",
  component: VisualTestRouter,
});

/* prettier-ignore */
const routeTree = rootRoute.addChildren([
  indexRoute,
  patternsRoute,
  patternsNameRoute,
  componentsRoute,
  componentsNameTabRoute,
  componentsNameRoute,
  contentRoute,
  contentNameRoute,
  designRoute,
  designNameRoute,
  hooksRoute,
  hooksNameRoute,
  guidesRoute,
  guidesNameRoute,
  packagesRoute,
  packagesNameRoute,
  changelogRoute,
  changelogNameRoute,
  componentNotFoundRoute,
  welcomeGuideRoute,
  visualTestsRoute,
  visualTestsPathRoute,
]);

export {
  rootRoute,
  routeTree,
  indexRoute,
  componentsNameRoute,
  componentsNameTabRoute,
  contentNameRoute,
  designNameRoute,
  hooksNameRoute,
  guidesNameRoute,
  packagesNameRoute,
  changelogNameRoute,
  patternsNameRoute,
  visualTestsPathRoute,
};
