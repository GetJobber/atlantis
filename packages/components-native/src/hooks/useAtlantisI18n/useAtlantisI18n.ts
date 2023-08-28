import { useCallback } from "react";
import en from "./locales/en.json";
import es from "./locales/es.json";
import { dateFormatter } from "./utils/dateFormatter";
import { useAtlantisContext } from "../../AtlantisContext";

export interface useAtlantisI18nValue {
  /**
   * The set locale based on the AtlantisContext.
   */
  readonly locale: string;

  /**
   * Returns the translated string depending on the locale. This accepts a 2nd
   * param for string interpolation.
   */
  readonly t: (
    message: keyof typeof en,
    values?: Record<string, string>,
  ) => string;

  /**
   * Returns a formatted date string based on the locale and the `dateFormat`
   * set in AtlantisContext.
   */
  readonly formatDate: (date: Date) => string;

  /**
   * Returns a formatted time string based on the locale and the `timeFormat`
   * set in AtlantisContext.
   */
  readonly formatTime: (date: Date) => string;
}

export function useAtlantisI18n(): useAtlantisI18nValue {
  const { locale, dateFormat, timeFormat, timeZone } = useAtlantisContext();

  const t = useCallback(
    (messageKey: keyof typeof en, values?: Record<string, string>) =>
      formatMessage(messageKey, values, locale),
    [formatMessage, locale],
  );

  const formatDate = useCallback(
    (date: Date) => dateFormatter(date, dateFormat, { locale, timeZone }),
    [dateFormatter, locale],
  );

  const formatTime = useCallback(
    (date: Date) => dateFormatter(date, timeFormat, { locale, timeZone }),
    [dateFormatter, locale],
  );

  return { locale, t, formatDate, formatTime };
}

function getLocalizedStrings(locale: string): typeof en {
  switch (locale) {
    case "es":
      return es;
    default:
      return en;
  }
}

function formatMessage(
  messageKey: keyof typeof en,
  values?: Record<string, string>,
  locale = "en",
) {
  const message = getLocalizedStrings(locale)[messageKey];

  if (!values) return message;

  return Object.entries(values).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, value),
    message,
  );
}
