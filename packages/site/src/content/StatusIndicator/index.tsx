import { StatusIndicator } from "@jobber/components";
import StatusIndicatorContent from "@atlantis/docs/components/StatusIndicator/StatusIndicator.stories.mdx";
import Props from "./StatusIndicator.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <StatusIndicatorContent />,
  props: Props,
  component: {
    element: StatusIndicator,
    defaultProps: { status: "success" },
  },
  title: "StatusIndicator",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-StatusIndicator-web--docs",
    },
  ],
} as const satisfies ContentExport;
