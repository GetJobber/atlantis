import { Divider } from "@jobber/components";
import Content from "@atlantis/docs/components/Divider/Divider.stories.mdx";
import Props from "./Divider.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Divider,
    defaultProps: {},
  },
  title: "Divider",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Divider-web--docs",
    },
  ],
} as const satisfies ContentExport;
