import { InputFile } from "@jobber/components";
import Content from "@atlantis/docs/components/InputFile/InputFile.stories.mdx";
import Props from "./InputFile.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: InputFile,
    defaultProps: {},
  },
  title: "InputFile",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputFile-web--docs",
    },
  ],
} as const satisfies ContentExport;
