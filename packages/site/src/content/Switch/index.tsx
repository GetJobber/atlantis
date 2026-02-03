import SwitchContent from "./Switch.stories.mdx";
import Props from "./Switch.props.json";
import MobileProps from "./Switch.props-mobile.json";
import { getStorybookUrl } from "../../layout/getStorybookUrl";
import { ContentExport } from "../../types/content";

export default {
  content: () => <SwitchContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Switch />`,
    mobileElement: `<Switch label='Switch example' />`,
  },
  title: "Switch",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-selections-switch--basic",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      url: getStorybookUrl("?path=/docs/components-selections-switch--docs"),
    },
  ],
} as const satisfies ContentExport;
