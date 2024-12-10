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
    mobileElement: `<View style={{width:'100%'}}><ProgressBar total={5} current={1} inProgress={2} /></View>`,
  },
  title: "ProgressBar",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-ProgressBar-web--docs",
    },
  ],
} as const satisfies ContentExport;
