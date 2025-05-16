import { Box, DataTable, Grid, Heading, Stack, Text } from "@jobber/components";

export const VisualTestDataTablePage = () => {
  const data = [
    { id: 1, name: "John Doe", age: 30, city: "New York", status: "Active" },
    {
      id: 2,
      name: "Jane Smith",
      age: 25,
      city: "Los Angeles",
      status: "Inactive",
    },
    { id: 3, name: "Bob Johnson", age: 35, city: "Chicago", status: "Active" },
    { id: 4, name: "Alice Brown", age: 28, city: "Houston", status: "Pending" },
    {
      id: 5,
      name: "Charlie Wilson",
      age: 42,
      city: "Phoenix",
      status: "Active",
    },
  ];

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      enableSorting: true,
    },
    {
      header: "Name",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      header: "Age",
      accessorKey: "age",
      enableSorting: true,
    },
    {
      header: "City",
      accessorKey: "city",
      enableSorting: true,
    },
    {
      header: "Status",
      accessorKey: "status",
      enableSorting: true,
    },
  ];

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>DataTable Examples</Heading>

        <Stack gap="large">
          {/* Basic DataTable */}
          <section>
            <Text size="large">Basic DataTable</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 12 }}>
                <DataTable data={data} columns={columns} />
              </Grid.Cell>
            </Grid>
          </section>

          {/* DataTable with Sticky Header */}
          <section>
            <Text size="large">DataTable with Sticky Header</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 12 }}>
                <DataTable
                  data={data}
                  columns={columns}
                  stickyHeader
                  height={200}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* DataTable with Pagination */}
          <section>
            <Text size="large">DataTable with Pagination</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 12 }}>
                <DataTable
                  data={data}
                  columns={columns}
                  pagination={{
                    manualPagination: true,
                    state: {
                      pageIndex: 0,
                      pageSize: 5,
                    },
                    pageCount: 2,
                    onPaginationChange: () => console.log("Page changed"),
                    totalItems: 10,
                  }}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* DataTable with Empty State */}
          <section>
            <Text size="large">DataTable with Empty State</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 12 }}>
                <DataTable
                  data={[]}
                  columns={columns}
                  emptyState={<Text>No data available</Text>}
                />
              </Grid.Cell>
            </Grid>
          </section>

          {/* DataTable in Loading State */}
          <section>
            <Text size="large">DataTable in Loading State</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 12 }}>
                <DataTable data={data} columns={columns} loading={true} />
              </Grid.Cell>
            </Grid>
          </section>

          {/* DataTable with Row Click */}
          <section>
            <Text size="large">DataTable with Row Click</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 12 }}>
                <DataTable
                  data={data}
                  columns={columns}
                  onRowClick={row => console.log("Clicked row:", row)}
                />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
