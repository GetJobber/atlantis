import Content from "./Tiles.mdx";
import Props from "./Tiles.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Tiles>
  <Frame>
    <img src="/img_collage.jpg" />
  </Frame>
  <Frame>
    <img src="/img_collage.jpg" />
  </Frame>
</Tiles>`,
  },
  title: "Tiles",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-tiles--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
