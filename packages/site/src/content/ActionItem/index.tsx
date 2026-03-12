import Content, { toc } from "./ActionItem.stories.mdx";
import MobileProps from "./ActionItem.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
  mobileProps: MobileProps,
  component: {
    mobileElement: `<ActionItem
      icon={"work"}
      onPress={() => {
         alert("Work!")
      }}
    >
      <Text>Service Checklist</Text>
    </ActionItem>`,
  },
  title: "ActionItem",
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-actionitem--basic",
        "mobile",
      ),
    },
  ],
} as const satisfies ContentExport;
