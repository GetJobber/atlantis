import { Chip } from "@jobber/components";
// eslint-disable-next-line import/no-unresolved
import Content from "@atlantis/docs/components/Chip/Chip.stories.mdx";
import Props from "./Chip.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: Content,
  props: Props,
  component: {
    element: Chip,
    defaultProps: {},
    code: `<Chip heading="Chip" label="Chip" />`,
  },
  title: "Chip",
  description:
    "Chip allows selections and actions with a robust variety of content and presentation methods.",
  links: [
    {
      label: "Chip Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-animatedswitcher-web--docs",
    },
  ],
} as ContentExport;
