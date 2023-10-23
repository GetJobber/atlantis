import React, { useCallback, useMemo } from "react";
import combineClassNames from "classnames";
import { Heading } from "@jobber/components/Heading";
import classNames from "./CalendarDatePickerHeader.css";
import { Button } from "../../Button";
import { Typography } from "../../Typography";
import { addMonths } from "../utils";

interface CaleanderDatePickerHeaderProps {
  readonly month: number;
  readonly year: number;
  readonly onChange?: (date: Date) => void;
  readonly alternate?: boolean;
  readonly translations?: {
    readonly previousMonth?: string;
    readonly nextMonth?: string;
  };
}

export const CalendarDatePickerHeader = ({
  onChange,
  month,
  year,
  alternate,
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
    <div
      className={combineClassNames(
        classNames.container,
        alternate ? classNames.alternate : undefined,
      )}
    >
      <div className={classNames.label} aria-live="polite">
        {alternate ? (
          <Heading level={3}>{formatter.format(date)}</Heading>
        ) : (
          <Typography fontWeight="semiBold">
            {formatter.format(date)}
          </Typography>
        )}
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
