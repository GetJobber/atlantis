import { Switch } from "@jobber/components";
import Content from "@atlantis/docs/components/Switch/Switch.stories.mdx";
import Props from "./Switch.props.json";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: Content,
  props: Props,
  component: {
    element: Switch,
    props: {},
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
};
