import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "@jobber/components/DataTable";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";

const meta: Meta = {
  title: "Components/DataTable/Actions",
  parameters: {
    docs: {
      description: {
        component:
          "This example shows how row actions appear on hover using the atomic DataTable components with proper state management.",
      },
    },
  },
};

export default meta;

interface Person {
  id: string;
  name: string;
  status: string;
}

const DATA: Person[] = [
  { id: "1", name: "John Doe", status: "Active" },
  { id: "2", name: "Jane Smith", status: "Inactive" },
  { id: "3", name: "Bob Johnson", status: "Active" },
];

export const HoverRowActions: Story = () => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const columns: ColumnDef<Person>[] = [
    {
      accessorKey: "name",
      cell: ({ getValue }) => {
        const name = getValue<string>();

        return (
          <DataTable.Cell>
            <Text>{name}</Text>
          </DataTable.Cell>
        );
      },
      header: () => <DataTable.HeaderCell>Name</DataTable.HeaderCell>,
    },
    {
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue<string>();

        return (
          <DataTable.Cell>
            <Text>{status}</Text>
          </DataTable.Cell>
        );
      },
      header: () => <DataTable.HeaderCell>Status</DataTable.HeaderCell>,
    },
  ];

  const table = useReactTable({
    columns,
    data: DATA,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <DataTable.Table>
        <DataTable.Header>
          {table.getHeaderGroups().map(headerGroup => (
            <React.Fragment key={headerGroup.id}>
              {headerGroup.headers.map(header =>
                flexRender(header.column.columnDef.header, header.getContext()),
              )}
            </React.Fragment>
          ))}
        </DataTable.Header>
        <DataTable.TableBody>
          {table.getRowModel().rows.map(row => (
            <DataTable.Row
              key={row.id}
              onMouseEnter={() => setHoveredRow(row.original.id)}
              onMouseLeave={() => setHoveredRow(null)}
              onClick={() => console.log(`Clicked row ${row.original.name}`)}
            >
              {row
                .getVisibleCells()
                .map(cell =>
                  flexRender(cell.column.columnDef.cell, cell.getContext()),
                )}

              {hoveredRow === row.original.id && (
                <DataTable.RowActions>
                  <Button
                    icon="checkmark"
                    ariaLabel="Complete"
                    type="secondary"
                    variation="subtle"
                    onClick={() =>
                      console.log(`Clicked complete for ${row.original.name}`)
                    }
                  />
                  <Button
                    icon="edit"
                    ariaLabel="Edit"
                    type="secondary"
                    variation="subtle"
                    onClick={() =>
                      console.log(`Clicked Edit for ${row.original.name}`)
                    }
                  />
                </DataTable.RowActions>
              )}
            </DataTable.Row>
          ))}
        </DataTable.TableBody>
      </DataTable.Table>
    </div>
  );
};

HoverRowActions.storyName = "Hover Row Actions";
