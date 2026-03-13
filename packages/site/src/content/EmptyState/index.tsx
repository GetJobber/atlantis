import Content, { toc } from "./EmptyState.stories.mdx";
import MobileProps from "./EmptyState.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
  mobileProps: MobileProps,
  component: {
    mobileElement: `<EmptyState
      icon={"home"}
      title={"Title"}
      description={"Description"}
      primaryAction={{
        label: "Click Me",
        onPress: () => {
          alert("Hi!");
        },
      }}
      secondaryAction={{
        label: "Don't Forget About Me",
        onPress:() => {
          alert("Hi!");
        },
      }}
    />`,
  },
  title: "EmptyState",
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-status-and-feedback-emptystate--basic",
        "mobile",
      ),
    },
  ],
} as const satisfies ContentExport;
