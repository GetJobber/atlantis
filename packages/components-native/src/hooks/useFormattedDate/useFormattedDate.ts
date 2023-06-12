import { formatInTimeZone } from "date-fns-tz";
import { useAtlantisContext } from "../../AtlantisContext";
import {
  AtlantisDateFormat,
  accountFormattedDate,
  shortFormattedDate,
} from "../../utils/format/date";

export type DateFormat = "accountFormat" | "shorthand" | "ISO8601" | undefined;

function formatDate(
  date: Date,
  format: DateFormat,
  accountTimeZoneName: string,
  accountDateFormat: AtlantisDateFormat,
) {
  if (format === "shorthand") {
    return shortFormattedDate(date, accountTimeZoneName);
  } else if (format === "ISO8601") {
    return formatInTimeZone(date, accountTimeZoneName, "yyyy-MM-dd");
  } else {
    return accountFormattedDate(date, accountDateFormat, accountTimeZoneName);
  }
}

export type FormattedDateShape = (date: Date, format: DateFormat) => string;

export function useFormattedDate(): FormattedDateShape {
  const { timeZone, dateFormat } = useAtlantisContext();
  return (date: Date, format: DateFormat) =>
    formatDate(date, format, timeZone, dateFormat);
}
