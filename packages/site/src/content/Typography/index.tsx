import Content, { toc } from "./Typography.stories.mdx";
import Props from "./Typography.props.json";
import MobileProps from "./Typography.props-mobile.json";
import Notes from "./TypographyNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Typography size='large'>Typography</Typography>`,
    mobileElement: `<Typography size='large'>Typography</Typography>`,
  },
  title: "Typography",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-text-and-typography-typography--basic",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-text-and-typography-typography--basic",
        "mobile",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
