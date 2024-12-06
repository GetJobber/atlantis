import Content from "@atlantis/docs/components/EmptyState/EmptyState.stories.mdx";
import MobileProps from "./EmptyState.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
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
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-EmptyState-web--docs",
    },
  ],
} as const satisfies ContentExport;
