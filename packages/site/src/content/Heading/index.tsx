import { Heading } from "@jobber/components";
import HeadingContent from "@atlantis/docs/components/Heading/Heading.stories.mdx";
import Props from "./Heading.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <HeadingContent />,
  props: Props,
  component: {
    element: Heading,
    defaultProps: {
      children: "New client",
      level: "1",
      element: "h1",
    },
  },
  title: "Heading",
  description: "",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Heading-web--docs",
    },
  ],
} as const satisfies ContentExport;
