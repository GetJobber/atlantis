import InlineLabelContent, { toc } from "./InlineLabel.stories.mdx";
import Props from "./InlineLabel.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <InlineLabelContent />,
  toc,
  props: Props,
  component: {
    element: `<InlineLabel>Default</InlineLabel>`,
  },
  title: "InlineLabel",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-status-and-feedback-inlinelabel--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
