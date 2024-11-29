import { Spinner } from "@jobber/components";
import Content from "@atlantis/docs/components/Spinner/Spinner.stories.mdx";
import Props from "./Spinner.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Spinner,
    defaultProps: {},
  },
  title: "Spinner",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Spinner-web--docs",
    },
  ],
} as const satisfies ContentExport;
