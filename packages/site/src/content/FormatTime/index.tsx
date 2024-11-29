import { FormatTime } from "@jobber/components";
import FormatTimeContent from "@atlantis/docs/components/FormatTime/FormatTime.stories.mdx";
import Props from "./FormatTime.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <FormatTimeContent />,
  props: Props,
  component: {
    element: FormatTime,
    defaultProps: { time: "2020-07-10 15:22:00.000" },
  },
  title: "FormatTime",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-FormatTime-web--docs",
    },
  ],
} as const satisfies ContentExport;
