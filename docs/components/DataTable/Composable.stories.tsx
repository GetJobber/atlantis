import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DataTable,
  SortDirection,
  useDataTableContext,
} from "@jobber/components/DataTable";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { Combobox, ComboboxOption } from "@jobber/components/Combobox";
import { Icon } from "@jobber/components/Icon";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Lists and Tables/DataTable/Web/Composable",
  component: DataTable,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
      },
    },
  },
} as ComponentMeta<typeof DataTable>;

// Example data
const exampleData = [
  {
    id: "1",
    name: "Ryan Clearwater",
    role: "Office admin",
    email: "ryan.c@westbank.com",
  },
  {
    id: "2",
    name: "Bessie Cooper",
    role: "Site manager",
    email: "bessie.c@westbank.com",
  },
  {
    id: "3",
    name: "Cody Fisher",
    role: "Office admin",
    email: "cody.f@westbank.com",
  },
  {
    id: "4",
    name: "Darlene Robertson",
    role: "Site manager",
    email: "darlene.r@gmail.com",
  },
  {
    id: "5",
    name: "Jerome Bell",
    role: "Project manager",
    email: "jerome.b@westbank.com",
  },
  {
    id: "6",
    name: "Kristin Watson",
    role: "Customer service",
    email: "kristin.w@westbank.com",
  },
  {
    id: "7",
    name: "John Smithers",
    role: "Office admin",
    email: "john.s@westbank.com",
  },
  {
    id: "8",
    name: "Wilma Jackson",
    role: "Customer service",
    email: "wilma.j@westbank.com",
  },
];

// Custom header that uses the new SortableHeader atom
function CustomHeader() {
  const { table } = useDataTableContext();

  // Helper to get sort direction for a column using TanStack's built-in method
  const getSortDirection = (columnId: string): SortDirection => {
    const column = table.getColumn(columnId);
    if (!column) return SortDirection.equilibrium;

    const sortDirection = column.getIsSorted();
    if (sortDirection === false) return SortDirection.equilibrium;

    return sortDirection === "desc"
      ? SortDirection.descending
      : SortDirection.ascending;
  };

  // Define which columns are sortable
  const sortableColumns = ["name", "role"]; // Only name and role are sortable

  return (
    <>
      {table.getAllColumns().map(column => {
        const isSortable = sortableColumns.includes(column.id);

        return (
          <DataTable.SortableHeader
            key={column.id}
            direction={isSortable ? getSortDirection(column.id) : undefined}
            onSort={
              isSortable
                ? () =>
                    column.getToggleSortingHandler()?.({} as React.MouseEvent)
                : undefined
            }
          >
            {column.columnDef.header as string}
          </DataTable.SortableHeader>
        );
      })}
    </>
  );
}

export const Basic = () => {
  return (
    <DataTable.TableLayout>
      <DataTable.Table>
        <DataTable.Header>
          <DataTable.HeaderCell>Name</DataTable.HeaderCell>
          <DataTable.HeaderCell>Role</DataTable.HeaderCell>
          <DataTable.HeaderCell>Email</DataTable.HeaderCell>
        </DataTable.Header>
        <DataTable.TableBody>
          {exampleData.map(row => (
            <DataTable.Row key={row.id}>
              <DataTable.Cell>{row.name}</DataTable.Cell>
              <DataTable.Cell>{row.role}</DataTable.Cell>
              <DataTable.Cell>{row.email}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable.TableBody>
      </DataTable.Table>
    </DataTable.TableLayout>
  );
};

export const WithTableActions = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRoles, setSelectedRoles] = useState<ComboboxOption[]>([]);

  // Get unique roles for combobox options
  const roleOptions = Array.from(
    new Set(exampleData.map(item => item.role)),
  ).map(role => ({
    id: role,
    label: role,
  }));

  // TanStack table setup with filtering
  const table = useReactTable({
    data: exampleData,
    columns: [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "role",
        header: "Role",
        filterFn: (row, columnId, filterValue) => {
          // Handle array filtering for multiple role selection
          if (!filterValue || filterValue.length === 0) return true;
          const rowValue = row.getValue(columnId) as string;

          return filterValue.includes(rowValue);
        },
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ],
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Update the role filter when selectedRoles changes
  React.useEffect(() => {
    const roleValues = selectedRoles.map(option => option.label);
    table.getColumn("role")?.setFilterValue(roleValues);
  }, [selectedRoles, table]);

  const handleRoleSelect = (selectedOptions: ComboboxOption[]) => {
    setSelectedRoles(selectedOptions);
  };

  const clearRoleFilter = () => {
    setSelectedRoles([]);
  };

  return (
    <div>
      <DataTable.TableActions>
        <Combobox
          label="Role"
          selected={selectedRoles}
          onSelect={handleRoleSelect}
          multiSelect
        >
          <Combobox.Activator>
            <Chip
              label={
                selectedRoles.length > 0
                  ? selectedRoles.map(option => option.label).join(", ")
                  : ""
              }
              heading="Role"
              variation={selectedRoles.length > 0 ? "base" : "subtle"}
            >
              <Chip.Suffix
                {...(selectedRoles.length > 0
                  ? { onClick: clearRoleFilter }
                  : {})}
              >
                <Icon
                  name={selectedRoles.length > 0 ? "cross" : "add"}
                  size="small"
                />
              </Chip.Suffix>
            </Chip>
          </Combobox.Activator>

          {roleOptions.map(option => (
            <Combobox.Option
              key={option.id}
              id={option.id}
              label={option.label}
            />
          ))}
        </Combobox>
      </DataTable.TableActions>

      <DataTable.TableLayout>
        <DataTable.Table>
          <DataTable.Header>
            <DataTable.HeaderCell>Name</DataTable.HeaderCell>
            <DataTable.HeaderCell>Role</DataTable.HeaderCell>
            <DataTable.HeaderCell>Email</DataTable.HeaderCell>
          </DataTable.Header>
          <DataTable.TableBody>
            {table.getRowModel().rows.map(row => (
              <DataTable.Row key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <DataTable.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable.TableBody>
        </DataTable.Table>
      </DataTable.TableLayout>
    </div>
  );
};

export const WithRowActions = () => {
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);

  return (
    <DataTable.TableLayout>
      <DataTable.Table>
        <DataTable.Header>
          <DataTable.HeaderCell>Name</DataTable.HeaderCell>
          <DataTable.HeaderCell>Role</DataTable.HeaderCell>
          <DataTable.HeaderCell>Email</DataTable.HeaderCell>
        </DataTable.Header>
        <DataTable.TableBody>
          {exampleData.map(row => (
            <DataTable.Row
              key={row.id}
              onMouseEnter={() => setHoveredRow(row.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <DataTable.Cell>{row.name}</DataTable.Cell>
              <DataTable.Cell>{row.role}</DataTable.Cell>
              <DataTable.Cell>
                {row.email}
                {hoveredRow === row.id && (
                  <DataTable.RowActions>
                    <Button
                      icon="checkmark"
                      ariaLabel={`Complete ${row.name}`}
                      type="secondary"
                      variation="subtle"
                      onClick={() => console.log(`Complete ${row.name}`)}
                    />
                    <Button
                      icon="edit"
                      ariaLabel={`Edit ${row.name}`}
                      type="secondary"
                      variation="subtle"
                      onClick={() => console.log(`Edit ${row.name}`)}
                    />
                  </DataTable.RowActions>
                )}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable.TableBody>
      </DataTable.Table>
    </DataTable.TableLayout>
  );
};

export const Sortable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  // Consumer creates TanStack table
  const table = useReactTable({
    data: exampleData,
    columns: [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ],
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const sortedRows = table.getRowModel().rows;

  return (
    <DataTable.DataTableProvider table={table}>
      <DataTable.TableLayout>
        <DataTable.Table>
          <DataTable.Header>
            <CustomHeader />
          </DataTable.Header>
          <DataTable.TableBody>
            {sortedRows.map(row => (
              <DataTable.Row key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <DataTable.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable.TableBody>
        </DataTable.Table>
      </DataTable.TableLayout>
    </DataTable.DataTableProvider>
  );
};

export const WithPagination = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 4,
  });

  // TanStack table setup with pagination
  const table = useReactTable({
    data: exampleData,
    columns: [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ],
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <DataTable.TableLayout>
        <DataTable.Table>
          <DataTable.Header>
            <DataTable.HeaderCell>Name</DataTable.HeaderCell>
            <DataTable.HeaderCell>Role</DataTable.HeaderCell>
            <DataTable.HeaderCell>Email</DataTable.HeaderCell>
          </DataTable.Header>
          <DataTable.TableBody>
            {table.getRowModel().rows.map(row => (
              <DataTable.Row key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <DataTable.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable.TableBody>
          <DataTable.Footer>
            <DataTable.Pagination
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>
                Showing {table.getRowModel().rows.length} of{" "}
                {exampleData.length} rows
              </Text>

              <div style={{ display: "flex", gap: "var(--space-small)" }}>
                <DataTable.PaginationButton
                  direction="previous"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                />
                <DataTable.PaginationButton
                  direction="next"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
                />
              </div>
            </DataTable.Pagination>
          </DataTable.Footer>
        </DataTable.Table>
      </DataTable.TableLayout>
    </div>
  );
};
