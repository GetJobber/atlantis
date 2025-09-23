import Content from "./InputTime.stories.mdx";
import Props from "./InputTime.props.json";
import Notes from "./InputTimeNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<InputTime defaultValue={{}} />`,
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
