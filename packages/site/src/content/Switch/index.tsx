import { Switch } from "@jobber/components";
import SwitchContent from "@atlantis/docs/components/Switch/Switch.stories.mdx";
import Props from "./Switch.props.json";
import { getStorybookUrl } from "../../layout/getStorybookUrl";
import { ContentExport } from "../../types/content";

export default {
  content: () => <SwitchContent />,
  props: Props,
  component: {
    element: Switch,
    defaultProps: {},
  },
  title: "Switch",
  description: "Switch is cool too I guess",
  links: [
    {
      label: "Switch Storybook",
      url: getStorybookUrl("?path=/docs/components-selections-switch--docs"),
    },
  ],
} as const satisfies ContentExport;
