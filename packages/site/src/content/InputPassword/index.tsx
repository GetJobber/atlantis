import InputPasswordContent, { toc } from "./InputPassword.stories.mdx";
import Props from "./InputPassword.props.json";
import MobileProps from "./InputPassword.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <InputPasswordContent />,
  toc,
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
        `?path=/docs/components-forms-and-inputs-inputphonenumber--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
