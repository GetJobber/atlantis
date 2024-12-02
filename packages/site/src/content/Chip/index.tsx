import ChipContent from "@atlantis/docs/components/Chip/Chip.stories.mdx";
import Props from "./Chip.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <ChipContent />,
  props: Props,
  component: {
    element: `<Chip label="Chip!" />`,
  },
  title: "Chip",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl("?path=/docs/components-selections-chip--docs"),
    },
  ],
} as const satisfies ContentExport;
