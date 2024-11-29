import { SideDrawer } from "@jobber/components";
import Content from "@atlantis/docs/components/SideDrawer/SideDrawer.stories.mdx";
import Props from "./SideDrawer.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: SideDrawer,
    defaultProps: {},
  },
  title: "SideDrawer",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-SideDrawer-web--docs",
    },
  ],
} as const satisfies ContentExport;
