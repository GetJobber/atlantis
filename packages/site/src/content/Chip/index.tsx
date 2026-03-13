import ChipContent, { toc } from "./Chip.stories.mdx";
import Props from "./Chip.props.json";
import Notes from "./ChipNotes.mdx";
import MobileProps from "./Chip.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <ChipContent />,
  toc,
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
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-selections-chip--base",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-selections-chip--basic",
        "mobile",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
