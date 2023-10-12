import React from "react";
import { CurrencyType, formatCurrency } from "@jobber/formatters";
import { CellNumeric, CellNumericProps } from "./CellNumeric";

interface CellCurrencyProps extends CellNumericProps {
  readonly value: number;
  readonly currency?: CurrencyType;
}

export function CellCurrency({
  value,
  currency = undefined,
}: CellCurrencyProps) {
  return <CellNumeric value={formatCurrency(value, currency)} />;
}
