import { InputValidation } from "@jobber/components";
import Content from "@atlantis/docs/components/InputValidation/InputValidation.stories.mdx";
import Props from "./InputValidation.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: InputValidation,
    defaultProps: {},
  },
  title: "InputValidation",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputValidation-web--docs",
    },
  ],
} as const satisfies ContentExport;
