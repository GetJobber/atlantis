import { FeatureSwitch } from "@jobber/components";
import Content from "@atlantis/docs/components/FeatureSwitch/FeatureSwitch.stories.mdx";
import Props from "./FeatureSwitch.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: FeatureSwitch,
    defaultProps: {  },
  },
  title: "FeatureSwitch",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-FeatureSwitch-web--docs",
    },
  ],
} as const satisfies ContentExport;