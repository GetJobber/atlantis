import InputPasswordContent from "@atlantis/docs/components/InputPassword/InputPassword.stories.mdx";
import Props from "./InputPassword.props.json";
import MobileProps from "./InputPassword.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <InputPasswordContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<InputPassword placeholder={"Password"} />`,
    mobileElement: `<InputPassword placeholder={"Password"} />`,
  },
  title: "InputPassword",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputPassword-web--docs",
    },
  ],
} as const satisfies ContentExport;
