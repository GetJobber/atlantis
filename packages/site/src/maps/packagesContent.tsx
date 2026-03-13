import ComponentsPackageComponent, {
  toc as componentsPackageToc,
} from "@atlantis/packages/components/README.md";
import DesignPackageComponent, {
  toc as designPackageToc,
} from "@atlantis/packages/design/README.md";
import EslintConfigPackageComponent, {
  toc as eslintConfigPackageToc,
} from "@atlantis/packages/eslint-config/README.md";
import HooksPackageComponent, {
  toc as hooksPackageToc,
} from "@atlantis/packages/hooks/README.md";
import StylelintConfigPackageComponent, {
  toc as stylelintConfigPackageToc,
} from "@atlantis/packages/stylelint-config/README.md";
import { ContentMapItems } from "../types/maps";

export const packagesContentMap: ContentMapItems = {
  components: {
    intro:
      "This package contains the base set of React components for Atlantis.",
    title: "Jobber Atlantis Components",
    content: () => <ComponentsPackageComponent />,
    toc: componentsPackageToc,
  },
  design: {
    intro:
      "Foundational colors, styling and design tokens for the Jobber Atlantis Design System.",
    title: "Foundation",
    content: () => <DesignPackageComponent />,
    toc: designPackageToc,
  },
  "eslint-config": {
    intro: "This package contains the base set of ESLint rules for Atlantis.",
    title: "ESLint Config",
    content: () => <EslintConfigPackageComponent />,
    toc: eslintConfigPackageToc,
  },
  hooks: {
    intro: "Shared hooks for components in Atlantis.",
    title: "Hooks",
    content: () => <HooksPackageComponent />,
    toc: hooksPackageToc,
  },
  "stylelint-config": {
    intro:
      "This package contains the base set of Stylelint rules for Atlantis.",
    title: "Stylelint Config",
    content: () => <StylelintConfigPackageComponent />,
    toc: stylelintConfigPackageToc,
  },
};
