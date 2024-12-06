import Content from "@atlantis/docs/components/Text/Text.stories.mdx";
import Props from "./Text.props.json";
import MobileProps from "./Text.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Text>Text</Text>`,
    mobileElement: `<Text>Text</Text>`,
  },
  title: "Text",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Text-web--docs",
    },
  ],
} as const satisfies ContentExport;
