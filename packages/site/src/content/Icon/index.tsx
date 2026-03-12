import IconContent, { toc } from "./Icon.stories.mdx";
import Props from "./Icon.props.json";
import MobileProps from "./Icon.props-mobile.json";
import Notes from "./IconNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <IconContent />,
  toc,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Icon name="happyFace" />`,
    mobileElement: `<Icon name="happyFace" />`,
  },
  title: "Icon",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-images-and-icons-icon--basic",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-images-and-icons-icon--basic",
        "mobile",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
