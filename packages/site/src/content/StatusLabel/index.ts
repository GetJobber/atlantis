import { StatusLabel } from "@jobber/components";
// eslint-disable-next-line import/no-unresolved
import Content from "@atlantis/docs/components/StatusLabel/StatusLabel.stories.mdx";
import Props from "./StatusLabel.props.json";

export default {
  content: Content,
  props: Props,
  component: {
    element: StatusLabel,
    props: { label: "StatusLabel" },
    code: `<StatusLabel label="StatusLabel" />`,
    defaultProps: { strings: { label: "StatusLabel!" } },
  },
  title: "StatusLabel",
  description: "StatusLabel is neater.",
  links: [
    {
      label: "StatusLabel Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-animatedswitcher-web--docs",
    },
  ],
};
