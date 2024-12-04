import InputEmailContent from "@atlantis/docs/components/InputEmail/InputEmail.stories.mdx";
import Props from "./InputEmail.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <InputEmailContent />,
  props: Props,
  component: {
    element: `<InputEmail placeholder={"Enter your email"} />`,
  },
  title: "InputEmail",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputEmail-web--docs",
    },
  ],
} as const satisfies ContentExport;
