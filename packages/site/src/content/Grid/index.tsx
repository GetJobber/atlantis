import { Grid } from "@jobber/components";
import Content from "@atlantis/docs/components/Grid/Grid.stories.mdx";
import Props from "./Grid.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Grid,
    defaultProps: {  },
  },
  title: "Grid",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Grid-web--docs",
    },
  ],
} as const satisfies ContentExport;