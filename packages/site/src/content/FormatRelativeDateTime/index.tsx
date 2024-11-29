import { FormatRelativeDateTime } from "@jobber/components";
import FormatRelativeDateTimeContent from "@atlantis/docs/components/FormatRelativeDateTime/FormatRelativeDateTime.stories.mdx";
import Props from "./FormatRelativeDateTime.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <FormatRelativeDateTimeContent />,
  props: Props,
  component: {
    element: FormatRelativeDateTime,
    defaultProps: { date: "2020-07-10 15:22:00.000" },
  },
  title: "FormatRelativeDateTime",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-FormatRelativeDateTime-web--docs",
    },
  ],
} as const satisfies ContentExport;
