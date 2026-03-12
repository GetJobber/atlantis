import InputEmailContent, { toc } from "./InputEmail.stories.mdx";
import Props from "./InputEmail.props.json";
import MobileProps from "./InputEmail.props-mobile.json";
import RebuiltProps from "./InputEmailV2.props.json";
import originalExample from "./exampleV1";
import rebuiltExample from "./exampleV2";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <InputEmailContent />,
  toc,
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
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputemail--basic",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputemail--basic",
        "mobile",
      ),
    },
  ],
  webSupportedLinks: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputemail-v2--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
