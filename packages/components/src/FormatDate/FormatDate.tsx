import React from "react";
import { AtlantisTemporalPlainDate } from "../types";

interface FormatDateProps<T extends AtlantisTemporalPlainDate | Date | string> {
  /**
   * Date to be formatted.
   *
   * A `string` should be an ISO 8601 format date string.
   */
  readonly date: T;
}

export function FormatDate<
  T extends AtlantisTemporalPlainDate | Date | string,
>({ date: inputDate }: FormatDateProps<T>) {
  let dateObject: Date;

  if (inputDate instanceof Date) {
    dateObject = inputDate;
  } else if (typeof inputDate === "string") {
    dateObject = new Date(inputDate);
  } else {
    dateObject = new Date(inputDate.year, inputDate.month - 1, inputDate.day);
  }

  return <>{strFormatDate(dateObject)}</>;
}

export function strFormatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
