import { StatusLabel } from "@jobber/components";
// eslint-disable-next-line import/no-unresolved
import Content from "@atlantis/docs/components/StatusLabel/StatusLabel.stories.mdx";
import Props from "./StatusLabel.props.json";
import { getStorybookUrl } from "../../layout/getStorybookUrl";
import { ContentExport } from "../../types/content";

export default {
  content: Content,
  props: Props,
  component: {
    element: StatusLabel,
    props: { label: "StatusLabel" },
    defaultProps: { label: "StatusLabel!" },
  },
  title: "StatusLabel",
  description: "StatusLabel is neater.",
  links: [
    {
      label: "StatusLabel Storybook",
      url: getStorybookUrl(
        "?path=/docs/components-status-and-feedback-statuslabel--docs",
      ),
    },
  ],
} as ContentExport;
