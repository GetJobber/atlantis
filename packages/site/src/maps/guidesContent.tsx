import CreateAReactComponentComponent, {
  toc as createAReactComponentToc,
} from "../content/guides/create-basic-component.stories.mdx";
import CustomizingComponentsComponent, {
  toc as customizingComponentsToc,
} from "../content/guides/customizing-components.stories.mdx";
import DocumentationStyleguideComponent, {
  toc as documentationStyleguideToc,
} from "../content/guides/documentation-style.stories.mdx";
import FrontendStyleguideComponent, {
  toc as frontendStyleguideToc,
} from "../content/guides/frontend-style.stories.mdx";
import AddingAnIcon, {
  toc as addingAnIconToc,
} from "../content/guides/adding-an-icon.stories.mdx";
import GettingStartedWithReactComponent, {
  toc as gettingStartedWithReactToc,
} from "../content/guides/getting-started-with-react/getting-started-with-react.stories.mdx";
import PullRequestTitleGeneratorComponent, {
  toc as pullRequestTitleGeneratorToc,
} from "../content/guides/pull-request-title-generator.stories.mdx";
import Figma101Component, {
  toc as figma101Toc,
} from "../content/guides/figma-101.mdx";
import AtlantisOverviewComponent, {
  toc as atlantisOverviewToc,
} from "../content/guides/atlantis-overview.mdx";
import ContributingComponent, {
  toc as contributingToc,
} from "../content/guides/contributing.mdx";
import PageLayoutsComponent, {
  toc as pageLayoutsToc,
} from "../content/guides/page-layouts.stories.mdx";
import ScaffoldingComponent, {
  toc as scaffoldingToc,
} from "../content/guides/scaffolding.stories.mdx";
import { ContentMapItems } from "../types/maps";
import ComponentSupportLevelsComponent, {
  toc as componentSupportLevelsToc,
} from "../content/guides/component-support-levels.stories.mdx";
import WelcomeGuideComponent, {
  toc as welcomeGuideToc,
} from "../content/guides/welcome-guide.stories.mdx";
import RepositoryContributingComponent, {
  toc as repositoryContributingToc,
} from "../content/guides/repository-contributing.stories.mdx";
import CharterComponent, {
  toc as charterToc,
} from "../content/guides/charter.md";

export const guidesContentMap: ContentMapItems = {
  "atlantis-overview": {
    intro: "Atlantis overview",
    title: "Atlantis overview",
    content: () => <AtlantisOverviewComponent />,
    toc: atlantisOverviewToc,
  },
  "welcome-guide": {
    intro: "Welcome guide",
    title: "Welcome guide",
    content: () => <WelcomeGuideComponent />,
    toc: welcomeGuideToc,
  },
  contributing: {
    intro: "Contributing",
    title: "Contributing",
    content: () => <ContributingComponent />,
    toc: contributingToc,
  },
  "repository-contributing": {
    intro: "Repository contributing",
    title: "Repository contributing",
    content: () => <RepositoryContributingComponent />,
    toc: repositoryContributingToc,
  },
  charter: {
    intro: "Atlantis charter",
    title: "Atlantis charter",
    content: () => <CharterComponent />,
    toc: charterToc,
  },
  "create-a-react-component": {
    intro: "Create a react component",
    title: "Create a react component",
    content: () => <CreateAReactComponentComponent />,
    toc: createAReactComponentToc,
  },
  "customizing-components": {
    intro: "Customizing components",
    title: "Customizing components",
    content: () => <CustomizingComponentsComponent />,
    toc: customizingComponentsToc,
  },
  "documentation-styleguide": {
    intro: "Writing documentation",
    title: "Writing documentation",
    content: () => <DocumentationStyleguideComponent />,
    toc: documentationStyleguideToc,
  },
  "adding-an-icon": {
    intro: "Adding an icon",
    title: "Adding an icon",
    content: () => <AddingAnIcon />,
    toc: addingAnIconToc,
  },
  "figma-101": {
    intro: "Figma 101",
    title: "Figma 101",
    content: () => <Figma101Component />,
    toc: figma101Toc,
  },
  "frontend-styleguide": {
    intro: "Frontend styleguide",
    title: "Frontend styleguide",
    content: () => <FrontendStyleguideComponent />,
    toc: frontendStyleguideToc,
  },
  "getting-started-with-react": {
    intro: "Getting started with React",
    title: "Getting started with React",
    content: () => <GettingStartedWithReactComponent />,
    toc: gettingStartedWithReactToc,
  },
  "pull-request-title-generator": {
    intro: "Pull request title generator",
    title: "Pull request title generator",
    content: () => <PullRequestTitleGeneratorComponent />,
    toc: pullRequestTitleGeneratorToc,
  },
  "page-layouts": {
    intro: "Page layouts",
    title: "Page layouts",
    content: () => <PageLayoutsComponent />,
    toc: pageLayoutsToc,
  },
  scaffolding: {
    intro: "Scaffolding",
    title: "Scaffolding",
    content: () => <ScaffoldingComponent />,
    noMaxWidth: true,
    toc: scaffoldingToc,
  },
  "component-support-levels": {
    intro: "Component support levels",
    title: "Component support levels",
    content: () => <ComponentSupportLevelsComponent />,
    toc: componentSupportLevelsToc,
  },
};
