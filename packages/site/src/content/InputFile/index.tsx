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
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputfile--variations-and-sizes",
        "web",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
