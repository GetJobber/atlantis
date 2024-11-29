import { Combobox } from "@jobber/components";
import Content from "@atlantis/docs/components/Combobox/Combobox.stories.mdx";
import Props from "./Combobox.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Combobox,
    defaultProps: {},
  },
  title: "Combobox",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Combobox-web--docs",
    },
  ],
} as const satisfies ContentExport;
