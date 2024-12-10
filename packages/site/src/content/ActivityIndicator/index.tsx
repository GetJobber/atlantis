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
      url: "http://localhost:6006/?path=/docs/components-utilities-ActivityIndicator-web--docs",
    },
  ],
} as const satisfies ContentExport;
