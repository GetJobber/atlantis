# DataTable

The `DataTable` Component would give the users options for pagination, sorting,
and column visibility by leveraging some sort of API or service.

## Design Patterns

Tables are used to organize tabular information to help users understand and
quickly scan for information.

Some scenarios for Tables include the following:

- Index Pages
- Dashboards

### Sorting

Sorting can be enabled on column headers to improve usability.

The default sorted column should be based on contextual based on user needs.

To indicate the column being sorted, use an up (ascending) or down (descending)
arrow next to the column title. Only 1 column can be sorted at a time. User can
click on a sorted header to reverse the sorting order. Arrow will rotate 180
degrees.

Not all columns will need sorting enabled.

# Column Visibility

Not 100% sure if this is something to be implemented at component level but at
least should be facilitated somehow.

## Interface

```tsx
<DataTable
  data={[
    { name: "Gui", awesome: "yes" },
    { name: "Harry", awesome: "yes" },
    { name: "Chris", awesome: "yes" },
    { name: "Juan", awesome: "yes" },
  ]}
  columns={[
    {
      accessorKey: "name",
      cell: info => <span>{info.getValue()}</span>,
    },
    {
      accessorKey: "awesome",
      cell: info => info.getValue(),
    },
  ]}
/>
```

![DataTable Example](./example.png)

## Props Table

| name    | type             | default | required | description                                                                                                         |
| ------- | ---------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| data    | T[]              |         | yes      | The data to passed into the DataTable                                                                               |
| columns | ColumnDef\<T\>[] |         | yes      | The Column definition following @tanstack/react-table [ API ](https://tanstack.com/table/v8/docs/guide/column-defs) |

## Accessibility
