import Content from "./Spinner.stories.mdx";
import Props from "./Spinner.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(
        `?path=/story/components-status-and-feedback-spinner-web--basic`,
      ),
    },
  ],
} as const satisfies ContentExport;
