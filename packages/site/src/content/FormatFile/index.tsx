import { FormatFile } from "@jobber/components";
import Content from "@atlantis/docs/components/FormatFile/FormatFile.stories.mdx";
import Props from "./FormatFile.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: FormatFile,
    defaultProps: {  },
  },
  title: "FormatFile",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-FormatFile-web--docs",
    },
  ],
} as const satisfies ContentExport;