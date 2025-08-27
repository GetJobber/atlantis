import Content from "./DataList.stories.mdx";
import Props from "./DataList.props.json";
import Notes from "./DataListNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
            <Grid.Cell size={{ xs: 6 }}>{item.name}</Grid.Cell>
            <Grid.Cell size={{ xs: 6 }}>{item.email}</Grid.Cell>
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
      url: getStorybookUrl(
        `?path=/docs/components-lists-and-tables-datalist--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
