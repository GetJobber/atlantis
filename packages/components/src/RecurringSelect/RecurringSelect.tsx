import React from "react";
import {
  DayOfMonthSelect,
  MonthlyDayOfWeekSelect,
  MonthlySelect,
  WeeklySelect,
} from "./components";
import styles from "./RecurringSelect.css";
import {
  DayOfMonth,
  DurationPeriod,
  RecurrenceRule,
  RecurrenceRuleWeekDayOfMonth,
  WeekDay,
  isMonthly,
  typeInitialStateMap,
} from "./types";
import { Option, Select } from "../Select";
import { InputNumber } from "../InputNumber";
import { InputGroup } from "../InputGroup";
import { Content } from "../Content";
import { Text } from "../Text";

interface RecurringSelectProps {
  disabled?: boolean;
  recurrenceRule: RecurrenceRule;
  onChange(next: RecurrenceRule): void;
}

export function RecurringSelect({
  recurrenceRule,
  disabled = false,
  onChange,
}: RecurringSelectProps) {
  const currentRecurrenceComponent = getCurrentComponent(
    recurrenceRule,
    onChange,
    disabled,
  );
  const disabledTextVariation = disabled ? "disabled" : undefined;
  // we must dynamically populate the select option based on which is selected
  // because there is no single "month" option, it must always be one of these two
  const monthlySelectOption =
    recurrenceRule.type === DurationPeriod.WeekDayOfMonth ? (
      <Option value={DurationPeriod.WeekDayOfMonth}>Month(s)</Option>
    ) : (
      <Option value={DurationPeriod.DayOfMonth}>Month(s)</Option>
    );
  const hasExtraFrequencyDescriptor =
    recurrenceRule.type === DurationPeriod.WeekDayOfMonth ||
    recurrenceRule.type === DurationPeriod.DayOfMonth ||
    recurrenceRule.type === DurationPeriod.Week;

  return (
    <Content>
      <div className={styles.container}>
        <Text variation={disabledTextVariation}>Every</Text>
        <div className={styles.fullWidthWrapper}>
          <InputGroup flowDirection="horizontal">
            <InputNumber
              disabled={disabled}
              name="schedule-recurrence-interval"
              value={recurrenceRule.interval}
              min={1}
              maxLength={3}
              onChange={onChangeInterval}
            />

            <Select
              disabled={disabled}
              value={recurrenceRule.type}
              onChange={onChangeType}
              name="schedule-recurrence-type"
            >
              <Option value={DurationPeriod.Day}>Day(s)</Option>
              <Option value={DurationPeriod.Week}>Week(s)</Option>
              {monthlySelectOption}
              <Option value={DurationPeriod.Year}>Year(s)</Option>
            </Select>
          </InputGroup>
        </div>
        {hasExtraFrequencyDescriptor && (
          <Text variation={disabledTextVariation}>on</Text>
        )}
      </div>
      {isMonthly(recurrenceRule) && (
        <MonthlySelect
          disabled={disabled}
          onChange={onChangeType}
          selectedMonthOption={recurrenceRule.type}
        />
      )}
      {currentRecurrenceComponent}
    </Content>
  );

  function onChangeInterval(interval: number) {
    onChange({
      ...recurrenceRule,
      interval,
    });
  }

  function onChangeType(
    type:
      | DurationPeriod.Day
      | DurationPeriod.Week
      | DurationPeriod.DayOfMonth
      | DurationPeriod.WeekDayOfMonth
      | DurationPeriod.Year,
  ) {
    onChange({
      interval: recurrenceRule.interval,
      ...typeInitialStateMap[type],
    });
  }
}

function getCurrentComponent(
  recurrenceRule: RecurrenceRule,
  callback: (next: RecurrenceRule) => void,
  disabled: boolean,
) {
  switch (recurrenceRule.type) {
    case DurationPeriod.Week: {
      const onChangeWeekDays = (next: Set<WeekDay>): void => {
        callback({
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
        callback({
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
        callback({
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
      return;
  }
}
