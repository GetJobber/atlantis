import React from "react";
import {
  DayOfMonthSelect,
  MonthlyDayOfWeekSelect,
  WeeklySelect,
} from "./components";
import {
  DayOfMonth,
  DurationPeriod,
  RecurrenceRule,
  RecurrenceRuleWeekDayOfMonth,
  WeekDay,
} from "./types";

interface RecurringSelectProps {
  readonly disabled?: boolean;
  readonly recurrenceRule: RecurrenceRule;
  onChange(newRecurrence: RecurrenceRule): void;
}

export function CurrentRecurrenceComponent({
  recurrenceRule,
  disabled = false,
  onChange,
}: RecurringSelectProps) {
  switch (recurrenceRule.type) {
    case DurationPeriod.Week: {
      const onChangeWeekDays = (next: Set<WeekDay>): void => {
        onChange({
          ...recurrenceRule,
          weekDays: next,
        });
      };

      return (
        <WeeklySelect
          disabled={disabled}
          selectedDays={recurrenceRule.weekDays}
          onChange={onChangeWeekDays}
        />
      );
    }

    case DurationPeriod.WeekDayOfMonth: {
      const onChangeWeekDayOfMonth = (
        next: RecurrenceRuleWeekDayOfMonth["dayOfWeek"],
      ): void => {
        onChange({
          ...recurrenceRule,
          dayOfWeek: next,
        });
      };

      return (
        <MonthlyDayOfWeekSelect
          disabled={disabled}
          onChange={onChangeWeekDayOfMonth}
          selectedWeeks={recurrenceRule.dayOfWeek}
        />
      );
    }

    case DurationPeriod.DayOfMonth: {
      const onChangeDayOfMonth = (next: Set<DayOfMonth>): void => {
        onChange({
          ...recurrenceRule,
          date: next,
        });
      };

      return (
        <DayOfMonthSelect
          disabled={disabled}
          selectedDays={recurrenceRule.date}
          onChange={onChangeDayOfMonth}
        />
      );
    }

    default:
      return <></>;
  }
}
