import InlineLabelContent from "@atlantis/docs/components/InlineLabel/InlineLabel.stories.mdx";
import Props from "./InlineLabel.props.json";
import { ContentExport } from "../../types/content";

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
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }/?path=/docs/components-utilities-InlineLabel-web--docs`,
    },
  ],
} as const satisfies ContentExport;
