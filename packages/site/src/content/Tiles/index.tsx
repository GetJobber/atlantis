import Content from "./Tiles.mdx";
import Props from "./Tiles.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Stack>
        <Tiles>
        <Frame>
        <img src="/img_collage.jpg" />
        </Frame>
        <Frame>
        <img src="/img_collage.jpg" />
        </Frame>
    </Tiles>
    </Stack>
    `,
  },
  title: "Tiles",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-tiles-web--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
