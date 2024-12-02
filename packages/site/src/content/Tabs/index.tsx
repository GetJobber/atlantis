import { Tabs } from "@jobber/components";
import Content from "@atlantis/docs/components/Tabs/Tabs.stories.mdx";
import Props from "./Tabs.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Tabs,
    defaultProps: {},
  },
  title: "Tabs",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Tabs-web--docs",
    },
  ],
} as const satisfies ContentExport;
