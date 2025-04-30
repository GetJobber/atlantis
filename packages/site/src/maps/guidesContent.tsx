import CreateAReactComponentComponent from "@atlantis/docs/guides/create-basic-component.stories.mdx";
import CustomizingComponentsComponent from "@atlantis/docs/guides/customizing-components.stories.mdx";
import DocumentationStyleguideComponent from "@atlantis/docs/guides/documentation-style.stories.mdx";
import FrontendStyleguideComponent from "@atlantis/docs/guides/frontend-style.stories.mdx";
import AddingAnIcon from "@atlantis/docs/guides/adding-an-icon.stories.mdx";
import GettingStartedWithReactComponent from "@atlantis/docs/getting-started-with-react/getting-started-with-react.stories.mdx";
import PullRequestTitleGeneratorComponent from "@atlantis/docs/guides/pull-request-title-generator.stories.mdx";
import Figma101Component from "@atlantis/docs/guides/figma-101.mdx";
import AtlantisOverviewComponent from "@atlantis/docs/guides/atlantis-overview.mdx";
import ContributingComponent from "@atlantis/docs/guides/contributing.mdx";
import PageLayoutsComponent from "../guides/page-layouts.stories.mdx";
import ScaffoldingComponent from "../guides/scaffolding.stories.mdx";
import { ContentMapItems } from "../types/maps";

export const guidesContentMap: ContentMapItems = {
  "atlantis-overview": {
    intro: "Atlantis overview",
    title: "Atlantis overview",
    content: () => <AtlantisOverviewComponent />,
  },
  contributing: {
    intro: "Contributing",
    title: "Contributing",
    content: () => <ContributingComponent />,
  },
  "create-a-react-component": {
    intro: "Create a react component",
    title: "Create a react component",
    content: () => <CreateAReactComponentComponent />,
  },
  "customizing-components": {
    intro: "Customizing components",
    title: "Customizing components",
    content: () => <CustomizingComponentsComponent />,
  },
  "documentation-styleguide": {
    intro: "Writing documentation",
    title: "Writing documentation",
    content: () => <DocumentationStyleguideComponent />,
  },
  "adding-an-icon": {
    intro: "Adding an icon",
    title: "Adding an icon",
    content: () => <AddingAnIcon />,
  },
  "figma-101": {
    intro: "Figma 101",
    title: "Figma 101",
    content: () => <Figma101Component />,
  },
  "frontend-styleguide": {
    intro: "Frontend styleguide",
    title: "Frontend styleguide",
    content: () => <FrontendStyleguideComponent />,
  },
  "getting-started-with-react": {
    intro: "Getting started with React",
    title: "Getting started with React",
    content: () => <GettingStartedWithReactComponent />,
  },
  "pull-request-title-generator": {
    intro: "Pull request title generator",
    title: "Pull request title generator",
    content: () => <PullRequestTitleGeneratorComponent />,
  },
  "page-layouts": {
    intro: "Page layouts",
    title: "Page layouts",
    content: () => <PageLayoutsComponent />,
  },
  scaffolding: {
    intro: "Scaffolding",
    title: "Scaffolding",
    content: () => <ScaffoldingComponent />,
    noMaxWidth: true,
  },
};
