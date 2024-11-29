import { Table } from "@jobber/components";
import Content from "@atlantis/docs/components/Table/Table.stories.mdx";
import Props from "./Table.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Table,
    defaultProps: {},
  },
  title: "Table",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Table-web--docs",
    },
  ],
} as const satisfies ContentExport;
