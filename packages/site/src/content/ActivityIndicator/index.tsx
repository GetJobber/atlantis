import Content from "./ActivityIndicator.stories.mdx";
import MobileProps from "./ActivityIndicator.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `<ActivityIndicator size="small" />`,
  },
  title: "ActivityIndicator",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-status-and-feedback-activityindicator--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
