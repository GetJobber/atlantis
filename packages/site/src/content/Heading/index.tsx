import HeadingContent from "@atlantis/docs/components/Heading/Heading.stories.mdx";
import Props from "./Heading.props.json";
import MobileProps from "./Heading.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <HeadingContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Heading level={1} element={"h1"}>New client</Heading>`,
    mobileElement: `<Heading level={1} element={"h1"}>New client</Heading>`,
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
