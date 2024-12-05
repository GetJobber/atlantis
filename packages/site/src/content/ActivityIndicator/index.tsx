import Content from "@atlantis/docs/components/ActivityIndicator/ActivityIndicator.stories.mdx";
import Props from "./ActivityIndicator.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
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
