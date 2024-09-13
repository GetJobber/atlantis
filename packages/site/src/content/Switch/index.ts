import { Switch } from "@jobber/components";
// eslint-disable-next-line import/no-unresolved
import Content from "@atlantis/docs/components/Switch/Switch.stories.mdx";
import Props from "./Switch.props.json";

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
