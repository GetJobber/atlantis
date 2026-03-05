import GlimmerContent from "./Glimmer.stories.mdx";
import Props from "./Glimmer.props.json";
import MobileProps from "./Glimmer.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <GlimmerContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Glimmer />`,
    mobileElement: `<Glimmer shape={"rectangle"} size={"base"} timing={"base"} />`,
  },
  title: "Glimmer",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/story/components-status-and-feedback-glimmer-web--basic`,
      ),
    },
  ],
} as const satisfies ContentExport;
