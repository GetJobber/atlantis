import { Drawer } from "@jobber/components";
import Content from "@atlantis/docs/components/Drawer/Drawer.stories.mdx";
import Props from "./Drawer.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Drawer,
    defaultProps: {},
  },
  title: "Drawer",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Drawer-web--docs",
    },
  ],
} as const satisfies ContentExport;
