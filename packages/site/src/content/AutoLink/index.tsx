import Content from "@atlantis/docs/components/AutoLink/AutoLink.stories.mdx";
import MobileProps from "./AutoLink.props-mobile.json";
import { ContentExport } from "../../types/content";

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
      url: "http://localhost:6006/?path=/docs/components-utilities-AutoLink-web--docs",
    },
  ],
} as const satisfies ContentExport;
