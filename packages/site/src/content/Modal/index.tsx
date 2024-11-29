import { Modal } from "@jobber/components";
import Content from "@atlantis/docs/components/Modal/Modal.stories.mdx";
import Props from "./Modal.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Modal,
    defaultProps: {  },
  },
  title: "Modal",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Modal-web--docs",
    },
  ],
} as const satisfies ContentExport;