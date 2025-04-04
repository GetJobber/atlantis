import Content from "./Frame.mdx";
import Props from "./Frame.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Frame n={16} d={9}>
  <img src="/img_collage.jpg" />
</Frame>`,
  },
  title: "Frame",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-frame-web--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
