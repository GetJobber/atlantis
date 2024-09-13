import { Button } from "@jobber/components";
// eslint-disable-next-line import/no-unresolved
import Content from "@atlantis/docs/components/Button/Button.stories.mdx";
import Props from "./Button.props.json";

export default {
  content: Content,
  props: Props,
  component: {
    element: Button,
    props: { label: "Button" },
    code: `<Button label="Button" />`,
    defaultProps: { strings: { label: "Button!" } },
  },
  title: "Button",
  description:
    "Buttons are a core user interface component, as they allow users to initiate, complete, and reverse actions.",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-animatedswitcher-web--docs",
    },
    {
      label: "More Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-animatedswitcher-web--docs",
    },
    {
      label: "Another place entirely!",
      url: "http://localhost:6006/?path=/docs/components-utilities-animatedswitcher-web--docs",
    },
  ],
};
