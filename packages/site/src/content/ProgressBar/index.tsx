import ProgressBarContent from "@atlantis/docs/components/ProgressBar/ProgressBar.stories.mdx";
import Props from "./ProgressBar.props.json";
import MobileProps from "./ProgressBar.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <ProgressBarContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<ProgressBar totalSteps={100} currentStep={66} />`,
    mobileElement: `<ProgressBar total={5} current={1} inProgress={2} />`,
  },
  title: "ProgressBar",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-status-and-feedback-progressbar--docs`,
    },
  ],
} as const satisfies ContentExport;
