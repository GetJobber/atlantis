import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";
import {
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable, SortDirection } from "@jobber/components/DataTable";
import { Button } from "@jobber/components/Button";
import { Chip } from "@jobber/components/Chip";
import { ChipDismissible } from "@jobber/components/Chips";
import { Combobox, ComboboxOption } from "@jobber/components/Combobox";
import { Icon, IconNames } from "@jobber/components/Icon";
import { Text } from "@jobber/components/Text";
import { StatusLabel } from "@jobber/components/StatusLabel";
import { Typography } from "@jobber/components/Typography";
import { Checkbox } from "@jobber/components/Checkbox";
import { InputText } from "@jobber/components/InputText";
import { Modal } from "@jobber/components/Modal";
import { useBreakpoints } from "@jobber/hooks/useBreakpoints";
import { Content } from "@jobber/components/Content";

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-small)",
            }}
          >
            <Icon name={row.original.icon as IconNames} />
            <div>
              <Typography fontWeight="bold">{row.original.method}</Typography>
              {row.original.isDefault && (
                <Text variation="subdued">Default method</Text>
              )}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "expiry",
        header: "Expiry",
        cell: ({ row }) => (
          <div style={{ textAlign: "right" }}>{row.original.expiry}</div>
        ),
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
            <DataTable.HeaderCell style={{ textAlign: "right" }}>
              Expiry
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
              </div>
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
    <StorybookTableProvider table={table}>
      <DataTable.Container>
        <DataTable.Table>
          <DataTable.Header>
            <DataTable.HeaderCell>Item</DataTable.HeaderCell>
            <DataTable.HeaderCell>Applied to</DataTable.HeaderCell>
            <DataTable.HeaderCell>Created date</DataTable.HeaderCell>
            <DataTable.HeaderCell style={{ textAlign: "right" }}>
              Amount
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
              </div>
            </DataTable.Pagination>
          </DataTable.Footer>
        </DataTable.Table>
      </DataTable.Container>
    </StorybookTableProvider>
  );
};

const businessObjectsData = [
  {
    id: "1",
    type: "invoice",
    item: "Invoice #123",
    description: "For Services rendered",
    property: "1234 Maple Street",
    date: "Due July 3, 2025",
    status: "Late",
    statusType: "warning" as const,
    amount: "$2400.00",
    icon: "file" as IconNames,
  },
  {
    id: "2",
    type: "job",
    item: "Job #22",
    description: "Hardscaping - Lory",
    property: "789 Pine Blvd",
    date: "Scheduled for Jul 1, 2025",
    status: "Today",
    statusType: "success" as const,
    amount: "$2700.00",
    icon: "job" as IconNames,
  },
  {
    id: "3",
    type: "job",
    item: "Job #72",
    description: "Hardscaping",
    property: "1234 Maple Street",
    date: "Completed Jul 1, 2025",
    status: "Archived",
    statusType: "inactive" as const,
    amount: "$2400.00",
    icon: "job" as IconNames,
  },
  {
    id: "4",
    type: "quote",
    item: "Quote #42",
    description: "Hardscaping",
    property: "1234 Maple Street",
    date: "Created Jun 17, 2025",
    status: "Converted",
    statusType: "informative" as const,
    amount: "$2400.00",
    icon: "quote" as IconNames,
  },
  {
    id: "5",
    type: "invoice",
    item: "Invoice #124",
    description: "Landscaping services",
    property: "456 Oak Avenue",
    date: "Due Aug 15, 2025",
    status: "Pending",
    statusType: "inactive" as const,
    amount: "$1800.00",
    icon: "invoice" as IconNames,
  },
  {
    id: "6",
    type: "request",
    item: "Request #88",
    description: "Lawn maintenance",
    property: "789 Pine Blvd",
    date: "Received Jul 20, 2025",
    status: "New",
    statusType: "success" as const,
    amount: "$500.00",
    icon: "request" as IconNames,
  },
  {
    id: "7",
    type: "quote",
    item: "Quote #51",
    description: "Pool installation",
    property: "321 Cedar Street",
    date: "Created Jul 10, 2025",
    status: "Pending",
    statusType: "inactive" as const,
    amount: "$15000.00",
    icon: "quote" as IconNames,
  },
  {
    id: "8",
    type: "job",
    item: "Job #45",
    description: "Deck construction",
    property: "456 Oak Avenue",
    date: "In Progress Jul 25, 2025",
    status: "Active",
    statusType: "informative" as const,
    amount: "$3200.00",
    icon: "job" as IconNames,
  },
];

type ObjectType = "all" | "invoice" | "job" | "quote" | "request";

export const AdvancedFiltering = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Get unique properties for combobox options
  const propertyOptions = Array.from(
    new Set(businessObjectsData.map(item => item.property)),
  ).map(property => ({
    id: property,
    label: property,
  }));

  // Object type options (excluding "all")
  const objectTypeOptions: Array<{
    id: ObjectType;
    label: string;
    icon: IconNames;
  }> = [
    {
      id: "request",
      label: "Requests",
      icon: "request",
    },
    {
      id: "quote",
      label: "Quotes",
      icon: "quote",
    },
    {
      id: "job",
      label: "Jobs",
      icon: "job",
    },
    {
      id: "invoice",
      label: "Invoices",
      icon: "invoice",
    },
  ];

  const table = useReactTable({
    data: businessObjectsData,
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
            <Icon name={row.original.icon} />
            <div>
              <Typography fontWeight="bold">{row.original.item}</Typography>
              <Text variation="subdued">{row.original.description}</Text>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "property",
        header: "Property",
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue.length === 0) return true;
          const rowValue = row.getValue(columnId) as string;

          return filterValue.includes(rowValue);
        },
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <StatusLabel
            status={row.original.statusType}
            label={row.original.status}
          />
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <div style={{ textAlign: "right" }}>{row.original.amount}</div>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue) return true;
          const rowValue = row.getValue(columnId) as string;

          return rowValue === filterValue;
        },
      },
    ],
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Get current selected properties from TanStack filter state
  const selectedProperties = React.useMemo(() => {
    const propertyFilter = columnFilters.find(
      filter => filter.id === "property",
    );

    if (!propertyFilter?.value || !Array.isArray(propertyFilter.value)) {
      return [];
    }

    return (propertyFilter.value as string[]).map(property => ({
      id: property,
      label: property,
    }));
  }, [columnFilters]);

  // Get current selected object type from TanStack filter state
  const selectedObjectType = React.useMemo(() => {
    const typeFilter = columnFilters.find(filter => filter.id === "type");

    return (typeFilter?.value as ObjectType) || "all";
  }, [columnFilters]);

  const handleObjectTypeSelect = (objectType: ObjectType) => {
    if (objectType === "all") {
      setColumnFilters(prev => prev.filter(f => f.id !== "type"));
    } else {
      setColumnFilters(prev =>
        prev
          .filter(f => f.id !== "type")
          .concat({
            id: "type",
            value: objectType,
          }),
      );
    }
  };

  const handlePropertySelect = (selectedOptions: ComboboxOption[]) => {
    const propertyValues = selectedOptions.map(option => option.label);

    if (propertyValues.length > 0) {
      setColumnFilters(prev =>
        prev
          .filter(f => f.id !== "property")
          .concat({
            id: "property",
            value: propertyValues,
          }),
      );
    } else {
      setColumnFilters(prev => prev.filter(f => f.id !== "property"));
    }
  };

  const clearPropertyFilter = () => {
    setColumnFilters(prev => prev.filter(f => f.id !== "property"));
  };

  const clearObjectTypeFilter = () => {
    setColumnFilters(prev => prev.filter(f => f.id !== "type"));
  };

  return (
    <StorybookTableProvider table={table}>
      <DataTable.Actions>
        <Combobox
          label="Property"
          selected={selectedProperties}
          onSelect={handlePropertySelect}
          multiSelect
        >
          <Combobox.Activator>
            <Chip
              label={
                selectedProperties.length > 0
                  ? selectedProperties.map(option => option.label).join(", ")
                  : ""
              }
              heading="Property"
              variation={selectedProperties.length > 0 ? "base" : "subtle"}
            >
              <Chip.Suffix
                {...(selectedProperties.length > 0
                  ? { onClick: clearPropertyFilter }
                  : {})}
              >
                <Icon
                  name={selectedProperties.length > 0 ? "cross" : "add"}
                  size="small"
                />
              </Chip.Suffix>
            </Chip>
          </Combobox.Activator>

          {propertyOptions.map(option => (
            <Combobox.Option
              key={option.id}
              id={option.id}
              label={option.label}
            />
          ))}
        </Combobox>

        <div
          style={{
            display: "flex",
            gap: "var(--space-small)",
          }}
        >
          {objectTypeOptions.map(option => {
            const isSelected = selectedObjectType === option.id;

            if (isSelected) {
              return (
                <ChipDismissible
                  key={option.id}
                  label={option.label}
                  onClick={() => handleObjectTypeSelect(option.id)}
                  onRequestRemove={clearObjectTypeFilter}
                  prefix={<Icon name={option.icon} size="large" />}
                />
              );
            }

            return (
              <Chip
                key={option.id}
                label={option.label}
                variation="subtle"
                onClick={() => handleObjectTypeSelect(option.id)}
              >
                <Chip.Prefix>
                  <Icon name={option.icon} size="large" />
                </Chip.Prefix>
              </Chip>
            );
          })}
        </div>
      </DataTable.Actions>

      <DataTable.Container>
        <DataTable.Table>
          <DataTable.Header>
            <DataTable.HeaderCell>Item</DataTable.HeaderCell>
            <DataTable.HeaderCell>Property</DataTable.HeaderCell>
            <DataTable.HeaderCell>Date</DataTable.HeaderCell>
            <DataTable.HeaderCell>Status</DataTable.HeaderCell>
            <DataTable.HeaderCell style={{ textAlign: "right" }}>
              Amount
            </DataTable.HeaderCell>
          </DataTable.Header>
          <DataTable.Body>
            {table.getFilteredRowModel().rows.map(row => (
              <DataTable.Row key={row.id}>
                {row.getVisibleCells().map(cell => {
                  if (cell.column.id === "type") return null;

                  return (
                    <DataTable.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </DataTable.Cell>
                  );
                })}
              </DataTable.Row>
            ))}
          </DataTable.Body>
        </DataTable.Table>
      </DataTable.Container>
    </StorybookTableProvider>
  );
};

export const ColumnVisibility = () => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

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
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <StorybookTableProvider table={table}>
      <DataTable.Actions>
        <div style={{ display: "flex", gap: "var(--space-base)" }}>
          <Typography fontWeight="bold">Show Columns:</Typography>
          {table.getAllLeafColumns().map(column => (
            <Checkbox
              key={column.id}
              label={column.columnDef.header as string}
              checked={column.getIsVisible()}
              disabled={!column.getCanHide()}
              onChange={checked => column.toggleVisibility(checked)}
            />
          ))}
        </div>
      </DataTable.Actions>

      <DataTable.Container>
        <DataTable.Table>
          <DataTable.Header>
            {table.getVisibleLeafColumns().map(column => (
              <DataTable.HeaderCell key={column.id}>
                {column.columnDef.header as string}
              </DataTable.HeaderCell>
            ))}
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

export const BulkSelection = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: exampleData,
    columns: [
      {
        id: "select",
        header: ({ table: tableInstance }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={tableInstance.getIsAllRowsSelected()}
              indeterminate={tableInstance.getIsSomeRowsSelected()}
              onChange={checked => tableInstance.toggleAllRowsSelected(checked)}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onChange={checked => row.toggleSelected(checked)}
            />
          </div>
        ),
      },
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
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <StorybookTableProvider table={table}>
      <DataTable.Actions>
        <div
          style={{
            display: "flex",
            gap: "var(--space-base)",
            alignItems: "center",
          }}
        >
          <Typography fontWeight="bold">
            {selectedCount > 0
              ? `${selectedCount} selected`
              : "Select rows for bulk actions"}
          </Typography>
        </div>
      </DataTable.Actions>

      <DataTable.Container>
        <DataTable.Table>
          <DataTable.Header>
            {table.getHeaderGroups().map(headerGroup =>
              headerGroup.headers.map(header => (
                <DataTable.HeaderCell
                  key={header.id}
                  style={{
                    paddingRight: header.id === "select" ? 0 : undefined,
                    paddingLeft:
                      header.id === "name" ? "var(--space-smaller)" : undefined,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </DataTable.HeaderCell>
              )),
            )}
          </DataTable.Header>
          <DataTable.Body>
            {table.getRowModel().rows.map(row => (
              <DataTable.Row key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <DataTable.Cell
                    key={cell.id}
                    style={{
                      paddingRight: cell.column.id === "select" ? 0 : undefined,
                      paddingLeft:
                        cell.column.id === "name"
                          ? "var(--space-smaller)"
                          : undefined,
                    }}
                  >
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

export const GlobalSearch = () => {
  const [globalFilter, setGlobalFilter] = useState("");

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
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <StorybookTableProvider table={table}>
      <DataTable.Actions>
        <div
          style={{
            display: "flex",
            gap: "var(--space-base)",
            alignItems: "center",
          }}
        >
          <InputText
            version={1}
            value={globalFilter ?? ""}
            onChange={value => setGlobalFilter(String(value))}
            placeholder="Search all columns"
            clearable="while-editing"
          />
        </div>
      </DataTable.Actions>

      <DataTable.Container>
        <DataTable.Table>
          <DataTable.Header>
            {table
              .getHeaderGroups()
              .map(headerGroup =>
                headerGroup.headers.map(header => (
                  <DataTable.HeaderCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </DataTable.HeaderCell>
                )),
              )}
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

export const MobileResponsive = () => {
  const { mediumAndUp } = useBreakpoints();
  const isDesktop = mediumAndUp;
  const isMobile = !isDesktop;

  const columnVisibility = React.useMemo(
    () => ({
      // Mobile: Only show the combined cell
      mobileContent: isMobile,

      // Desktop: Show individual columns, hide combined cell
      name: isDesktop,
      role: isDesktop,
      email: isDesktop,
      actions: isDesktop,
    }),
    [isDesktop],
  );

  const table = useReactTable({
    data: exampleData,
    columns: [
      // Mobile: Combined cell with all information
      {
        id: "mobileContent",
        header: "Contact Information",
        cell: ({ row }) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-small)",
            }}
          >
            <Typography fontWeight="bold">{row.original.name}</Typography>
            <Text variation="subdued">{row.original.role}</Text>
            <Text variation="subdued">{row.original.email}</Text>
          </div>
        ),
      },
      // Desktop: Individual columns
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
        cell: ({ row }) => <Text>{row.original.role}</Text>,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <Text>{row.original.email}</Text>,
      },
    ],
    state: {
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <StorybookTableProvider table={table}>
      <DataTable.Actions>
        <div
          style={{
            display: "flex",
            gap: "var(--space-base)",
            alignItems: "center",
          }}
        >
          <Typography fontWeight="bold">
            {isMobile ? "Mobile Layout" : "Desktop Layout"}
          </Typography>
          <Text variation="subdued" size="small">
            Resize window to see responsive behavior
          </Text>
        </div>
      </DataTable.Actions>

      <DataTable.Container>
        <DataTable.Table>
          <DataTable.Header>
            {table.getHeaderGroups().map(headerGroup =>
              headerGroup.headers.map(header => {
                if (header.column.getIsVisible()) {
                  return (
                    <DataTable.HeaderCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </DataTable.HeaderCell>
                  );
                }

                return null;
              }),
            )}
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

export const RowSelection = () => {
  const [selectedRow, setSelectedRow] = useState<
    (typeof exampleData)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (row: (typeof exampleData)[0]) => {
    console.log("Row clicked:", row);
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <>
      <StorybookTableProvider table={table}>
        <DataTable.Actions>
          <div
            style={{
              display: "flex",
              gap: "var(--space-base)",
              alignItems: "center",
            }}
          >
            <Typography fontWeight="bold">
              Click any row to view details
            </Typography>
            <Text variation="subdued" size="small">
              Row selection opens a modal with detailed information
            </Text>
          </div>
        </DataTable.Actions>

        <DataTable.Container>
          <DataTable.Table>
            <DataTable.Header>
              {table
                .getHeaderGroups()
                .map(headerGroup =>
                  headerGroup.headers.map(header => (
                    <DataTable.HeaderCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </DataTable.HeaderCell>
                  )),
                )}
            </DataTable.Header>
            <DataTable.Body>
              {table.getRowModel().rows.map(row => (
                <DataTable.Row
                  key={row.id}
                  onClick={() => handleRowClick(row.original)}
                  style={{ cursor: "pointer" }}
                >
                  {row.getVisibleCells().map(cell => (
                    <DataTable.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ))}
            </DataTable.Body>
          </DataTable.Table>
        </DataTable.Container>
      </StorybookTableProvider>

      <Modal
        open={isModalOpen}
        onRequestClose={closeModal}
        title="Row Details"
        secondaryAction={{ label: "Close", onClick: closeModal }}
      >
        {selectedRow && (
          <Content>
            <div>
              <Typography fontWeight="bold" size="large">
                {selectedRow.name}
              </Typography>
              <Text variation="subdued">{selectedRow.role}</Text>
            </div>
            <div>
              <Typography fontWeight="bold">Email</Typography>
              <Text>{selectedRow.email}</Text>
            </div>
            <div>
              <Typography fontWeight="bold">Role</Typography>
              <Text>{selectedRow.role}</Text>
            </div>
          </Content>
        )}
      </Modal>
    </>
  );
};
