import Content from "./InputText.stories.mdx";
import Props from "./InputText.props.json";
import MobileProps from "./InputText.props-mobile.json";
import RebuiltProps from "./InputTextV2.props.json";
import Notes from "./InputTextNotes.mdx";
import originalExample from "./exampleV1";
import rebuiltExample from "./exampleV2";
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
    mobileElement: `<InputText name="age" placeholder="Age in words." />`,
  },
  title: "InputText",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-forms-and-inputs-inputtext--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
