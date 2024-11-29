import { InputNumber } from "@jobber/components";
import Content from "@atlantis/docs/components/InputNumber/InputNumber.stories.mdx";
import Props from "./InputNumber.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: InputNumber,
    defaultProps: {  },
  },
  title: "InputNumber",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputNumber-web--docs",
    },
  ],
} as const satisfies ContentExport;