import Content from "./Frame.mdx";
import Props from "./Frame.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Frame aspectX={16} aspectY={9}>
  <img src="/img_collage.jpg" />
</Frame>`,
  },
  title: "Frame",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-frame--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
