import React, { ReactNode } from "react";
import classNames from "classnames";
import { DayOfMonthSelect } from "./components/DayOfMonthSelect/DayOfMonthSelect";
import styles from "./RecurringSelect.css";
import { WeeklySelect } from "./components/WeeklySelect/WeeklySelect";
import { MonthlySelect } from "./components/MonthlySelect/MonthlySelect";
import { MonthlyDayOfWeekSelect } from "./components/MonthlyDayOfWeekSelect/MonthlyDayOfWeekSelect";
import {
  DayOfMonth,
  DurationPeriod,
  RecurrenceRule,
  RecurrenceRuleWeekDayOfMonth,
  ScheduleEnd,
  SchedulerState,
  WeekDay,
  typeInitialStateMap,
} from "./types";
import { Option, Select } from "../Select";
import { InputNumber } from "../InputNumber";
import { InputGroup } from "../InputGroup";
import { Content } from "../Content";

interface RecurringSelectProps {
  disabled: boolean;
  recurrenceRule: RecurrenceRule;
  recurrenceEnds: ScheduleEnd;
  onChange(newPartialState: Partial<SchedulerState>): void;
}

export function RecurringSelect({
  recurrenceRule,
  recurrenceEnds,
  disabled,
  onChange,
}: RecurringSelectProps) {
  const onRecurrenceChange = (newRecurrence: {
    ends: ScheduleEnd;
    rule: RecurrenceRule;
  }) =>
    onChange({
      recurrence: {
        ...newRecurrence,
      },
    });
  const currentRecurrenceComponent = getCurrentComponent(
    recurrenceRule,
    recurrenceEnds,
    onRecurrenceChange,
    disabled,
  );
  const monthlySelectOption =
    recurrenceRule.type === DurationPeriod.WeekDayOfMonth ? (
      <Option value={DurationPeriod.WeekDayOfMonth}>Month(s)</Option>
    ) : (
      <Option value={DurationPeriod.DayOfMonth}>Month(s)</Option>
    );
  let extraFrequencyDescriptor = <></>;
  let monthlySelectEl = <></>;

  if (
    recurrenceRule.type === DurationPeriod.WeekDayOfMonth ||
    recurrenceRule.type === DurationPeriod.DayOfMonth ||
    recurrenceRule.type === DurationPeriod.Week
  ) {
    extraFrequencyDescriptor = <span className={styles.modifierText}>on</span>;
  }

  if (
    recurrenceRule.type === DurationPeriod.WeekDayOfMonth ||
    recurrenceRule.type === DurationPeriod.DayOfMonth
  ) {
    // we must dynamically populate the select option based on which is selected
    // because there is no single "month" option, it must always be one of these two
    monthlySelectEl = (
      <MonthlySelect
        disabled={disabled}
        onChange={onChangeType}
        selectedMonthOption={recurrenceRule.type}
      />
    );
  }

  return (
    <Content>
      <div className={styles.container}>
        <span
          className={classNames(
            styles.intervalText,
            disabled ? styles.disabled : "",
          )}
        >
          Every
        </span>
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
        {extraFrequencyDescriptor}
      </div>
      {monthlySelectEl}
      {currentRecurrenceComponent}
    </Content>
  );

  function onChangeInterval(interval: number) {
    onRecurrenceChange({
      rule: {
        ...recurrenceRule,
        interval,
      },
      ends: recurrenceEnds,
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
    onRecurrenceChange({
      rule: {
        interval: recurrenceRule.interval,
        ...typeInitialStateMap[type],
      },
      ends: recurrenceEnds,
    });
  }
}

function getCurrentComponent(
  recurrenceRule: RecurrenceRule,
  recurrenceEnds: ScheduleEnd,
  callback: (newRecurrence: {
    rule: RecurrenceRule;
    ends: ScheduleEnd;
  }) => void,
  disabled: boolean,
): ReactNode {
  if (recurrenceRule.type === DurationPeriod.Week) {
    const onChangeWeekDays = (next: Set<WeekDay>): void => {
      callback({
        rule: {
          ...recurrenceRule,
          weekDays: next,
        },
        ends: recurrenceEnds,
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

  if (recurrenceRule.type === DurationPeriod.WeekDayOfMonth) {
    const onChangeWeekDayOfMonth = (
      next: RecurrenceRuleWeekDayOfMonth["dayOfWeek"],
    ): void => {
      callback({
        rule: {
          ...recurrenceRule,
          dayOfWeek: next,
        },
        ends: recurrenceEnds,
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

  if (recurrenceRule.type === DurationPeriod.DayOfMonth) {
    const onChangeDayOfMonth = (next: Set<DayOfMonth>): void => {
      callback({
        rule: {
          ...recurrenceRule,
          date: next,
        },
        ends: recurrenceEnds,
      });
    };
    return (
      <>
        {recurrenceRule.type === DurationPeriod.DayOfMonth && (
          <DayOfMonthSelect
            disabled={disabled}
            selectedDays={recurrenceRule.date}
            onChange={onChangeDayOfMonth}
          />
        )}
      </>
    );
  }
}
