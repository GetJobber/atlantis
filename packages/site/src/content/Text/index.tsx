import { Text } from "@jobber/components";
import Content from "@atlantis/docs/components/Text/Text.stories.mdx";
import Props from "./Text.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Text,
    defaultProps: {},
  },
  title: "Text",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Text-web--docs",
    },
  ],
} as const satisfies ContentExport;
