import React from "react";
import { Table } from "@tanstack/react-table";
import { Glimmer } from "../Glimmer";

interface BodyLoadingProps<T> {
  readonly table: Table<T>;
}

export function BodyLoading<T extends object>({ table }: BodyLoadingProps<T>) {
  const loaderRows = table.getState().pagination.pageSize;
  const loaderColumns = table.getAllColumns().length;

  return (
    <tbody>
      {Array.from(Array(loaderRows).keys()).map(row => (
        <tr key={row}>
          {Array.from(Array(loaderColumns).keys()).map(arr => (
            <td key={arr}>
              <Glimmer />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
