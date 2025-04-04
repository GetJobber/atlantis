import Content from "./Cover.mdx";
import Props from "./Cover.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Cover minHeight="100vh">
    Content Above
    <Cover.Center>Centered Content</Cover.Center>
    Content Below
    </Cover>`,
  },
  title: "Cover",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-cover-web--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
