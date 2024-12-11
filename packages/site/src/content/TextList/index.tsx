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
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-lists-and-tables-textlist--docs`,
    },
  ],
} as const satisfies ContentExport;
