import Content from "./IconButton.stories.mdx";
import MobileProps from "./IconButton.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `<IconButton
      accessibilityLabel={"New Job"}
      name={"remove"}
      onPress={() => {
        alert("👍");
      }}
    />`,
  },
  title: "IconButton",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/story/components-actions-iconbutton-mobile--basic`,
        "mobile",
      ),
    },
  ],
} as const satisfies ContentExport;
