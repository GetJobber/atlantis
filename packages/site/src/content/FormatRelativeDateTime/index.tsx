import FormatRelativeDateTimeContent from "./FormatRelativeDateTime.stories.mdx";
import Props from "./FormatRelativeDateTime.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <FormatRelativeDateTimeContent />,
  props: Props,
  component: {
    element: `<FormatRelativeDateTime
      date={new Date(new Date().setMinutes(new Date().getMinutes() - 5))}
    />`,
    defaultProps: { date: "2020-07-10 15:22:00.000" },
  },
  title: "FormatRelativeDateTime",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-utilities-formatrelativedatetime--basic",
        "web",
      ),
    },
  ],
} as const satisfies ContentExport;
