import StatusLabelContent from "./StatusLabel.stories.mdx";
import Props from "./StatusLabel.props.json";
import MobileProps from "./StatusLabel.props-mobile.json";
import { getStorybookUrl } from "../../layout/getStorybookUrl";
import { ContentExport } from "../../types/content";

export default {
  content: () => <StatusLabelContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<StatusLabel label="StatusLabel!" />`,
    mobileElement: `<StatusLabel label="StatusLabel!" />`,
  },
  title: "StatusLabel",
  links: [
    {
      label: "StatusLabel Storybook",
      url: getStorybookUrl(
        "?path=/story/components-status-and-feedback-statuslabel-web--basic",
      ),
    },
  ],
} as const satisfies ContentExport;
