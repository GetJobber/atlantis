import { LightBox } from "@jobber/components";
import Content from "@atlantis/docs/components/LightBox/LightBox.stories.mdx";
import Props from "./LightBox.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: LightBox,
    defaultProps: {},
  },
  title: "LightBox",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-LightBox-web--docs",
    },
  ],
} as const satisfies ContentExport;
