import Content from "@atlantis/docs/components/TextList/TextList.stories.mdx";
import MobileProps from "./TextList.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `<TextList items={["Item uno", "Item dos", "Item tres"]} />`,
  },
  title: "TextList",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-TextList-web--docs",
    },
  ],
} as const satisfies ContentExport;
