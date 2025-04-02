import Content from "./ResponsiveSwitcher.mdx";
import Props from "./ResponsiveSwitcher.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<ResponsiveSwitcher>
    <div>Hi</div>
    <div>Hi2</div>
    </ResponsiveSwitcher>`,
  },
  title: "ResponsiveSwitcher",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-ResponsiveSwitcher-web--docs",
    },
  ],
} as const satisfies ContentExport;
