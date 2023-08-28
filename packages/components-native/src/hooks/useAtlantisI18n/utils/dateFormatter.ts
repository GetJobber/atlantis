import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { enUS, es } from "date-fns/locale";

interface DateFormatterOptions {
  readonly locale: string;
  readonly timeZone: string;
}

export function dateFormatter(
  date: Date,
  dateTimeFormat: string,
  { locale, timeZone }: DateFormatterOptions,
): string {
  const zonedTime = utcToZonedTime(date, timeZone);
  return format(zonedTime, dateTimeFormat, {
    locale: getDateFnsLocale(locale),
  });
}

/**
 * Change locale string to date-fns locale object.
 */
function getDateFnsLocale(locale?: string): Locale {
  switch (locale) {
    case "es":
      return es;
    default:
      return enUS;
  }
}
