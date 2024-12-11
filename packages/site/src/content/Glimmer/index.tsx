import GlimmerContent from "@atlantis/docs/components/Glimmer/Glimmer.stories.mdx";
import Props from "./Glimmer.props.json";
import MobileProps from "./Glimmer.props-mobile.json";
import { ContentExport } from "../../types/content";

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
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-status-and-feedback-glimmer--docs`,
    },
  ],
} as const satisfies ContentExport;
