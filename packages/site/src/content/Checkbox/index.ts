import { Checkbox } from "@jobber/components";
// eslint-disable-next-line import/no-unresolved
import Content from "@atlantis/docs/components/Checkbox/Checkbox.stories.mdx";
import Props from "./Checkbox.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: Content,
  props: Props,
  component: {
    element: Checkbox,
    defaultProps: { label: "Checkbox" },
    code: `<Checkbox label="Checkbox" />`,
  },
  title: "Checkbox",
  description:
    "A checkbox lets a user select one or more items from a set of options.",
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
} as ContentExport;
