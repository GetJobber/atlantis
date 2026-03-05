import InlineLabelContent from "./InlineLabel.stories.mdx";
import Props from "./InlineLabel.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <InlineLabelContent />,
  props: Props,
  component: {
    element: `<InlineLabel>Default</InlineLabel>`,
  },
  title: "InlineLabel",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/story/components-status-and-feedback-inlinelabel-web--basic`,
      ),
    },
  ],
} as const satisfies ContentExport;
