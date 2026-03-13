import Content, { toc } from "./Text.stories.mdx";
import Props from "./Text.props.json";
import MobileProps from "./Text.props-mobile.json";
import Notes from "./TextNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Text>Text</Text>`,
    mobileElement: `<Text>Text</Text>`,
  },
  title: "Text",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-text-and-typography-text--basic",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-text-and-typography-text--basic",
        "mobile",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
