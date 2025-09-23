import Content from "./InputFile.stories.mdx";
import Props from "./InputFile.props.json";
import Notes from "./InputFileNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<InputFile />`,
    defaultProps: {},
  },
  title: "InputFile",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-forms-and-inputs-inputfile--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
