import Content from "@atlantis/docs/components/Box/Box.stories.mdx";
import Props from "./Box.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Box padding="base" border="base">
        <Text>Box Content</Text>
      </Box>
    `,
  },
  title: "Box",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-layouts-and-structure-box--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
