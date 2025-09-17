import Content from "./AutoLink.stories.mdx";
import MobileProps from "./AutoLink.props-mobile.json";
import Notes from "./AutoLinkNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `<AutoLink>This is a block of text with a 555-555-5555 link in it</AutoLink>`,
  },
  title: "AutoLink",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-text-and-typography-autolink--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
