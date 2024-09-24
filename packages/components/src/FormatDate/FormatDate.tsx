import React from "react";

interface FormatDateProps {
  /**
   * Date to be formatted.
   *
   * A `string` should be an ISO 8601 format date string.
   */
  readonly date: Date | string;

  /**
   * Boolean to show year or not.
   */
  readonly showYear?: boolean;
}

export function FormatDate({
  date: inputDate,
  showYear = true,
}: FormatDateProps) {
  let dateObject: Date;

  if (inputDate instanceof Date) {
    dateObject = inputDate;
  } else {
    dateObject = new Date(inputDate);
  }

  return <>{strFormatDate(dateObject, showYear)}</>;
}

export function strFormatDate(date: Date, showYear = true) {
  let formatOptions: Intl.DateTimeFormatOptions = {
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
