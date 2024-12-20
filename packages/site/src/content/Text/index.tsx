import Content from "@atlantis/docs/components/Text/Text.stories.mdx";
import Props from "./Text.props.json";
import MobileProps from "./Text.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(
        `?path=/docs/components-text-and-typography-text--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
