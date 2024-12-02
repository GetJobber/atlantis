import Content from "@atlantis/docs/components/Box/Box.stories.mdx";
import Props from "./Box.props.json";
import { ContentExport } from "../../types/content";

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
      url: "http://localhost:6006/?path=/docs/components-utilities-Box-web--docs",
    },
  ],
} as const satisfies ContentExport;
