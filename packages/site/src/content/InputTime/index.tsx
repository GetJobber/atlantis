import Content from "./InputTime.stories.mdx";
import Props from "./InputTime.props.json";
import RebuiltProps from "./InputTimeV2.props.json";
import Notes from "./InputTimeNotes.mdx";
import originalExample from "./exampleV1.ts";
import rebuiltExample from "./exampleV2.ts";
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
  title: "InputTime",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-forms-and-inputs-inputtime--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
