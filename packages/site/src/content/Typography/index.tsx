import Content from "@atlantis/docs/components/Typography/Typography.stories.mdx";
import Props from "./Typography.props.json";
import MobileProps from "./Typography.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Typography size='large'>Typography</Typography>`,
    mobileElement: `<Typography size='large'>Typography</Typography>`,
  },
  title: "Typography",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-text-and-typography-typography--docs`,
    },
  ],
} as const satisfies ContentExport;
