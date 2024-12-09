import Content from "@atlantis/docs/components/ActionItem/ActionItem.stories.mdx";
import MobileProps from "./ActionItem.props-mobile.json";
import { ContentExport } from "../../types/content";

console.log("HI?", window.env);
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
      url: `${
        (window as AtlantisWindow).env?.VITE_STORYBOOK_URL
      }?path=/docs/components-layouts-and-structure-actionitem--docs`,
    },
  ],
} as const satisfies ContentExport;
