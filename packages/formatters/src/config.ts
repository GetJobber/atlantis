import { CurrencyType } from "./currency";

interface Configuration {
  currency: CurrencyType;
}

export const formatConfig: Configuration = {
  currency: "USD",
};

export function overrideConfiguration(override: Configuration) {
  Object.assign(formatConfig, override);
}
