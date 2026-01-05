import Content from "./ActionLabel.stories.mdx";
import MobileProps from "./ActionLabel.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(
        `?path=/docs/components-status-and-feedback-activityindicator--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
