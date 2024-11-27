import { Chip as ChipRoot } from "@jobber/components";
import ChipContent from "@atlantis/docs/components/Chip/Chip.stories.mdx";
import { PropsWithChildren } from "react";
import Props from "./Chip.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

// Need to wrap Chip, otherwise TypeScript complains about its subcomponents (Chip.Prefix, Chip.Suffix)
export const Chip = (props: PropsWithChildren) => {
  return <ChipRoot {...props} />;
};

export default {
  content: () => <ChipContent />,
  props: Props,
  component: {
    element: Chip,
    defaultProps: { label: "Chip!" },
  },
  title: "Chip",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl("?path=/docs/components-selections-chip--docs"),
    },
  ],
} as const satisfies ContentExport;
