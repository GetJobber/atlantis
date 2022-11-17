import React from "react";
import { Table, flexRender } from "@tanstack/react-table";
import styles from "./Footer.css";
import { Typography } from "../Typography";

export type ViewType = "desktop" | "handheld";

export interface FooterProps<T> {
  table: Table<T>;
  viewType?: ViewType;
}

interface ViewProps<T> {
  table: Table<T>;
}

const DesktopView = <T extends object>({ table }: ViewProps<T>) => (
  <tfoot>
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
  <div className={styles.mobileFooterContainer}>
    {table.getFooterGroups().map(footerGroup => (
      <div key={footerGroup.id}>
        {footerGroup.headers
          .filter(header => header.column.columnDef.footer)
          .map((header, index) => (
            <>
              {index === 0 ? (
                <div className={styles.mobileFooterRow}>
                  <Typography fontWeight="bold" key={header.id}>
                    {header.column.columnDef.footer}
                  </Typography>
                </div>
              ) : (
                <div className={styles.mobileFooterRow} key={footerGroup.id}>
                  <Typography fontWeight="bold" key={header.id}>
                    {header.column.columnDef.header}
                  </Typography>
                  <Typography key={header.id}>
                    {header.column.columnDef.footer}
                  </Typography>
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
  return viewType === "handheld" ? (
    <HandheldView table={table} />
  ) : (
    <DesktopView table={table} />
  );
};
