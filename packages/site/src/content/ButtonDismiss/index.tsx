import ButtonDismissContent from "@atlantis/docs/components/ButtonDismiss/ButtonDismiss.stories.mdx";
import Props from "./ButtonDismiss.props.json";
import { ContentExport } from "../../types/content";

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
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }/?path=/docs/components-utilities-ButtonDismiss-web--docs`,
    },
  ],
} as const satisfies ContentExport;
