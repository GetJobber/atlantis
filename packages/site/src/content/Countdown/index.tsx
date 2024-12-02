import CountdownContent from "@atlantis/docs/components/Countdown/Countdown.stories.mdx";
import Props from "./Countdown.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <CountdownContent />,
  props: Props,
  component: {
    element: `<Countdown granularity={"dhms"} showUnits={true} date={new Date(new Date().getTime() + 25 * 3600 * 1000).toISOString()} />`,
  },
  title: "Countdown",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Countdown-web--docs",
    },
  ],
} as const satisfies ContentExport;
