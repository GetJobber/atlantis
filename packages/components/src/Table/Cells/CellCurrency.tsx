import React from "react";
import { formatConfig, formatCurrency, CurrencyType } from "@jobber/formatters";
import { CellNumericProps, CellNumeric } from "./CellNumeric";

interface CellCurrencyProps extends CellNumericProps {
  value: number;
  currency?: CurrencyType;
}

export function CellCurrency({
  value,
  currency = formatConfig.currency,
}: CellCurrencyProps) {
  return <CellNumeric value={formatCurrency(value, currency)} />;
}
