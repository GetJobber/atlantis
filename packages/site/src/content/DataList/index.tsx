import Content from "@atlantis/docs/components/DataList/DataList.stories.mdx";
import Props from "./DataList.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const data = [
    { id: 1, name: "Test Person", email: "sample@example.com" },
    { id: 2, name: "Second Person", email: "second@example.com" },
    { id: 3, name: "Third Person", email: "third@example.com" },
  ];

  const headers = {
    name: "Name",
    email: "Email",
  };

  return (
    <DataList data={data} headers={headers}>
      <DataList.Layout>
        {(item) => (
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 6 }}>{item.name}</Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6 }}>{item.email}</Grid.Cell>
          </Grid>
        )}
      </DataList.Layout>
      <DataList.EmptyState
        message="No items to display"
        action={<Button label="Add item" onClick={() => alert("Add item")} />}
      />
    </DataList>
  );
    `,
  },
  title: "DataList",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-lists-and-tables-datalist--docs",
    },
  ],
} as const satisfies ContentExport;
