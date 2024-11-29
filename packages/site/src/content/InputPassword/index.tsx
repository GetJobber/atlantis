import { InputPassword } from "@jobber/components";
import InputPasswordContent from "@atlantis/docs/components/InputPassword/InputPassword.stories.mdx";
import Props from "./InputPassword.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <InputPasswordContent />,
  props: Props,
  component: {
    element: InputPassword,
    defaultProps: { placeholder: "Password" },
  },
  title: "InputPassword",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputPassword-web--docs",
    },
  ],
} as const satisfies ContentExport;
