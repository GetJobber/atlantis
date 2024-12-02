import { Flex } from "@jobber/components";
import Content from "@atlantis/docs/components/Flex/Flex.stories.mdx";
import Props from "./Flex.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Flex,
    defaultProps: {},
  },
  title: "Flex",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Flex-web--docs",
    },
  ],
} as const satisfies ContentExport;
