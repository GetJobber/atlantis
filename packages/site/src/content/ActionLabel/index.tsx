import Content from "@atlantis/docs/components/ActionLabel/ActionLabel.stories.mdx";
import MobileProps from "./ActionLabel.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `<ActionLabel>{"I am a label text"}</ActionLabel>`,
  },
  title: "ActionLabel",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-status-and-feedback-activityindicator--docs`,
    },
  ],
} as const satisfies ContentExport;
