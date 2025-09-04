import InputEmailContent from "./InputEmail.stories.mdx";
import Props from "./InputEmail.props.json";
import MobileProps from "./InputEmail.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <InputEmailContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<InputEmail placeholder={"Enter your email"} />`,
    mobileElement: `<InputEmail placeholder={"Enter your email"} />`,
  },
  title: "InputEmail",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-forms-and-inputs-inputemail--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
