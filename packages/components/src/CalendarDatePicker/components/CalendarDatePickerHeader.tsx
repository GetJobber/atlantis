import React, { useCallback, useMemo } from "react";
import { Button } from "@jobber/components/Button";
// eslint-disable-next-line no-restricted-imports
import { Typography } from "@jobber/components/Typography";
import classNames from "./CalendarDatePickerHeader.css";
import { addMonths } from "../utils";

type CaleanderDatePickerHeaderProps = Readonly<{
  month: number;
  year: number;
  onChange?: (date: Date) => void;
  translations?: Readonly<{
    "Previous month"?: string;
    "Next month"?: string;
  }>;
}>;

export const CalendarDatePickerHeader = ({
  onChange,
  month,
  year,
  translations,
}: CaleanderDatePickerHeaderProps) => {
  const date = useMemo(() => new Date(year, month, 1), [year, month]);

  const formatter = new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "long",
  });

  const onPreviousMonth = useCallback(() => {
    onChange?.(addMonths(date, -1));
  }, [onChange, date]);

  const onNextMonth = useCallback(() => {
    onChange?.(addMonths(date, 1));
  }, [onChange, date]);

  return (
    <div className={classNames.container}>
      <div className={classNames.label} aria-live="polite">
        <Typography fontWeight="semiBold">{formatter.format(date)}</Typography>
      </div>
      <Button
        type="tertiary"
        variation="subtle"
        icon="arrowLeft"
        ariaLabel={translations?.["Previous month"] || "Previous month"}
        onClick={onPreviousMonth}
      />
      <Button
        type="tertiary"
        variation="subtle"
        icon="arrowRight"
        ariaLabel={translations?.["Next month"] || "Next month"}
        onClick={onNextMonth}
      />
    </div>
  );
};
