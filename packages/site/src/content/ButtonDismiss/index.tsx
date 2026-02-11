import ButtonDismissContent, { toc } from "./ButtonDismiss.stories.mdx";
import Props from "./ButtonDismiss.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <ButtonDismissContent />,
  toc,
  props: Props,
  component: {
    element: `<ButtonDismiss onClick={function onClick() {
        alert("Dismissed!");
      }} />`,
  },
  title: "ButtonDismiss",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-private-buttondismiss--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
