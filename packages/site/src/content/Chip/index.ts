import { Chip } from "@jobber/components";
import Content from "@atlantis/docs/components/Chip/Chip.stories.mdx";
import Props from "./Chip.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: Content,
  props: Props,
  component: {
    element: Chip,
    defaultProps: { label: "Chip!" },
  },
  title: "Chip",
  description:
    "Chip allows selections and actions with a robust variety of content and presentation methods.",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl("?path=/docs/components-selections-chip--docs"),
    },
  ],
} as ContentExport;
