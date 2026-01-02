import InputEmailContent from "./InputEmail.stories.mdx";
import Props from "./InputEmail.props.json";
import MobileProps from "./InputEmail.props-mobile.json";
import RebuiltProps from "./InputEmailV2.props.json";
import originalExample from "./exampleV1";
import rebuiltExample from "./exampleV2";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <InputEmailContent />,
  props: Props,
  mobileProps: MobileProps,
  webSupportedProps: RebuiltProps,
  component: {
    element: originalExample,
    webSupported: rebuiltExample,
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
  webSupportedLinks: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputemail-web-v2--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
