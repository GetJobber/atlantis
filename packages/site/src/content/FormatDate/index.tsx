import FormatDateContent, { toc } from "./FormatDate.stories.mdx";
import Props from "./FormatDate.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <FormatDateContent />,
  toc,
  props: Props,
  component: {
    element: `<FormatDate date={new Date()} />`,
  },
  title: "FormatDate",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-utilities-formatdate--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
