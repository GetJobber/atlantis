import FormatTimeContent from "@atlantis/docs/components/FormatTime/FormatTime.stories.mdx";
import Props from "./FormatTime.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <FormatTimeContent />,
  props: Props,
  component: {
    element: `const earlyTime = new Date();
  earlyTime.setHours(2, 35, 0, 0);

  const lateTime = new Date();
  lateTime.setHours(22, 35, 0, 0);

  return (
    <>
      <FormatTime time={earlyTime} /> - <FormatTime time={lateTime} />
    </>
  );`,
    defaultProps: { time: "2020-07-10 15:22:00.000" },
  },
  title: "FormatTime",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }/?path=/docs/components-utilities-FormatTime-web--docs`,
    },
  ],
} as const satisfies ContentExport;
