import ProgressBarContent from "@atlantis/docs/components/ProgressBar/ProgressBar.stories.mdx";
import Props from "./ProgressBar.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <ProgressBarContent />,
  props: Props,
  component: {
    element: `<ProgressBar totalSteps={100} currentStep={66} />`,
  },
  title: "ProgressBar",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-ProgressBar-web--docs",
    },
  ],
} as const satisfies ContentExport;
