import { Icon } from "@jobber/components";
import IconContent from "@atlantis/docs/components/Icon/Icon.stories.mdx";
import Props from "./Icon.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <IconContent />,
  props: Props,
  component: {
    element: Icon,
    defaultProps: { name: "happyFace" },
  },
  title: "Icon",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Icon-web--docs",
    },
  ],
} as const satisfies ContentExport;
