import CheckboxContent from "./Checkbox.stories.mdx";
import Props from "./Checkbox.props.json";
import MobileProps from "./Checkbox.props-mobile.json";
import RebuiltProps from "./CheckboxV2.props.json";
import Notes from "./CheckboxNotes.mdx";
import originalExample from "./exampleV1.ts";
import rebuiltExample from "./exampleV2.ts";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <CheckboxContent />,
  props: Props,
  mobileProps: MobileProps,
  webSupportedProps: RebuiltProps,
  component: {
    element: originalExample,
    webSupported: rebuiltExample,
    mobileElement: `<Checkbox label={"Check me out"} name={"storyCheckbox"} />`,
  },
  title: "Checkbox",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl("?path=/docs/components-selections-checkbox--docs"),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
