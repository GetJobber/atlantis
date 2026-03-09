import ButtonDismissContent from "./ButtonDismiss.stories.mdx";
import Props from "./ButtonDismiss.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <ButtonDismissContent />,
  props: Props,
  component: {
    element: `<ButtonDismiss onClick={function onClick() {
        alert("Dismissed!");
      }} />`,
  },
  title: "ButtonDismiss",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-private-buttondismiss--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
