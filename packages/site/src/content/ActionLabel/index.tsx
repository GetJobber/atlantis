import Content from "@atlantis/docs/components/ActionLabel/ActionLabel.stories.mdx";
import Props from "./ActionLabel.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: "",
    mobileElement: `<ActionLabel>{"I am a label text"}</ActionLabel>`,
  },
  title: "ActionLabel",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-ActionLabel-web--docs",
    },
  ],
} as const satisfies ContentExport;
