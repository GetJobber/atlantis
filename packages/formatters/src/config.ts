import { CurrencyType } from "./CurrencyType";
import { global } from "./global";

export type ErrorNotifierFunction = (message: string, error: unknown) => void;

interface AtlantisConfig {
  readonly defaultCurrency?: CurrencyType;
  readonly errorNotifier?: ErrorNotifierFunction;
}

interface AtlantisEnv {
  readonly config?: AtlantisConfig;
}

declare global {
  interface Window {
    ATLANTIS_ENV?: AtlantisEnv;
  }
}

interface Configuration {
  readonly defaultCurrency: CurrencyType;
  readonly errorNotifier: ErrorNotifierFunction;
}

const configOverrides =
  ((global as { ATLANTIS_ENV: AtlantisEnv }).ATLANTIS_ENV || {}).config || {};

export const config: Configuration = Object.freeze({
  defaultCurrency: "USD",
  errorNotifier(message: string, error: unknown) {
    console.error(message, error);
  },
  ...configOverrides,
});
