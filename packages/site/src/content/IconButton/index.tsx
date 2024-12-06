import Content from "@atlantis/docs/components/IconButton/IconButton.stories.mdx";
import MobileProps from "./IconButton.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `<IconButton
      accessibilityLabel={"New Job"}
      name={"remove"}
      onPress={() => {
        alert("👍");
      }}
    />`,
  },
  title: "IconButton",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-IconButton-web--docs",
    },
  ],
} as const satisfies ContentExport;
