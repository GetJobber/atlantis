import { SegmentedControl } from "@jobber/components";
import Content from "@atlantis/docs/components/SegmentedControl/SegmentedControl.stories.mdx";
import Props from "./SegmentedControl.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: SegmentedControl,
    defaultProps: {  },
  },
  title: "SegmentedControl",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-SegmentedControl-web--docs",
    },
  ],
} as const satisfies ContentExport;