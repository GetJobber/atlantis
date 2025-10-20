import FormatDateContent from "./FormatDate.stories.mdx";
import Props from "./FormatDate.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <FormatDateContent />,
  props: Props,
  component: {
    element: `<FormatDate date={new Date()} />`,
  },
  title: "FormatDate",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(`?path=/docs/components-utilities-formatdate--docs`),
    },
  ],
} as const satisfies ContentExport;
