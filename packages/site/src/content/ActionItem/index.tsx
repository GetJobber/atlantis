import Content from "./ActionItem.stories.mdx";
import MobileProps from "./ActionItem.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
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
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-layouts-and-structure-actionitem--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
