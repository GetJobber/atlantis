import { ConfirmationModal } from "@jobber/components";
import Content from "@atlantis/docs/components/ConfirmationModal/ConfirmationModal.stories.mdx";
import Props from "./ConfirmationModal.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: ConfirmationModal,
    defaultProps: {},
  },
  title: "ConfirmationModal",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-ConfirmationModal-web--docs",
    },
  ],
} as const satisfies ContentExport;
