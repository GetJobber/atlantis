import StatusLabelContent from "@atlantis/docs/components/StatusLabel/StatusLabel.stories.mdx";
import Props from "./StatusLabel.props.json";
import { getStorybookUrl } from "../../layout/getStorybookUrl";
import { ContentExport } from "../../types/content";

export default {
  content: () => <StatusLabelContent />,
  props: Props,
  component: {
    element: `<StatusLabel label="StatusLabel!" />`,
  },
  title: "StatusLabel",
  links: [
    {
      label: "StatusLabel Storybook",
      url: getStorybookUrl(
        "?path=/docs/components-status-and-feedback-statuslabel--docs",
      ),
    },
  ],
} as const satisfies ContentExport;
