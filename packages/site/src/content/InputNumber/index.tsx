import Content from "./InputNumber.stories.mdx";
import Props from "./InputNumber.props.json";
import MobileProps from "./InputNumber.props-mobile.json";
import RebuiltProps from "./InputNumberV2.props.json";
import Notes from "./InputNumberNotes.mdx";
import originalExample from "./exampleV1.ts";
import rebuiltExample from "./exampleV2.ts";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  webSupportedProps: RebuiltProps,
  component: {
    element: originalExample,
    webSupported: rebuiltExample,
    mobileElement: `<InputNumber placeholder={"Quantity"} />`,
  },
  title: "InputNumber",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputnumber--basic",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputnumber--basic",
        "mobile",
      ),
    },
  ],
  webSupportedLinks: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputnumber-v2--basic",
        "web",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
