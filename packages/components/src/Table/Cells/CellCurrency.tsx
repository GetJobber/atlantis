import React from "react";
import type { CurrencyType } from "@jobber/formatters";
import { formatCurrency } from "@jobber/formatters";
import type { CellNumericProps } from "./CellNumeric";
import { CellNumeric } from "./CellNumeric";

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
