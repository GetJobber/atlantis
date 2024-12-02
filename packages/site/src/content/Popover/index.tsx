import { Popover } from "@jobber/components";
import Content from "@atlantis/docs/components/Popover/Popover.stories.mdx";
import Props from "./Popover.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Popover,
    defaultProps: {},
  },
  title: "Popover",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Popover-web--docs",
    },
  ],
} as const satisfies ContentExport;
