import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../Checkbox";

export const selectionColumnDefinition: ColumnDef<unknown> = {
  id: "select",
  header: ({ table }) => (
    <Checkbox
      version={2}
      checked={table.getIsAllRowsSelected()}
      indeterminate={table.getIsSomeRowsSelected()}
      onChange={(_, event) => table.getToggleAllRowsSelectedHandler()(event)}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      version={2}
      checked={row.getIsSelected()}
      indeterminate={row.getIsSomeSelected()}
      disabled={!row.getCanSelect()}
      onChange={(_, event) => row.getToggleSelectedHandler()(event)}
    />
  ),
};
