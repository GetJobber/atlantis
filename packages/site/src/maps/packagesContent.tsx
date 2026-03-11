import ComponentsPackageComponent from "../content/packages/components.stories.mdx";
import DesignPackageComponent from "../content/packages/design.stories.mdx";
import EslintConfigPackageComponent from "../content/packages/eslint-config.stories.mdx";
import HooksPackageComponent from "../content/packages/hooks.stories.mdx";
import StylelintConfigPackageComponent from "../content/packages/stylelint-config.stories.mdx";
import { ContentMapItems } from "../types/maps";

export const packagesContentMap: ContentMapItems = {
  components: {
    intro:
      "This package contains the base set of React components for Atlantis.",
    title: "Jobber Atlantis Components",
    content: () => <ComponentsPackageComponent />,
  },
  design: {
    intro:
      "Foundational colors, styling and design tokens for the Jobber Atlantis Design System.",
    title: "Foundation",
    content: () => <DesignPackageComponent />,
  },
  "eslint-config": {
    intro: "This package contains the base set of ESLint rules for Atlantis.",
    title: "ESLint Config",
    content: () => <EslintConfigPackageComponent />,
  },
  hooks: {
    intro: "Shared hooks for components in Atlantis.",
    title: "Hooks",
    content: () => <HooksPackageComponent />,
  },
  "stylelint-config": {
    intro:
      "This package contains the base set of Stylelint rules for Atlantis.",
    title: "Stylelint Config",
    content: () => <StylelintConfigPackageComponent />,
  },
};
