import SwitchContent from "@atlantis/docs/components/Switch/Switch.stories.mdx";
import Props from "./Switch.props.json";
import { getStorybookUrl } from "../../layout/getStorybookUrl";
import { ContentExport } from "../../types/content";

export default {
  content: () => <SwitchContent />,
  props: Props,
  component: {
    element: `<Switch />`,
  },
  title: "Switch",
  links: [
    {
      label: "Switch Storybook",
      url: getStorybookUrl("?path=/docs/components-selections-switch--docs"),
    },
  ],
} as const satisfies ContentExport;
