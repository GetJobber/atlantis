import HeadingContent, { toc } from "./Heading.stories.mdx";
import Props from "./Heading.props.json";
import MobileProps from "./Heading.props-mobile.json";
import Notes from "./HeadingNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <HeadingContent />,
  toc,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Heading level={1} element={"h1"}>New client</Heading>`,
    mobileElement: `<Heading level={1} element={"h1"}>New client</Heading>`,
  },
  title: "Heading",
  description: "",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-text-and-typography-heading--levels",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-text-and-typography-heading--levels",
        "mobile",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
