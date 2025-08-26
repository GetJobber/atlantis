import IconContent from "@atlantis/docs/components/Icon/Icon.stories.mdx";
import Props from "./Icon.props.json";
import MobileProps from "./Icon.props-mobile.json";
import Notes from "./IconNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <IconContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<Icon name="happyFace" />`,
    mobileElement: `<Icon name="happyFace" />`,
  },
  title: "Icon",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-images-and-icons-icon--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
