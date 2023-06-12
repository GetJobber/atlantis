import { isValid } from "date-fns";
import { enUS } from "date-fns/locale";
import { format } from "date-fns-tz";

export function accountFormattedDate(
  date: Date,
  accountFormat: string,
  timeZone: string | undefined,
): string {
  if (!isValid(date)) {
    return "";
  }

  // must take into account the timezone before obtaining
  // any of the day/month/year values
  const formattedDate = format(date, "dd|MM|MMM|y", {
    locale: enUS,
    timeZone: timeZone,
  });
  const [dd, MM, MMM, y] = formattedDate.split("|");

  if (accountFormat === "%m/%d/%Y") {
    return `${MM}/${dd}/${y}`; // 09/30/1992
  } else if (accountFormat === "%d/%m/%Y") {
    return `${dd}/${MM}/${y}`; // 30/09/1992
  } else if (accountFormat === "%Y-%m-%d") {
    return `${y}-${MM}-${dd}`; // 1992-09-30
  } else {
    return `${MMM} ${dd}, ${y}`; // Sep 30, 1992
  }
}

/***
 * Returns a date in "MMM dd" format (e.g. July 01), using the provided timezone
 */
export function shortFormattedDate(date: Date, timeZone?: string): string {
  if (!isValid(date)) {
    return "";
  }

  return format(date, "MMM dd", { locale: enUS, timeZone: timeZone });
}

/**
 *
 * @param date
 * Returns a date in true utc time with the timezone offset
 * @returns Date
 */
export function convertDateToUTC(date: Date): Date {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds(),
    ) +
      date.getTimezoneOffset() * 60 * 1000,
  );
}
