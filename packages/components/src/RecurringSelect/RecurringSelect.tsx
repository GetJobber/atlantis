import React from "react";
import { MonthlySelect } from "./components";
import { CurrentRecurrenceComponent } from "./CurrentRecurrenceComponent";
import styles from "./RecurringSelect.css";
import {
  DurationPeriod,
  RecurrenceRule,
  isMonthly,
  typeInitialStateMap,
} from "./types";
import { Option, Select } from "../Select";
import { InputNumber } from "../InputNumber";
import { InputGroup } from "../InputGroup";
import { Content } from "../Content";
import { Text } from "../Text";

interface RecurringSelectProps {
  readonly disabled?: boolean;
  readonly value: RecurrenceRule;
  onChange(value: RecurrenceRule): void;
}

export function RecurringSelect({
  value,
  disabled = false,
  onChange,
}: RecurringSelectProps) {
  const disabledTextVariation = disabled ? "disabled" : undefined;
  // we must dynamically populate the select option based on which is selected
  // because there is no single "month" option, it must always be one of these two
  const monthlySelectOptionValue =
    value.type === DurationPeriod.WeekDayOfMonth
      ? DurationPeriod.WeekDayOfMonth
      : DurationPeriod.DayOfMonth;

  const hasExtraFrequencyDescriptor =
    value.type === DurationPeriod.WeekDayOfMonth ||
    value.type === DurationPeriod.DayOfMonth ||
    value.type === DurationPeriod.Week;

  return (
    <Content>
      <div className={styles.container}>
        <Text variation={disabledTextVariation}>Every</Text>
        <div className={styles.fullWidthWrapper}>
          <InputGroup flowDirection="horizontal">
            <InputNumber
              disabled={disabled}
              name="schedule-recurrence-interval"
              value={value.interval}
              min={1}
              maxLength={3}
              onChange={onChangeInterval}
            />

            <Select
              disabled={disabled}
              value={value.type}
              onChange={onChangeType}
              name="schedule-recurrence-type"
            >
              <Option value={DurationPeriod.Day}>Day(s)</Option>
              <Option value={DurationPeriod.Week}>Week(s)</Option>
              <Option value={monthlySelectOptionValue}>Month(s)</Option>
              <Option value={DurationPeriod.Year}>Year(s)</Option>
            </Select>
          </InputGroup>
        </div>
        {hasExtraFrequencyDescriptor && (
          <Text variation={disabledTextVariation}>on</Text>
        )}
      </div>
      {isMonthly(value) && (
        <MonthlySelect
          disabled={disabled}
          onChange={onChangeType}
          selectedMonthOption={value.type}
        />
      )}

      <CurrentRecurrenceComponent
        disabled={disabled}
        recurrenceRule={value}
        onChange={onChange}
      />
    </Content>
  );

  function onChangeInterval(interval: number) {
    onChange({
      ...value,
      interval,
    });
  }

  function onChangeType(type: typeof value.type) {
    onChange({
      interval: value.interval,
      ...typeInitialStateMap[type],
    });
  }
}
