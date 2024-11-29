import { Toast } from "@jobber/components";
import Content from "@atlantis/docs/components/Toast/Toast.stories.mdx";
import Props from "./Toast.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Toast,
    defaultProps: {},
  },
  title: "Toast",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Toast-web--docs",
    },
  ],
} as const satisfies ContentExport;
