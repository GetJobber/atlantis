import { Typography } from "@jobber/components";
import Content from "@atlantis/docs/components/Typography/Typography.stories.mdx";
import Props from "./Typography.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Typography,
    defaultProps: {  },
  },
  title: "Typography",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Typography-web--docs",
    },
  ],
} as const satisfies ContentExport;