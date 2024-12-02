import Content from "@atlantis/docs/components/Divider/Divider.stories.mdx";
import Props from "./Divider.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
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
  },
  title: "Divider",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Divider-web--docs",
    },
  ],
} as const satisfies ContentExport;
