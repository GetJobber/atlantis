import React, { useCallback, useMemo } from "react";
import classNames from "./CalendarDatePickerHeader.css";
import { Button } from "../../Button";
import { Typography } from "../../Typography";
import { addMonths } from "../utils";

interface CaleanderDatePickerHeaderProps {
  readonly month: number;
  readonly year: number;
  readonly onChange?: (date: Date) => void;
  readonly translations?: {
    readonly previousMonth?: string;
    readonly nextMonth?: string;
  };
}

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
        icon="arrowLeft"
        ariaLabel={translations?.previousMonth || "Previous month"}
        onClick={onPreviousMonth}
      />
      <Button
        type="tertiary"
        icon="arrowRight"
        ariaLabel={translations?.nextMonth || "Next month"}
        onClick={onNextMonth}
      />
    </div>
  );
};
