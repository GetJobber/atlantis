import LinkContent from "./Link.stories.mdx";
import Props from "./Link.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <LinkContent />,
  props: Props,
  component: {
    element: `<Link url="https://en.wikipedia.org/wiki/Hyperlink" external={true}>What is a link anyway?</Link>`,
  },
  title: "Link",
  description: "",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-text-and-typography-link--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
