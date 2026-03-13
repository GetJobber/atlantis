import Content, { toc } from "./IconButton.stories.mdx";
import MobileProps from "./IconButton.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
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
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-actions-iconbutton--basic",
        "mobile",
      ),
    },
  ],
} as const satisfies ContentExport;
