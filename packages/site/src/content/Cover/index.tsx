import Content from "./Cover.mdx";
import Props from "./Cover.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Cover minHeight="100vh">
  <Text>Content Above</Text>
  <Cover.Center>
    <Text>Centered Content</Text>
  </Cover.Center>
  <Text>Content Below</Text>
</Cover>`,
  },
  title: "Cover",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-cover--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
