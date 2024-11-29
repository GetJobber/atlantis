import { RecurringSelect } from "@jobber/components";
import Content from "@atlantis/docs/components/RecurringSelect/RecurringSelect.stories.mdx";
import Props from "./RecurringSelect.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: RecurringSelect,
    defaultProps: {  },
  },
  title: "RecurringSelect",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-RecurringSelect-web--docs",
    },
  ],
} as const satisfies ContentExport;