import { MultiSelect } from "@jobber/components";
import Content from "@atlantis/docs/components/MultiSelect/MultiSelect.stories.mdx";
import Props from "./MultiSelect.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: MultiSelect,
    defaultProps: {},
  },
  title: "MultiSelect",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-MultiSelect-web--docs",
    },
  ],
} as const satisfies ContentExport;
