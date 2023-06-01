import React from "react";
import { CivilDate } from "@std-proposal/temporal";

interface FormatDateProps {
  /**
   * Date to be formatted.
   *
   * A `string` should be an ISO 8601 format date string.
   */
  readonly date: CivilDate | Date | string;

  /**
   * Boolean to show year or not.
   */
  readonly showYear?: boolean;
}

interface formatOptions {
  readonly month: "short";
  readonly day: "numeric";
  readonly year?: "numeric";
}

export function FormatDate({
  date: inputDate,
  showYear = true,
}: FormatDateProps) {
  let dateObject: Date;

  if (inputDate instanceof Date) {
    dateObject = inputDate;
  } else if (typeof inputDate === "string") {
    dateObject = new Date(inputDate);
  } else {
    dateObject = new Date(inputDate.year, inputDate.month - 1, inputDate.day);
  }

  return <>{strFormatDate(dateObject, showYear)}</>;
}

export function strFormatDate(date: Date, showYear = true) {
  let formatOptions: formatOptions = {
    month: "short",
    day: "numeric",
  };
  if (showYear) {
    formatOptions = {
      ...formatOptions,
      year: "numeric",
    };
  }
  return date.toLocaleDateString(undefined, formatOptions);
}
