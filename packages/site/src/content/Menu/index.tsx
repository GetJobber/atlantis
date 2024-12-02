import { Menu } from "@jobber/components";
import Content from "@atlantis/docs/components/Menu/Menu.stories.mdx";
import Props from "./Menu.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Menu,
    defaultProps: {},
  },
  title: "Menu",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Menu-web--docs",
    },
  ],
} as const satisfies ContentExport;
