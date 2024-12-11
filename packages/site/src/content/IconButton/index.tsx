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
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-actions-iconbutton--docs`,
    },
  ],
} as const satisfies ContentExport;
