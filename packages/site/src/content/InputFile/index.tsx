import Content from "@atlantis/docs/components/InputFile/InputFile.stories.mdx";
import Props from "./InputFile.props.json";
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
} as const satisfies ContentExport;
