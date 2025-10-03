import StatusIndicatorContent from "./StatusIndicator.stories.mdx";
import Props from "./StatusIndicator.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <StatusIndicatorContent />,
  props: Props,
  component: {
    element: `<Box direction="row" gap="base">
  <StatusIndicator status={"success"} />
  <StatusIndicator status={"warning"} />
  <StatusIndicator status={"critical"} />
  <StatusIndicator status={"inactive"} />
  <StatusIndicator status={"informative"} />
</Box>
    `,
    defaultProps: { status: "success" },
  },
  title: "StatusIndicator",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-status-and-feedback-statusindicator--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
