import en from "./locales/en.json";
import es from "./locales/es.json";
import { useAtlantisContext } from "../../AtlantisContext";

interface useAtlantisI18nValue {
  readonly t: typeof en;
  readonly locale: string;
}

export function useAtlantisI18n(): useAtlantisI18nValue {
  const { locale } = useAtlantisContext();
  const t = getLocalizedStrings(locale);

  return { t, locale };
}

function getLocalizedStrings(locale: string) {
  switch (locale) {
    case "es":
      return es;
    default:
      return en;
  }
}
