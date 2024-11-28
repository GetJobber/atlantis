import { ButtonDismiss } from "@jobber/components";
import ButtonDismissContent from "@atlantis/docs/components/ButtonDismiss/ButtonDismiss.stories.mdx";
import Props from "./ButtonDismiss.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <ButtonDismissContent />,
  props: Props,
  component: {
    element: ButtonDismiss,
    defaultProps: {},
  },
  title: "ButtonDismiss",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-ButtonDismiss-web--docs",
    },
  ],
} as const satisfies ContentExport;
