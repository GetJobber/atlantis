import { Form } from "@jobber/components";
import Content from "@atlantis/docs/components/Form/Form.stories.mdx";
import Props from "./Form.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Form,
    defaultProps: {},
  },
  title: "Form",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Form-web--docs",
    },
  ],
} as const satisfies ContentExport;
