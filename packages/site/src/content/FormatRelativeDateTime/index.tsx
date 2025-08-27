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
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-utilities-formatrelativedatetime--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
