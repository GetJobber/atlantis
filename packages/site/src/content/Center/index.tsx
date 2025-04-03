import Content from "./Center.stories.mdx";
import Props from "./Center.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<Center>Hei</Center>`,
  },
  title: "Center",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Center-web--docs",
    },
  ],
} as const satisfies ContentExport;
