import Content from "./InputText.stories.mdx";
import Props from "./InputText.props.json";
import MobileProps from "./InputText.props-mobile.json";
import Notes from "./InputTextNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<InputText name="age" placeholder="Age in words" />`,
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
