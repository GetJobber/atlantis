import React, { useMemo } from "react";

interface FormatRelativeDateTimeProps {
  /**
   * Date to be displayed.
   *
   * A `string` should be an ISO 8601 format date string.
   */
  readonly date: Date | string;

  /**
   * Whether to show the date and time on day rollover.
   */
  readonly showDateAndTimeOnDayRollover?: boolean;

  /**
   * Whether to display the date and time in Jobber format.
   */
  readonly inJobberFormat?: boolean;
}

export function useFormatRelativeDateTime({
  date: inputDate,
  showDateAndTimeOnDayRollover = false,
  inJobberFormat = false,
}: FormatRelativeDateTimeProps) {
  let dateObject: Date;

  if (inputDate instanceof Date) {
    dateObject = inputDate;
  } else {
    dateObject = new Date(inputDate);
  }

  const now = Date.now() / 1000; //seconds
  const today = new Date();
  const date = dateObject;
  const delta = now - date.getTime() / 1000; //seconds;
  const additionalOptions: object =
    showDateAndTimeOnDayRollover && today.getDate() !== date.getDate()
      ? { weekday: "short", hour: "numeric", minute: "numeric" }
      : {};

  return useMemo(() => {
    switch (relativeTimeRange(delta)) {
      case "less than an hour":
        return showMinutes(Math.round(delta / 60));
      case "less then a day":
        return inJobberFormat
          ? formatTimeToJobberFormat(
              date.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "numeric",
                ...additionalOptions,
              }),
              false,
              true,
            )
          : date.toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "numeric",
              ...additionalOptions,
            });
        break;
      case "less than a week":
        return inJobberFormat
          ? formatTimeToJobberFormat(
              strFormatDate(date, { weekday: "short", ...additionalOptions }),
              true,
              true,
            )
          : strFormatDate(date, { weekday: "short", ...additionalOptions });
      case "less than a year":
        return inJobberFormat
          ? formatTimeToJobberFormat(
              strFormatDate(date, {
                month: "short",
                day: "numeric",
                ...additionalOptions,
              }),
            )
          : strFormatDate(date, {
              month: "short",
              day: "numeric",
              ...additionalOptions,
            });
      default:
        return strFormatDate(date, {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
    }
  }, [delta, date, additionalOptions, inJobberFormat]);
}

export function FormatRelativeDateTime({
  date: inputDate,
  showDateAndTimeOnDayRollover = false,
  inJobberFormat = false,
}: FormatRelativeDateTimeProps) {
  const date = useFormatRelativeDateTime({
    date: inputDate,
    showDateAndTimeOnDayRollover,
    inJobberFormat,
  });

  return <>{date}</>;
}

function relativeTimeRange(delta: number) {
  delta = delta / 60;
  if (delta < 60) return "less than an hour";

  delta = delta / 60;
  if (delta < 24) return "less then a day";

  delta = delta / 24;
  if (delta < 7) return "less than a week";

  delta = delta / 365;
  if (delta < 1) return "less than a year";

  return "a year or more";
}

function formatTimeToJobberFormat(
  dateTimeString: string,
  replaceComma: boolean = true,
  addComma: boolean = false,
) {
  let formatted = dateTimeString.replace(/\s(a\.m\.|p\.m\.)/i, match =>
    match.toUpperCase().replace(/\./g, ""),
  );

  if (replaceComma) {
    formatted = formatted.replace(
      /(\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)),\s/g,
      "$1 ",
    );
  }

  if (addComma) {
    formatted = formatted.replace(
      /(\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun))\s/g,
      "$1, ",
    );
  }

  return formatted;
}

function strFormatDate(date: Date, options: { [key: string]: string }) {
  return date.toLocaleDateString(undefined, options);
}

function showMinutes(minutes: number) {
  if (minutes <= 1) {
    return "1 minute ago";
  } else {
    return minutes + " minutes ago";
  }
}
