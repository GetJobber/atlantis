import React from "react";
import styles from "./MonthlySelect.css";
import { DurationPeriod } from "../types";
import { RadioGroup, RadioOption } from "../../RadioGroup";

interface MonthlySelectProps {
  readonly disabled: boolean;
  readonly selectedMonthOption:
    | DurationPeriod.DayOfMonth
    | DurationPeriod.WeekDayOfMonth;
  onChange(
    type: DurationPeriod.DayOfMonth | DurationPeriod.WeekDayOfMonth,
  ): void;
}

export function MonthlySelect({
  disabled,
  onChange,
  selectedMonthOption,
}: MonthlySelectProps) {
  return (
    <div className={styles.radioContainer}>
      <RadioGroup
        ariaLabel="Monthly Frequency Selector"
        onChange={onChange}
        value={selectedMonthOption}
      >
        <RadioOption
          disabled={disabled}
          value={DurationPeriod.DayOfMonth}
          label="Day of month"
        />
        <RadioOption
          disabled={disabled}
          value={DurationPeriod.WeekDayOfMonth}
          label="Day of week"
        />
      </RadioGroup>
    </div>
  );
}
