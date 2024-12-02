import { List } from "@jobber/components";
import Content from "@atlantis/docs/components/List/List.stories.mdx";
import Props from "./List.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: List,
    defaultProps: {},
  },
  title: "List",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-List-web--docs",
    },
  ],
} as const satisfies ContentExport;
