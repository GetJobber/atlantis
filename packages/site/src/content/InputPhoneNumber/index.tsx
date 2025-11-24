import Content from "./InputPhoneNumber.stories.mdx";
import Props from "./InputPhoneNumber.props.json";
import RebuiltProps from "./InputPhoneNumberV2.props.json";
import originalExample from "./exampleV1";
import rebuiltExample from "./exampleV2";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  webSupportedProps: RebuiltProps,
  component: {
    element: originalExample,
    webSupported: rebuiltExample,
  },
  title: "InputPhoneNumber",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-forms-and-inputs-inputphonenumber--docs`,
      ),
    },
  ],
  webSupportedLinks: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputphonenumber-web-v2--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
