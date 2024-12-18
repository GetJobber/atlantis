import ComponentsPackageComponent from "@atlantis/packages/components/README.md";
import DesignPackageComponent from "@atlantis/packages/design/README.md";
import EslintConfigPackageComponent from "@atlantis/packages/eslint-config/README.md";
import HooksPackageComponent from "@atlantis/packages/hooks/README.md";
import StylelintConfigPackageComponent from "@atlantis/packages/stylelint-config/README.md";
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
