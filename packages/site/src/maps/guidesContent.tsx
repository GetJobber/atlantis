import CreateAReactComponentComponent from "@atlantis/docs/guides/create-basic-component.stories.mdx";
import CustomizingComponentsComponent from "@atlantis/docs/guides/customizing-components.stories.mdx";
import DocumentationStyleguideComponent from "@atlantis/docs/guides/documentation-style.stories.mdx";
import FrontendStyleguideComponenet from "@atlantis/docs/guides/frontend-style.stories.mdx";
import GettingSatrtedWithReactComponent from "@atlantis/docs/getting-started-with-react/getting-started-with-react.stories.mdx";
import PullRequestTitleGeneratorComponent from "@atlantis/docs/guides/pull-request-title-generator.stories.mdx";
import { ContentMapItems } from "../types/maps";

export const guidesContentMap: ContentMapItems = {
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
    intro: "Documentation styleguide",
    title: "Documentation styleguide",
    content: () => <DocumentationStyleguideComponent />,
  },
  "frontend-styleguide": {
    intro: "Frontend styleguide",
    title: "Frontend styleguide",
    content: () => <FrontendStyleguideComponenet />,
  },
  "getting-started-with-react": {
    intro: "Getting started with React",
    title: "Getting started with React",
    content: () => <GettingSatrtedWithReactComponent />,
  },
  "pull-request-title-generator": {
    intro: "Pull request title generator",
    title: "Pull request title generator",
    content: () => <PullRequestTitleGeneratorComponent />,
  },
};
