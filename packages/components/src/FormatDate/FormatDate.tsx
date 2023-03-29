import React from "react";
import { Temporal } from "@js-temporal/polyfill";
import { CivilDate } from "@std-proposal/temporal";

interface FormatDateProps {
  /**
   * Date to be formatted.
   *
   * A `string` should be an ISO 8601 format date string.
   */
  readonly date: Temporal.PlainDateTime | CivilDate | Date | string;
}

export function FormatDate({ date: inputDate }: FormatDateProps) {
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
