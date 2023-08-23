import en from "./locales/en.json";
import es from "./locales/es.json";

export const messages: Record<string, typeof en | typeof es> = { en, es };
