import Content from "@atlantis/docs/components/Spinner/Spinner.stories.mdx";
import Props from "./Spinner.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Spinner />`,
    defaultProps: {},
  },
  title: "Spinner",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }/?path=/docs/components-utilities-Spinner-web--docs`,
    },
  ],
} as const satisfies ContentExport;
