import Content from "@atlantis/docs/components/Select/Select.stories.mdx";
import Props from "./Select.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Select placeholder={"My best friend"}>
      <Option value="tony">Tony</Option>
      <Option value="quincy">Quincy</Option>
      <Option value="peppa">Peppa Pig</Option>
    </Select>`,
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
