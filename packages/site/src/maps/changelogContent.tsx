import ComponentsChangelog from "../../../components/CHANGELOG.md";
import ComponentsNativeChangelog from "../../../components-native/CHANGELOG.md";
import DesignChangelog from "../../../design/CHANGELOG.md";
import { ContentMapItems } from "../types/maps";

export const changelogContentMap: ContentMapItems = {
  components: {
    intro: "Components",
    title: "Components",
    content: () => <ComponentsChangelog />,
  },
  "components-native": {
    intro: "Components-Native",
    title: "Components Native",
    content: () => <ComponentsNativeChangelog />,
  },
  design: {
    intro: "Design",
    title: "Design",
    content: () => <DesignChangelog />,
  },
};
