import ComponentsChangelog from "../../../components/CHANGELOG.md";
import ComponentsNativeChangelog from "../../../components-native/CHANGELOG.md";
import DesignChangelog from "../../../design/CHANGELOG.md";
import DocxChangelog from "../../../docx/CHANGELOG.md";
import EslintConfigChangelog from "../../../eslint-config/CHANGELOG.md";
import FormattersChangelog from "../../../formatters/CHANGELOG.md";
import GeneratorsChangelog from "../../../generators/CHANGELOG.md";
import HooksChangelog from "../../../hooks/CHANGELOG.md";
import StylelintConfigChangelog from "../../../stylelint-config/CHANGELOG.md";
import { ContentMapItems } from "../types/maps";

export const changelogContentMap: ContentMapItems = {
  components: {
    intro: "Components",
    title: "Components",
    content: () => <ComponentsChangelog />,
  },
  "components-native": {
    intro: "Components-Native",
    title: "Components-Native",
    content: () => <ComponentsNativeChangelog />,
  },
  design: {
    intro: "Design",
    title: "Design",
    content: () => <DesignChangelog />,
  },
  docx: {
    intro: "Docx",
    title: "Docx",
    content: () => <DocxChangelog />,
  },
  "eslint-config": {
    intro: "Eslint Config",
    title: "Eslint Config",
    content: () => <EslintConfigChangelog />,
  },
  formatters: {
    intro: "Formatters",
    title: "Formatters",
    content: () => <FormattersChangelog />,
  },
  generators: {
    intro: "Generators",
    title: "Generators",
    content: () => <GeneratorsChangelog />,
  },
  hooks: {
    intro: "Hooks",
    title: "Hooks",
    content: () => <HooksChangelog />,
  },
  "stylelint-config": {
    intro: "Stylelint Config",
    title: "Stylelint Config",
    content: () => <StylelintConfigChangelog />,
  },
};
