import Content from "@atlantis/docs/components/InputFile/InputFile.stories.mdx";
import Props from "./InputFile.props.json";
import { ContentExport } from "../../types/content";

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
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-forms-and-inputs-inputfile--docs`,
    },
  ],
} as const satisfies ContentExport;
