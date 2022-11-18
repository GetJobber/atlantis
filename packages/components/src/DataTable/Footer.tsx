import React from "react";
import { ColumnDef, Table, flexRender } from "@tanstack/react-table";
import styles from "./Footer.css";
import { Typography } from "../Typography";

export type ViewType = "desktop" | "handheld";

export interface FooterProps<T> {
  table: Table<T>;
  viewType?: ViewType;
}

interface DesktopViewProps<T> {
  table: Table<T>;
}

interface HandheldViewProps<T> {
  columns: ColumnDef<T>[];
}

const DesktopView = <T extends object>({ table }: DesktopViewProps<T>) => (
  <tfoot data-testid="data-table-desktop-footer">
    {table.getFooterGroups().map(footerGroup => (
      <tr key={footerGroup.id}>
        {footerGroup.headers.map(header => (
          <th key={header.id}>
            {flexRender(header.column.columnDef.footer, header.getContext())}
          </th>
        ))}
      </tr>
    ))}
  </tfoot>
);

const HandheldView = <T extends object>({ columns }: HandheldViewProps<T>) => (
  <div
    className={styles.mobileFooterContainer}
    data-testid="data-table-handheld-footer"
  >
    {columns.map((column, index) => (
      <div key={column.id}>
        {index === 0 ? (
          <div className={styles.mobileFooterRow}>
            <Typography fontWeight="bold">{column.footer}</Typography>
          </div>
        ) : (
          <div className={styles.mobileFooterRow}>
            <Typography fontWeight="bold">{column.header}</Typography>
            <Typography>{column.footer}</Typography>
          </div>
        )}
      </div>
    ))}
  </div>
);

export const Footer = <T extends object>({
  table,
  viewType = "handheld",
}: FooterProps<T>) => {
  const columnsWithFooter = table
    ._getColumnDefs()
    .filter(column => column.footer);

  if (columnsWithFooter.length > 0) {
    return viewType === "handheld" ? (
      <HandheldView columns={columnsWithFooter} />
    ) : (
      <DesktopView table={table} />
    );
  }

  return null;
};
