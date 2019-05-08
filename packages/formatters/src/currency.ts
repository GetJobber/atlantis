import { config } from "./config";
import { CurrencyType } from "./CurrencyType";

export function formatCurrency(
  amount: number,
  currency: CurrencyType = config.defaultCurrency,
) {
  return amount.toLocaleString("en", {
    style: "currency",
    currency: currency,
  });
}
