import { Link } from "@jobber/components";
import LinkContent from "@atlantis/docs/components/Link/Link.stories.mdx";
import Props from "./Link.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <LinkContent />,
  props: Props,
  component: {
    element: Link,
    defaultProps: {
      url: "https://en.wikipedia.org/wiki/Hyperlink",
      external: true,
      children: "What is a link anyway?",
    },
  },
  title: "Link",
  description: "",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Link-web--docs",
    },
  ],
} as const satisfies ContentExport;
