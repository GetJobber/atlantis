import React, { useState } from "react";
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
import { ComponentMeta } from "@storybook/react";
import { DataTable, SortDirection } from "@jobber/components/DataTable";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { Combobox, ComboboxOption } from "@jobber/components/Combobox";
import { Icon, IconNames } from "@jobber/components/Icon";
import { Text } from "@jobber/components/Text";
import { StatusLabel } from "@jobber/components/StatusLabel";
import { Typography } from "@jobber/components/Typography";
import { Cluster } from "@jobber/components/Cluster";

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

const paymentMethodsData = [
  {
    id: "1",
    method: "**** **** **** 4242",
    isDefault: true,
    icon: "payment",
    expiry: "08/2025",
  },
  {
    id: "2",
    method: "**** **** **** 7534",
    isDefault: false,
    icon: "bank",
    expiry: "—",
  },
  {
    id: "3",
    method: "**** **** **** 1129",
    isDefault: false,
    icon: "payment",
    expiry: "08/2025",
  },
];

const exampleData = [
  {
    id: "1",
    name: "Ryan Clearwater",
    role: "Office admin",
    email: "ryan.c@example.com",
  },
  {
    id: "2",
    name: "Bessie Cooper",
    role: "Site manager",
    email: "bessie.c@example.com",
  },
  {
    id: "3",
    name: "Cody Fisher",
    role: "Office admin",
    email: "cody.f@example.com",
  },
  {
    id: "4",
    name: "Darlene Robertson",
    role: "Site manager",
    email: "darlene.r@test.com",
  },
  {
    id: "5",
    name: "Jerome Bell",
    role: "Project manager",
    email: "jerome.b@example.com",
  },
  {
    id: "6",
    name: "Kristin Watson",
    role: "Customer service",
    email: "kristin.w@example.com",
  },
  {
    id: "7",
    name: "John Smithers",
    role: "Office admin",
    email: "john.s@example.com",
  },
  {
    id: "8",
    name: "Wilma Jackson",
    role: "Customer service",
    email: "wilma.j@example.com",
  },
];

export const Basic = () => {
  return (
    <DataTable.Container>
      <DataTable.Table>
        <DataTable.Header>
          <DataTable.HeaderCell>Name</DataTable.HeaderCell>
          <DataTable.HeaderCell>Role</DataTable.HeaderCell>
          <DataTable.HeaderCell>Email</DataTable.HeaderCell>
        </DataTable.Header>
        <DataTable.Body>
          {exampleData.map(row => (
            <DataTable.Row key={row.id}>
              <DataTable.Cell>
                <Typography fontWeight="bold">{row.name}</Typography>
              </DataTable.Cell>
              <DataTable.Cell>{row.role}</DataTable.Cell>
              <DataTable.Cell>{row.email}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable.Body>
      </DataTable.Table>
    </DataTable.Container>
  );
};

export const TableActions = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Get unique roles for combobox options
  const roleOptions = Array.from(
    new Set(exampleData.map(item => item.role)),
  ).map(role => ({
    id: role,
    label: role,
  }));

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
          const cellValue = row.getValue(columnId) as string;

          return filterValue?.includes?.(cellValue);
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

  const roleFilterValue = table.getColumn("role")?.getFilterValue() as
    | string[]
    | undefined;

  const handleRoleSelect = (selectedOptions: ComboboxOption[]) => {
    const roleValues = selectedOptions.map(option => option.label);

    if (roleValues.length > 0) {
      setColumnFilters(prev =>
        prev
          .filter(f => f.id !== "role")
          .concat({
            id: "role",
            value: roleValues,
          }),
      );
    } else {
      setColumnFilters(prev => prev.filter(f => f.id !== "role"));
    }
  };

  const clearRoleFilter = () => {
    setColumnFilters(prev => prev.filter(f => f.id !== "role"));
  };

  return (
    <StorybookTableProvider table={table}>
      <DataTable.Actions>
        <Combobox
          label="Role"
          selected={(roleFilterValue ?? []).map(role => ({
            id: role,
            label: role,
          }))}
          onSelect={handleRoleSelect}
          multiSelect
        >
          <Combobox.Activator>
            <Chip
              label={
                roleFilterValue && roleFilterValue.length > 0
                  ? roleFilterValue.join(", ")
                  : ""
              }
              heading="Role"
              variation={
                roleFilterValue && roleFilterValue.length > 0
                  ? "base"
                  : "subtle"
              }
            >
              <Chip.Suffix
                {...(roleFilterValue && roleFilterValue.length > 0
                  ? { onClick: clearRoleFilter }
                  : {})}
              >
                <Icon
                  name={
                    roleFilterValue && roleFilterValue.length > 0
                      ? "cross"
                      : "add"
                  }
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
      </DataTable.Actions>

      <DataTable.Container>
        <DataTable.Table>
          <DataTable.Header>
            <DataTable.HeaderCell>Name</DataTable.HeaderCell>
            <DataTable.HeaderCell>Role</DataTable.HeaderCell>
            <DataTable.HeaderCell>Email</DataTable.HeaderCell>
          </DataTable.Header>
          <DataTable.Body>
            {table.getFilteredRowModel().rows.map(row => (
              <DataTable.Row key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <DataTable.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable.Body>
        </DataTable.Table>
      </DataTable.Container>
    </StorybookTableProvider>
  );
};

// Storybook-specific context for providing table instance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StorybookTableContext = React.createContext<any>(null);

// Hook to access table instance in stories
// Available for use in story components that need table access
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStorybookTable = () => {
  const table = React.useContext(StorybookTableContext);

  if (!table) {
    throw new Error(
      "useStorybookTable must be used within StorybookTableProvider",
    );
  }

  return table;
};

// Provider component for Storybook examples
const StorybookTableProvider = ({
  children,
  table,
}: {
  readonly children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly table: any;
}) => {
  return (
    <StorybookTableContext.Provider value={table}>
      {children}
    </StorybookTableContext.Provider>
  );
};

export const RowActions = () => {
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);

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
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div
            style={{
              opacity: hoveredRow === row.original.id ? 1 : 0,
              transition: "opacity 0.2s ease",
              width: "100%",
            }}
          >
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
          </div>
        ),
        enableHiding: false,
        meta: {
          isActionsColumn: true,
          shouldShowOnHover: true,
        },
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <StorybookTableProvider table={table}>
      <DataTable.Container>
        <DataTable.Table>
          <DataTable.Header>
            <DataTable.HeaderCell>Name</DataTable.HeaderCell>
            <DataTable.HeaderCell>Role</DataTable.HeaderCell>
            <DataTable.HeaderCell>Email</DataTable.HeaderCell>
          </DataTable.Header>
          <DataTable.Body>
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
          </DataTable.Body>
        </DataTable.Table>
      </DataTable.Container>
    </StorybookTableProvider>
  );
};

export const EndAlignedColumns = () => {
  const table = useReactTable({
    data: paymentMethodsData,
    columns: [
      {
        accessorKey: "method",
        header: "Method",
        cell: ({ row }) => (
          <Cluster gap="small" align="center">
            <Icon name={row.original.icon as IconNames} />
            <div>
              <Typography fontWeight="bold">{row.original.method}</Typography>
              {row.original.isDefault && (
                <Text variation="subdued">Default method</Text>
              )}
            </div>
          </Cluster>
        ),
      },
      {
        accessorKey: "expiry",
        header: "Expiry",
        cell: ({ row }) => <Text align="end">{row.original.expiry}</Text>,
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <StorybookTableProvider table={table}>
      <DataTable.Container>
        <DataTable.Table>
          <DataTable.Header>
            <DataTable.HeaderCell>Method</DataTable.HeaderCell>
            <DataTable.HeaderCell>
              <Text align="end">Expiry</Text>
            </DataTable.HeaderCell>
          </DataTable.Header>
          <DataTable.Body>
            {table.getRowModel().rows.map(row => (
              <DataTable.Row key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <DataTable.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable.Body>
        </DataTable.Table>
      </DataTable.Container>
    </StorybookTableProvider>
  );
};

export const Sortable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: exampleData,
    columns: [
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
        cell: ({ row }) => (
          <Typography fontWeight="bold">{row.original.name}</Typography>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        enableSorting: true,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableSorting: false,
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
    <StorybookTableProvider table={table}>
      <DataTable.Container>
        <DataTable.Table>
          <DataTable.Header>
            {table.getHeaderGroups().map(headerGroup =>
              headerGroup.headers.map(header => (
                <DataTable.SortableHeader
                  key={header.id}
                  direction={
                    header.column.getCanSort()
                      ? header.column.getIsSorted() === "desc"
                        ? SortDirection.descending
                        : header.column.getIsSorted() === "asc"
                        ? SortDirection.ascending
                        : SortDirection.equilibrium
                      : undefined
                  }
                  onSort={
                    header.column.getCanSort()
                      ? () =>
                          header.column.getToggleSortingHandler()?.(
                            {} as React.MouseEvent,
                          )
                      : undefined
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </DataTable.SortableHeader>
              )),
            )}
          </DataTable.Header>
          <DataTable.Body>
            {sortedRows.map(row => (
              <DataTable.Row key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <DataTable.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable.Body>
        </DataTable.Table>
      </DataTable.Container>
    </StorybookTableProvider>
  );
};

export const WithPagination = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 4,
  });

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
    <StorybookTableProvider table={table}>
      <DataTable.Container>
        <DataTable.Table>
          <DataTable.Header>
            <DataTable.HeaderCell>Name</DataTable.HeaderCell>
            <DataTable.HeaderCell>Role</DataTable.HeaderCell>
            <DataTable.HeaderCell>Email</DataTable.HeaderCell>
          </DataTable.Header>
          <DataTable.Body>
            {table.getRowModel().rows.map(row => (
              <DataTable.Row key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <DataTable.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable.Body>
          <DataTable.Footer colSpan={table.getAllLeafColumns().length}>
            <DataTable.Pagination>
              <Cluster justify="space-between" align="center">
                <Text>
                  Showing {table.getRowModel().rows.length} of{" "}
                  {exampleData.length} items
                </Text>

                <Cluster gap="small">
                  <DataTable.PaginationButton
                    direction="previous"
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                    ariaLabel={direction =>
                      direction === "next" ? "Next page" : "Previous page"
                    }
                  />
                  <DataTable.PaginationButton
                    direction="next"
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                    ariaLabel={direction =>
                      direction === "next" ? "Next page" : "Previous page"
                    }
                  />
                </Cluster>
              </Cluster>
            </DataTable.Pagination>
          </DataTable.Footer>
        </DataTable.Table>
      </DataTable.Container>
    </StorybookTableProvider>
  );
};

export const DoubleFooter = () => {
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
          <Cluster gap="small" align="center">
            <Icon name={row.original.icon as IconNames} />
            <Typography fontWeight="bold">{row.original.item}</Typography>
            {row.original.badge && (
              <StatusLabel status="warning" label={row.original.badge} />
            )}
          </Cluster>
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
        cell: ({ row }) => <Text align="end">{row.original.amount}</Text>,
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
    <StorybookTableProvider table={table}>
      <DataTable.Container>
        <DataTable.Table>
          <DataTable.Header>
            <DataTable.HeaderCell>Item</DataTable.HeaderCell>
            <DataTable.HeaderCell>Applied to</DataTable.HeaderCell>
            <DataTable.HeaderCell>Created date</DataTable.HeaderCell>
            <DataTable.HeaderCell>
              <Text align="end">Amount</Text>
            </DataTable.HeaderCell>
          </DataTable.Header>
          <DataTable.Body>
            {table.getRowModel().rows.map(row => (
              <DataTable.Row key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <DataTable.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable.Body>

          {/* Current balance footer */}
          <DataTable.Footer colSpan={table.getAllLeafColumns().length}>
            <div style={{ padding: "var(--space-base)", fontWeight: "bold" }}>
              <Cluster justify="space-between" align="center">
                <Typography fontWeight="bold">Current balance</Typography>
                <Typography fontWeight="bold">
                  ${currentBalance.toLocaleString()}.00
                </Typography>
              </Cluster>
            </div>
          </DataTable.Footer>

          {/* Pagination footer */}
          <DataTable.Footer
            colSpan={table.getAllLeafColumns().length}
            style={{ borderTopWidth: "var(--border-thick)" }}
          >
            <DataTable.Pagination>
              <Cluster justify="space-between" align="center">
                <Text>
                  Showing {table.getRowModel().rows.length} of{" "}
                  {transactionData.length} items
                </Text>

                <Cluster gap="small">
                  <DataTable.PaginationButton
                    direction="previous"
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                    ariaLabel={direction =>
                      direction === "next" ? "Next page" : "Previous page"
                    }
                  />
                  <DataTable.PaginationButton
                    direction="next"
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                    ariaLabel={direction =>
                      direction === "next" ? "Next page" : "Previous page"
                    }
                  />
                </Cluster>
              </Cluster>
            </DataTable.Pagination>
          </DataTable.Footer>
        </DataTable.Table>
      </DataTable.Container>
    </StorybookTableProvider>
  );
};
