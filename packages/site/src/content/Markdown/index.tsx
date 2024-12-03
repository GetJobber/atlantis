import Content from "@atlantis/docs/components/Markdown/Markdown.stories.mdx";
import Props from "./Markdown.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const content = \`### Bananas\nBananas are **yellow** on the outside and **white** on the inside. They're also full of nutrients, _but thats just boring stuff_. At this point, I'll just ask you to [google it](https://lmgtfy.com/?q=types+of+bananas).\`;

  return (
    <Markdown content={content} basicUsage={undefined} externalLink={true} />
  );`,
    defaultProps: {},
  },
  title: "Markdown",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Markdown-web--docs",
    },
  ],
} as const satisfies ContentExport;
