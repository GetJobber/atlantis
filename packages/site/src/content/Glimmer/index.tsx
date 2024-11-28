import { Glimmer } from "@jobber/components";
import GlimmerContent from "@atlantis/docs/components/Glimmer/Glimmer.stories.mdx";
import Props from "./Glimmer.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <GlimmerContent />,
  props: Props,
  component: {
    element: Glimmer,
    defaultProps: {},
  },
  title: "Glimmer",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Glimmer-web--docs",
    },
  ],
} as const satisfies ContentExport;
