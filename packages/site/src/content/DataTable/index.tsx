import { DataTable } from "@jobber/components";
import Content from "@atlantis/docs/components/DataTable/DataTable.stories.mdx";
import Props from "./DataTable.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: DataTable,
    defaultProps: {},
  },
  title: "DataTable",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-DataTable-web--docs",
    },
  ],
} as const satisfies ContentExport;
