import Content from "./Frame.mdx";
import Props from "./Frame.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Frame>
        <img src="/img_collage.jpg" />
    </Frame>`,
  },
  title: "Frame",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Frame-web--docs",
    },
  ],
} as const satisfies ContentExport;
