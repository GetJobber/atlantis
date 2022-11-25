import React from "react";
import { Table, flexRender } from "@tanstack/react-table";
import styles from "./Footer.css";

export type ViewType = "desktop" | "handheld";

export interface FooterProps<T> {
  table: Table<T>;
  viewType?: ViewType;
}

interface ViewProps<T> {
  table: Table<T>;
}

const DesktopView = <T extends object>({ table }: ViewProps<T>) => (
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

const HandheldView = <T extends object>({ table }: ViewProps<T>) => (
  <div
    className={styles.mobileFooterContainer}
    data-testid="data-table-handheld-footer"
  >
    {table.getFooterGroups().map(footerGroup => (
      <div key={footerGroup.id}>
        {footerGroup.headers
          .filter(header => header.column.columnDef.footer)
          .map((header, index) => (
            <>
              {index === 0 ? (
                <div className={styles.mobileFooterRow}>
                  {flexRender(
                    header.column.columnDef.footer,
                    header.getContext(),
                  )}
                </div>
              ) : (
                <div className={styles.mobileFooterRow} key={footerGroup.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  <div className={styles.mobileFooterRowData}>
                    {flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
                  </div>
                </div>
              )}
            </>
          ))}
      </div>
    ))}
  </div>
);

export const Footer = <T extends object>({
  table,
  viewType = "handheld",
}: FooterProps<T>) => {
  const hasFooter = table
    .getAllColumns()
    .find(column => column.columnDef.footer);

  if (hasFooter) {
    return viewType === "handheld" ? (
      <HandheldView table={table} />
    ) : (
      <DesktopView table={table} />
    );
  }

  return null;
};
