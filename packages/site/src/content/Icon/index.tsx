import IconContent from "@atlantis/docs/components/Icon/Icon.stories.mdx";
import Props from "./Icon.props.json";
import MobileProps from "./Icon.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <IconContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Icon name="happyFace" />`,
    mobileElement: `<Icon name="happyFace" />`,
  },
  title: "Icon",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }/?path=/docs/components-utilities-Icon-web--docs`,
    },
  ],
} as const satisfies ContentExport;
