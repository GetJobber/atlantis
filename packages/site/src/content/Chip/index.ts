import { Chip } from "@jobber/components";
import Props from "./Chip.props.json";
import Content from "../../../../../docs/components/Chip/Chip.stories.mdx";
import { ContentExport } from "../../types/content";

export default {
  content: Content,
  props: Props,
  component: {
    element: Chip,
    props: { label: "Chip" },
    code: `<Chip label="Chip" />`,
    defaultProps: { strings: { label: "Chip!" } },
  },
  title: "Chip",
  description: "Chip is neat.",
  links: [
    {
      label: "Chip Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-animatedswitcher-web--docs",
    },
  ],
} as ContentExport;