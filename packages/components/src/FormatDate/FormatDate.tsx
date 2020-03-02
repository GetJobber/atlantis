import React from "react";
import { CivilDate } from "@std-proposal/temporal";

interface FormatDateProps {
  /**
   * Date to be displayed.
   */
  readonly date: CivilDate;
}

export function FormatDate(date: FormatDateProps) {
  return <>{strFormatDate(date.date)}</>;
}

function strFormatDate({ year, month, day }: CivilDate) {
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
