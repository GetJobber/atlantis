import Content from "./Rectangle.mdx";
import Props from "./Rectangle.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Rectangle>
    <Text>I am in a rectangle</Text>
    </Rectangle>`,
  },
  title: "Rectangle",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Rectangle-web--docs",
    },
  ],
} as const satisfies ContentExport;
