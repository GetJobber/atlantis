import Content from "@atlantis/docs/components/Typography/Typography.stories.mdx";
import Props from "./Typography.props.json";
import MobileProps from "./Typography.props-mobile.json";
import Notes from "./TypographyNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(
        `?path=/docs/components-text-and-typography-typography--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
