import React, { useState } from "react";
import {
  Box,
  Cluster,
  DataTable,
  Heading,
  Stack,
  Text,
  Typography,
} from "@jobber/components";
import { SortDirection } from "@jobber/components/DataTable";
import {
  PaginationState,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const exampleData = [
  { id: "1", name: "John Doe", role: "Admin", email: "john@example.com" },
  { id: "2", name: "Jane Smith", role: "User", email: "jane@example.com" },
  { id: "3", name: "Bob Johnson", role: "User", email: "bob@example.com" },
  { id: "4", name: "Alice Brown", role: "Admin", email: "alice@example.com" },
];

const invoiceData = [
  {
    id: "234",
    invoiceNumber: "#234",
    dueDate: "Sep 16, 2025",
    status: "Paid",
    subject: "For service rendered",
    total: 750.0,
    balance: 0.0,
  },
  {
    id: "196",
    invoiceNumber: "#196",
    dueDate: "Oct 16, 2025",
    status: "Paid",
    subject: "For service rendered",
    total: 750.0,
    balance: 0.0,
  },
  {
    id: "195",
    invoiceNumber: "#195",
    dueDate: "Oct 16, 2025",
    status: "Paid",
    subject: "For service rendered",
    total: 750.0,
    balance: 0.0,
  },
  {
    id: "194",
    invoiceNumber: "#194",
    dueDate: "Oct 16, 2025",
    status: "Pending",
    subject: "For service rendered",
    total: 750.0,
    balance: 750.0,
  },
];

export const VisualTestDataTableAtomsPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 3,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: invoiceData,
    columns: [
      { accessorKey: "invoiceNumber", header: "Invoice" },
      { accessorKey: "dueDate", header: "Due Date" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "subject", header: "Subject" },
      { accessorKey: "total", header: "Total" },
      { accessorKey: "balance", header: "Balance" },
    ],
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const sortableTable = useReactTable({
    data: exampleData,
    columns: [
      { accessorKey: "name", header: "Name", enableSorting: true },
      { accessorKey: "role", header: "Role", enableSorting: true },
      { accessorKey: "email", header: "Email", enableSorting: false },
    ],
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalAmount = invoiceData.reduce((sum, inv) => sum + inv.total, 0);
  const totalBalance = invoiceData.reduce((sum, inv) => sum + inv.balance, 0);
  const pageSubtotal = table
    .getRowModel()
    .rows.reduce((sum, row) => sum + row.original.total, 0);

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>DataTable Atoms Visual Tests</Heading>

        <Stack gap="large">
          {/* Basic Structure */}
          <section>
            <Text size="large">Basic Structure</Text>
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
          </section>

          {/* Footer with Custom Row */}
          <section>
            <Text size="large">Footer with Custom Row</Text>
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
                  {exampleData.slice(0, 2).map(row => (
                    <DataTable.Row key={row.id}>
                      <DataTable.Cell>{row.name}</DataTable.Cell>
                      <DataTable.Cell>{row.role}</DataTable.Cell>
                      <DataTable.Cell>{row.email}</DataTable.Cell>
                      <DataTable.Cell>
                        <Text align="end">$1,000.00</Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable.Body>
                <DataTable.Footer>
                  <DataTable.Row>
                    <DataTable.Cell colSpan={3}>
                      <Typography fontWeight="bold">Current balance</Typography>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Typography fontWeight="bold" align="end">
                        $2,000.00
                      </Typography>
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable.Footer>
              </DataTable.Table>
            </DataTable.Container>
          </section>

          {/* Footer with Totals and Pagination */}
          <section>
            <Text size="large">Footer with Totals and Pagination</Text>
            <DataTable.Container>
              <DataTable.Table>
                <DataTable.Header>
                  <DataTable.HeaderCell>Invoice</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Due Date</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Status</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Subject</DataTable.HeaderCell>
                  <DataTable.HeaderCell>
                    <Text align="end">Total</Text>
                  </DataTable.HeaderCell>
                  <DataTable.HeaderCell>
                    <Text align="end">Balance</Text>
                  </DataTable.HeaderCell>
                </DataTable.Header>
                <DataTable.Body>
                  {table.getRowModel().rows.map(row => (
                    <DataTable.Row key={row.id}>
                      <DataTable.Cell>
                        {row.original.invoiceNumber}
                      </DataTable.Cell>
                      <DataTable.Cell>{row.original.dueDate}</DataTable.Cell>
                      <DataTable.Cell>{row.original.status}</DataTable.Cell>
                      <DataTable.Cell>{row.original.subject}</DataTable.Cell>
                      <DataTable.Cell>
                        <Text align="end">
                          ${row.original.total.toLocaleString()}.00
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text align="end">
                          ${row.original.balance.toLocaleString()}.00
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable.Body>
                <DataTable.Footer>
                  <DataTable.Row>
                    <DataTable.Cell colSpan={4}>
                      <Typography fontWeight="bold">Total</Typography>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Typography fontWeight="bold" align="end">
                        ${totalAmount.toLocaleString()}.00
                      </Typography>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Typography fontWeight="bold" align="end">
                        ${totalBalance.toLocaleString()}.00
                      </Typography>
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable.Footer>
              </DataTable.Table>
              <DataTable.Pagination>
                <Cluster justify="space-between" align="center">
                  <Text>
                    Showing {table.getRowModel().rows.length} of{" "}
                    {invoiceData.length} invoices
                  </Text>
                  <Cluster gap="small">
                    <DataTable.PaginationButton
                      direction="previous"
                      disabled={!table.getCanPreviousPage()}
                      onClick={() => table.previousPage()}
                      ariaLabel={() => "Previous page"}
                    />
                    <DataTable.PaginationButton
                      direction="next"
                      disabled={!table.getCanNextPage()}
                      onClick={() => table.nextPage()}
                      ariaLabel={() => "Next page"}
                    />
                  </Cluster>
                </Cluster>
              </DataTable.Pagination>
            </DataTable.Container>
          </section>

          {/* Footer with Page Totals */}
          <section>
            <Text size="large">Footer with Page Totals</Text>
            <DataTable.Container>
              <DataTable.Table>
                <DataTable.Header>
                  <DataTable.HeaderCell>Invoice</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Due Date</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Status</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Subject</DataTable.HeaderCell>
                  <DataTable.HeaderCell>
                    <Text align="end">Total</Text>
                  </DataTable.HeaderCell>
                </DataTable.Header>
                <DataTable.Body>
                  {table.getRowModel().rows.map(row => (
                    <DataTable.Row key={row.id}>
                      <DataTable.Cell>
                        {row.original.invoiceNumber}
                      </DataTable.Cell>
                      <DataTable.Cell>{row.original.dueDate}</DataTable.Cell>
                      <DataTable.Cell>{row.original.status}</DataTable.Cell>
                      <DataTable.Cell>{row.original.subject}</DataTable.Cell>
                      <DataTable.Cell>
                        <Text align="end">
                          ${row.original.total.toLocaleString()}.00
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable.Body>
                <DataTable.Footer>
                  <DataTable.Row>
                    <DataTable.Cell colSpan={4}>
                      <Text>Subtotal</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Text align="end">
                        ${pageSubtotal.toLocaleString()}.00
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell colSpan={4}>
                      <Typography fontWeight="bold">Total</Typography>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Typography fontWeight="bold" align="end">
                        ${totalAmount.toLocaleString()}.00
                      </Typography>
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable.Footer>
              </DataTable.Table>
              <DataTable.Pagination>
                <Cluster justify="space-between" align="center">
                  <Text>
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </Text>
                  <Cluster gap="small">
                    <DataTable.PaginationButton
                      direction="previous"
                      disabled={!table.getCanPreviousPage()}
                      onClick={() => table.previousPage()}
                      ariaLabel={() => "Previous page"}
                    />
                    <DataTable.PaginationButton
                      direction="next"
                      disabled={!table.getCanNextPage()}
                      onClick={() => table.nextPage()}
                      ariaLabel={() => "Next page"}
                    />
                  </Cluster>
                </Cluster>
              </DataTable.Pagination>
            </DataTable.Container>
          </section>

          {/* Sortable Headers */}
          <section>
            <Text size="large">Sortable Headers</Text>
            <DataTable.Container>
              <DataTable.Table>
                <DataTable.Header>
                  {sortableTable.getHeaderGroups().map(headerGroup =>
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
                        {header.column.columnDef.header as string}
                      </DataTable.SortableHeader>
                    )),
                  )}
                </DataTable.Header>
                <DataTable.Body>
                  {sortableTable.getRowModel().rows.map(row => (
                    <DataTable.Row key={row.id}>
                      <DataTable.Cell>
                        <Typography fontWeight="bold">
                          {row.original.name}
                        </Typography>
                      </DataTable.Cell>
                      <DataTable.Cell>{row.original.role}</DataTable.Cell>
                      <DataTable.Cell>{row.original.email}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable.Body>
              </DataTable.Table>
            </DataTable.Container>
          </section>

          {/* Pagination Only */}
          <section>
            <Text size="large">Pagination Only (Border Top Test)</Text>
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
              <DataTable.Pagination>
                <Cluster justify="space-between" align="center">
                  <Text>Showing 4 of 4 items</Text>
                  <Cluster gap="small">
                    <DataTable.PaginationButton
                      direction="previous"
                      disabled={true}
                      onClick={() => undefined}
                      ariaLabel={() => "Previous page"}
                    />
                    <DataTable.PaginationButton
                      direction="next"
                      disabled={true}
                      onClick={() => undefined}
                      ariaLabel={() => "Next page"}
                    />
                  </Cluster>
                </Cluster>
              </DataTable.Pagination>
            </DataTable.Container>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
