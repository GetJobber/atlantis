import Content from "@atlantis/docs/components/Divider/Divider.stories.mdx";
import Props from "./Divider.props.json";
import MobileProps from "./Divider.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<div
      style={{
        display: "grid",
        gap: "var(--space-base)",
      }}
    >
      <Content>Some amazing content</Content>
      <Divider direction={"horizontal"} />
      <Content>Even more amazing content</Content>
    </div>`,
    mobileElement: `<><Content>Some amazing content</Content>
      <Divider size={"base"} direction={"horizontal"} />
      <Content>Even more amazing content</Content></>`,
  },
  title: "Divider",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Divider-web--docs",
    },
  ],
} as const satisfies ContentExport;
