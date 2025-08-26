import HeadingContent from "@atlantis/docs/components/Heading/Heading.stories.mdx";
import Props from "./Heading.props.json";
import MobileProps from "./Heading.props-mobile.json";
import Notes from "./HeadingNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <HeadingContent />,
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
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-text-and-typography-heading--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
