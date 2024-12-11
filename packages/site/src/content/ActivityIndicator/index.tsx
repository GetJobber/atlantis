import Content from "@atlantis/docs/components/ActivityIndicator/ActivityIndicator.stories.mdx";
import MobileProps from "./ActivityIndicator.props-mobile.json";
import { ContentExport } from "../../types/content";

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
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-status-and-feedback-activityindicator--docs`,
    },
  ],
} as const satisfies ContentExport;
