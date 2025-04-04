import Content from "./Rectangle.mdx";
import Props from "./Rectangle.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-rectangle-web--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
