import { FormField } from "@jobber/components";
import Content from "@atlantis/docs/components/FormField/FormField.stories.mdx";
import Props from "./FormField.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: FormField,
    defaultProps: {},
  },
  title: "FormField",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-FormField-web--docs",
    },
  ],
} as const satisfies ContentExport;
