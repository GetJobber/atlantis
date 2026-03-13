import BreakingChanges, {
  toc as breakingChangesToc,
} from "../content/changelogs/breaking-changes.md";
import ComponentsChangelog, {
  toc as componentsChangelogToc,
} from "../../../components/CHANGELOG.md";
import ComponentsNativeChangelog, {
  toc as componentsNativeChangelogToc,
} from "../../../components-native/CHANGELOG.md";
import DesignChangelog, {
  toc as designChangelogToc,
} from "../../../design/CHANGELOG.md";
import DocxChangelog, {
  toc as docxChangelogToc,
} from "../../../docx/CHANGELOG.md";
import EslintConfigChangelog, {
  toc as eslintConfigChangelogToc,
} from "../../../eslint-config/CHANGELOG.md";
import FormattersChangelog, {
  toc as formattersChangelogToc,
} from "../../../formatters/CHANGELOG.md";
import GeneratorsChangelog, {
  toc as generatorsChangelogToc,
} from "../../../generators/CHANGELOG.md";
import HooksChangelog, {
  toc as hooksChangelogToc,
} from "../../../hooks/CHANGELOG.md";
import StylelintConfigChangelog, {
  toc as stylelintConfigChangelogToc,
} from "../../../stylelint-config/CHANGELOG.md";
import { ContentMapItems } from "../types/maps";

export const changelogContentMap: ContentMapItems = {
  "breaking-changes": {
    intro: "Upcoming Breaking Changes",
    title: "Upcoming Breaking Changes",
    content: () => <BreakingChanges />,
    toc: breakingChangesToc,
  },
  components: {
    intro: "Components",
    title: "Components",
    content: () => <ComponentsChangelog />,
    toc: componentsChangelogToc,
  },
  "components-native": {
    intro: "Components-Native",
    title: "Components-Native",
    content: () => <ComponentsNativeChangelog />,
    toc: componentsNativeChangelogToc,
  },
  design: {
    intro: "Design",
    title: "Design",
    content: () => <DesignChangelog />,
    toc: designChangelogToc,
  },
  docx: {
    intro: "Docx",
    title: "Docx",
    content: () => <DocxChangelog />,
    toc: docxChangelogToc,
  },
  "eslint-config": {
    intro: "Eslint Config",
    title: "Eslint Config",
    content: () => <EslintConfigChangelog />,
    toc: eslintConfigChangelogToc,
  },
  formatters: {
    intro: "Formatters",
    title: "Formatters",
    content: () => <FormattersChangelog />,
    toc: formattersChangelogToc,
  },
  generators: {
    intro: "Generators",
    title: "Generators",
    content: () => <GeneratorsChangelog />,
    toc: generatorsChangelogToc,
  },
  hooks: {
    intro: "Hooks",
    title: "Hooks",
    content: () => <HooksChangelog />,
    toc: hooksChangelogToc,
  },
  "stylelint-config": {
    intro: "Stylelint Config",
    title: "Stylelint Config",
    content: () => <StylelintConfigChangelog />,
    toc: stylelintConfigChangelogToc,
  },
};
