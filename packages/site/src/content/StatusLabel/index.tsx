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
    mobileElement: `<StatusLabel text="StatusLabel!" />`,
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
