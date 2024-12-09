import LinkContent from "@atlantis/docs/components/Link/Link.stories.mdx";
import Props from "./Link.props.json";
import { ContentExport } from "../../types/content";

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
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }/?path=/docs/components-utilities-Link-web--docs`,
    },
  ],
} as const satisfies ContentExport;
