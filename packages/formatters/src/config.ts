import { CurrencyType } from "./CurrencyType";
import { global } from "./global";

interface AtlantisConfig {
  readonly defaultCurrency?: CurrencyType;
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
}

(window as any).ATLANTIS_ENV = { config: { defaultCurrency: "GBP" } };

const configOverrides =
  ((global as { ATLANTIS_ENV: AtlantisEnv }).ATLANTIS_ENV || {}).config || {};

export const config: Configuration = Object.freeze({
  defaultCurrency: "USD",
  ...configOverrides,
});
