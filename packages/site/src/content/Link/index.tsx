import LinkContent, { toc } from "./Link.stories.mdx";
import Props from "./Link.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <LinkContent />,
  toc,
  props: Props,
  component: {
    element: `<Link url="https://en.wikipedia.org/wiki/Hyperlink" external={true}>What is a link anyway?</Link>`,
  },
  title: "Link",
  description: "",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-text-and-typography-link--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
