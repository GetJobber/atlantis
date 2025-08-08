import React, { type PropsWithChildren } from "react";
import classNames from "classnames";

export function DataTableBody(
  props: PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>,
) {
  return (
    <tbody className={classNames(props.className)} {...props}>
      {props.children}
    </tbody>
  );
}
