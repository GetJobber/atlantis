import Content from "@atlantis/docs/components/ActionItem/ActionItem.stories.mdx";
import Props from "./ActionItem.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: "",
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
      url: "http://localhost:6006/?path=/docs/components-utilities-ActionItem-web--docs",
    },
  ],
} as const satisfies ContentExport;
