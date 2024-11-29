import { Markdown } from "@jobber/components";
import Content from "@atlantis/docs/components/Markdown/Markdown.stories.mdx";
import Props from "./Markdown.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Markdown,
    defaultProps: {  },
  },
  title: "Markdown",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Markdown-web--docs",
    },
  ],
} as const satisfies ContentExport;