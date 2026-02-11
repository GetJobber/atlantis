import CountdownContent, { toc } from "./Countdown.stories.mdx";
import Props from "./Countdown.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <CountdownContent />,
  toc,
  props: Props,
  component: {
    element: `<Countdown granularity={"dhms"} showUnits={true} date={new Date(new Date().getTime() + 25 * 3600 * 1000).toISOString()} />`,
  },
  title: "Countdown",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(`?path=/docs/components-utilities-countdown--docs`),
    },
  ],
} as const satisfies ContentExport;
