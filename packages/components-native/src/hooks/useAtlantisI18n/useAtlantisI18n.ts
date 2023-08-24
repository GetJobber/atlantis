import en from "./locales/en.json";
import es from "./locales/es.json";
import { useAtlantisContext } from "../../AtlantisContext";

export const localizedStrings = { en, es };

interface useAtlantisI18nValue {
  readonly locale: string;
  readonly t: (
    message: keyof typeof en,
    values?: Record<string, string>,
  ) => string;
}

export function useAtlantisI18n(): useAtlantisI18nValue {
  const { locale } = useAtlantisContext();
  const t = (messageKey: keyof typeof en, values?: Record<string, string>) =>
    formatMessage(messageKey, values, locale);

  return { locale, t };
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
