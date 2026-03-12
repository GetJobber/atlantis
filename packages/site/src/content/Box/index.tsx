import Content from "./Box.stories.mdx";
import Props from "./Box.props.json";
import Notes from "./BoxNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Box padding="large" background="success--surface" radius="large" border="base">
        <Text>Box content</Text>
      </Box>
    `,
  },
  title: "Box",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-layouts-and-structure-box--basic",
        "web",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
