import ChipContent from "@atlantis/docs/components/Chip/Chip.stories.mdx";
import Props from "./Chip.props.json";
import Notes from "./ChipNotes.mdx";
import MobileProps from "./Chip.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <ChipContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Chip label="Chip!" />`,
    mobileElement: `<Chip
        label={"Active chip"}
        onPress={() => {
          alert("hi!");
        }}
        accessibilityLabel={"Active chip"}
        isActive={true}
      />`,
  },
  title: "Chip",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl("?path=/docs/components-selections-chip--docs"),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
