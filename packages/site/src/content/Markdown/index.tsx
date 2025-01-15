import Content from "@atlantis/docs/components/Markdown/Markdown.stories.mdx";
import Props from "./Markdown.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(
        `?path=/docs/components-text-and-typography-markdown--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
