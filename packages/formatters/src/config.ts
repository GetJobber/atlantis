import { CurrencyType } from "./currency";

interface AtlantisConfig {
  readonly defaultCurrency?: CurrencyType;
}

interface AtlantisEnv {
  readonly config?: AtlantisConfig;
}

interface Configuration {
  readonly defaultCurrency: CurrencyType;
}

declare global {
  interface Window {
    ATLANTIS_ENV: AtlantisEnv;
  }
}

const configOverrides = (window.ATLANTIS_ENV || {}).config || {};

export const config: Configuration = Object.freeze({
  ...{
    defaultCurrency: "USD",
  },
  ...configOverrides,
});
