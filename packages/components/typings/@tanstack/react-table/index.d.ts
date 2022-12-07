/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import * as _tanstack_table_core from "@tanstack/table-core";
import { RowData, TableOptions } from "@tanstack/table-core";

export * from "@tanstack/table-core";

declare module "@tanstack/react-table" {
  type Renderable<TProps> = React.ReactNode | React.ComponentType<TProps>;
  function flexRender<TProps extends object>(
    Comp: Renderable<TProps>,
    props: TProps,
  ): React.ReactNode | JSX.Element;
  function useReactTable<TData extends RowData>(
    options: TableOptions<TData>,
  ): _tanstack_table_core.Table<TData>;
}
