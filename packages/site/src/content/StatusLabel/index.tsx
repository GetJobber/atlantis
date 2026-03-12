import StatusLabelContent, { toc } from "./StatusLabel.stories.mdx";
import Props from "./StatusLabel.props.json";
import MobileProps from "./StatusLabel.props-mobile.json";
import { getStorybookUrl } from "../../layout/getStorybookUrl";
import { ContentExport } from "../../types/content";

export default {
  content: () => <StatusLabelContent />,
  toc,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<StatusLabel label="StatusLabel!" />`,
    mobileElement: `<StatusLabel text="StatusLabel!" />`,
  },
  title: "StatusLabel",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-status-and-feedback-statuslabel--basic",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-status-and-feedback-statuslabel--basic",
        "mobile",
      ),
    },
  ],
} as const satisfies ContentExport;
