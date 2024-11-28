import { InlineLabel as InlineLabelRoot } from "@jobber/components";
import InlineLabelContent from "@atlantis/docs/components/InlineLabel/InlineLabel.stories.mdx";
import Props from "./InlineLabel.props.json";
import { ContentExport } from "../../types/content";

export const InlineLabel = () => {
  return <InlineLabelRoot>Default</InlineLabelRoot>;
};

export default {
  content: () => <InlineLabelContent />,
  props: Props,
  component: {
    element: InlineLabel,
    defaultProps: {},
  },
  title: "InlineLabel",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InlineLabel-web--docs",
    },
  ],
} as const satisfies ContentExport;
