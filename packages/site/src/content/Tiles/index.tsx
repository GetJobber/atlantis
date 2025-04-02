import Content from "./Tiles.mdx";
import Props from "./Tiles.props.json";
import { ContentExport } from "../../types/content";

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
      url: "http://localhost:6006/?path=/docs/components-utilities-Tiles-web--docs",
    },
  ],
} as const satisfies ContentExport;
