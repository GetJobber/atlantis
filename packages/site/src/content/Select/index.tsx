import { Select } from "@jobber/components";
import Content from "@atlantis/docs/components/Select/Select.stories.mdx";
import Props from "./Select.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Select,
    defaultProps: {},
  },
  title: "Select",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Select-web--docs",
    },
  ],
} as const satisfies ContentExport;
