import FormatRelativeDateTimeContent from "@atlantis/docs/components/FormatRelativeDateTime/FormatRelativeDateTime.stories.mdx";
import Props from "./FormatRelativeDateTime.props.json";
import { ContentExport } from "../../types/content";

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
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-utilities-formatrelativedatetime--docs`,
    },
  ],
} as const satisfies ContentExport;
