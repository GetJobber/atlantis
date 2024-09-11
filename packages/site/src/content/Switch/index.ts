import { Switch } from "@jobber/components";
import Props from "./Switch.props.json";
import Content from "../../../../../docs/components/Switch/Switch.stories.mdx";

export default {
  content: Content,
  props: Props,
  component: {
    element: Switch,
    props: {},
    code: `<Switch />`,
    defaultProps: {},
  },
  title: "Switch",
  description: "Switch is cool too I guess",
  links: [
    {
      label: "Switch Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-animatedswitcher-web--docs",
    },
  ],
};
