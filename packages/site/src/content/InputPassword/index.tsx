import InputPasswordContent from "./InputPassword.stories.mdx";
import Props from "./InputPassword.props.json";
import MobileProps from "./InputPassword.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <InputPasswordContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<InputPassword placeholder={"Password Spot"} />`,
    mobileElement: `<InputPassword placeholder={"Password In"} />`,
  },
  title: "InputPassword",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/story/components-forms-and-inputs-inputphonenumber-web--basic`,
      ),
    },
  ],
} as const satisfies ContentExport;
