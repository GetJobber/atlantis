import Content from "./TextList.stories.mdx";
import MobileProps from "./TextList.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(
        `?path=/story/components-lists-and-tables-textlist-mobile--basic`,
        "mobile",
      ),
    },
  ],
} as const satisfies ContentExport;
