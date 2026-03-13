import Content, { toc } from "./InputPhoneNumber.stories.mdx";
import Props from "./InputPhoneNumber.props.json";
import RebuiltProps from "./InputPhoneNumberV2.props.json";
import originalExample from "./exampleV1";
import rebuiltExample from "./exampleV2";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
  props: Props,
  webSupportedProps: RebuiltProps,
  component: {
    element: originalExample,
    webSupported: rebuiltExample,
  },
  title: "InputPhoneNumber",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputphonenumber--basic",
        "web",
      ),
    },
  ],
  webSupportedLinks: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputphonenumber-v2--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
