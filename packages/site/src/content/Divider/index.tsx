import Content from "./Divider.stories.mdx";
import Props from "./Divider.props.json";
import MobileProps from "./Divider.props-mobile.json";
import Notes from "./DividerNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(
        `?path=/docs/components-layouts-and-structure-divider--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
