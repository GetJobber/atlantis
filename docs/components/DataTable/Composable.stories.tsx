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
import { Icon, IconNames } from "@jobber/components/Icon";
import { Text } from "@jobber/components/Text";
import { StatusLabel } from "@jobber/components/StatusLabel";
import { Typography } from "@jobber/components/Typography";

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

// Example data - Financial transactions
const transactionData = [
  {
    id: "1",
    item: "Payment",
    appliedTo: "Invoice #22",
    createdDate: "Jul 15, 2025",
    amount: "-$2,400.00",
    icon: "wallet",
  },
  {
    id: "2",
    item: "Deposit",
    appliedTo: "Quote #21",
    createdDate: "Jul 10, 2025",
    amount: "-$215.00",
    icon: "wallet",
  },
  {
    id: "3",
    item: "Invoice #22",
    appliedTo: "—",
    createdDate: "Jun 05, 2025",
    amount: "$2,400.00",
    icon: "invoice",
  },
  {
    id: "4",
    item: "Invoice #74",
    appliedTo: "—",
    createdDate: "Jul 3, 2025",
    amount: "$2400.00",
    icon: "invoice",
  },
  {
    id: "5",
    item: "Refunded payment",
    appliedTo: "Invoice #21, #17",
    createdDate: "Apr 22, 2025",
    amount: "$200.00",
    icon: "redo",
  },
  {
    id: "6",
    item: "Payment",
    appliedTo: "Invoice #21, #17",
    createdDate: "Apr 20, 2025",
    amount: "$400.00",
    icon: "wallet",
    badge: "Refunded",
  },
  {
    id: "7",
    item: "Invoice #21",
    appliedTo: "—",
    createdDate: "Mar 15, 2025",
    amount: "$1,650.00",
    icon: "paidInvoice",
  },
  {
    id: "8",
    item: "Invoice #17",
    appliedTo: "—",
    createdDate: "Mar 10, 2025",
    amount: "$2,500.00",
    icon: "paidInvoice",
  },
  {
    id: "9",
    item: "Payment",
    appliedTo: "Invoice #11",
    createdDate: "Mar 05, 2025",
    amount: "-$3,000.00",
    icon: "wallet",
  },
  {
    id: "10",
    item: "Initial balance",
    appliedTo: "—",
    createdDate: "Feb 30, 2025",
    amount: "$400.00",
    icon: "download",
  },
];

// Original contact data for other examples
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
              <DataTable.Cell>
                <Typography fontWeight="bold">{row.name}</Typography>
              </DataTable.Cell>
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
        cell: ({ row }) => (
          <Typography fontWeight="bold">{row.original.name}</Typography>
        ),
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

  // TanStack table setup
  const table = useReactTable({
    data: exampleData,
    columns: [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <Typography fontWeight="bold">{row.original.name}</Typography>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div>
            {row.original.email}
            {hoveredRow === row.original.id && (
              <DataTable.RowActions>
                <Button
                  icon="checkmark"
                  ariaLabel={`Complete ${row.original.name}`}
                  type="secondary"
                  variation="subtle"
                  onClick={() => alert(`Complete ${row.original.name}`)}
                />
                <Button
                  icon="edit"
                  ariaLabel={`Edit ${row.original.name}`}
                  type="secondary"
                  variation="subtle"
                  onClick={() => alert(`Edit ${row.original.name}`)}
                />
              </DataTable.RowActions>
            )}
          </div>
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTable.TableLayout>
      <DataTable.Table>
        <DataTable.Header>
          <DataTable.HeaderCell>Name</DataTable.HeaderCell>
          <DataTable.HeaderCell>Role</DataTable.HeaderCell>
          <DataTable.HeaderCell>Email</DataTable.HeaderCell>
        </DataTable.Header>
        <DataTable.TableBody>
          {table.getRowModel().rows.map(row => (
            <DataTable.Row
              key={row.id}
              onMouseEnter={() => setHoveredRow(row.original.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
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
        cell: ({ row }) => (
          <Typography fontWeight="bold">{row.original.name}</Typography>
        ),
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
        cell: ({ row }) => (
          <Typography fontWeight="bold">{row.original.name}</Typography>
        ),
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
                {exampleData.length} items
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

export const FinancialTransactions = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });

  const currentBalance = 2000;

  const table = useReactTable({
    data: transactionData,
    columns: [
      {
        accessorKey: "item",
        header: "Item",
        cell: ({ row }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-small)",
            }}
          >
            <Icon name={row.original.icon as IconNames} />
            <Typography fontWeight="bold">{row.original.item}</Typography>
            {row.original.badge && (
              <StatusLabel status="warning" label={row.original.badge} />
            )}
          </div>
        ),
      },
      {
        accessorKey: "appliedTo",
        header: "Applied to",
      },
      {
        accessorKey: "createdDate",
        header: "Created date",
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <div style={{ textAlign: "right" }}>{row.original.amount}</div>
        ),
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
            <DataTable.HeaderCell>Item</DataTable.HeaderCell>
            <DataTable.HeaderCell>Applied to</DataTable.HeaderCell>
            <DataTable.HeaderCell>Created date</DataTable.HeaderCell>
            <DataTable.HeaderCell style={{ textAlign: "right" }}>
              Amount
            </DataTable.HeaderCell>
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

          {/* Current balance footer */}
          <DataTable.Footer>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "var(--space-base)",
                fontWeight: "bold",
              }}
            >
              <Typography fontWeight="bold">Current balance</Typography>
              <Typography fontWeight="bold">
                ${currentBalance.toLocaleString()}.00
              </Typography>
            </div>
          </DataTable.Footer>

          {/* Pagination footer */}
          <DataTable.Footer style={{ borderTopWidth: "var(--border-thick)" }}>
            <DataTable.Pagination
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>
                Showing {table.getRowModel().rows.length} of{" "}
                {transactionData.length} items
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
