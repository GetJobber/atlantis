# RecurringSelect

# RecurringSelect

_This component has been demoted/relocated. It still exists in the shared
component directory of our frontend project_

A RecurringSelect is used to provide an intuitive, accessible pre-built UI
allowing a user to build a custom schedule using a handful of different time
intervals.

While it can be used in isolation, most often makes sense to include it as part
of a more complex scheduling component that can use the returned data as part of
a complete schedule.

## Design & usage guidelines

The RecurringSelect is a complex tool, so ensure the user will require the full
suite of recurrence options before reaching for it. For instance where you may
only require a simple recurrence option, such as "Every `n` weeks", you are
likely better served using basic form inputs such as InputNumber or Select to
give the user fewer options.

The visual calendar selections in the RecurringSelect will scale up or down to
adapt to the width of the RecurringSelect's container, allowing this pattern to
be more prominent when used as a primary interface, or work in a smaller
column-based or mobile interface. Consider this as you design solutions that may
require RecurringSelect.

### Disabled state

When the RecurringSelect is set to `disabled`, all child components become
disabled. As with any design, your first goal should be **to avoid creating a
flow where the user encounters a disabled state**, so only use this approach if
a disabled state cannot be avoided.

## Accessibility

The RecurringSelect component is entirely usable by the keyboard.

All selections can be done and undone with tabs and the space bar. The "visual"
calendar-style selectors are all built using radio or checkbox elements where
necessary, ensuring that users of assistive tech have appropriate context as to
the type of selection they are making.

## Related components

To allow the user to select specific dates, use
[Datepicker](/components/Datepicker) or [InputDate](/components/InputDate).

## Web Component Code

```tsx
RecurringSelect Calendar Date Picker Schedule Web React import React from "react";
import {
  DayOfMonthSelect,
  MonthlyDayOfWeekSelect,
  WeeklySelect,
} from "./components";
/* eslint-disable import/no-deprecated */
import type {
  DayOfMonth,
  RecurrenceRule,
  RecurrenceRuleWeekDayOfMonth,
  WeekDay,
} from "./types";
import { DurationPeriod } from "./types";

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
import React from "react";
import { MonthlySelect } from "./components";
import { CurrentRecurrenceComponent } from "./CurrentRecurrenceComponent";
import styles from "./RecurringSelect.module.css";
/* eslint-disable import/no-deprecated */
import type { RecurrenceRule } from "./types";
import {
  /* eslint-disable import/no-deprecated */
  DurationPeriod,
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

/**
 * @deprecated RecurringSelect will be removed in the next major version
 */
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
export { RecurringSelect } from "./RecurringSelect";
export type { DayOfMonth, RecurrenceRule } from "./types";
export { DurationPeriod, WeekDay } from "./types";

```

## Props

### Web Props

| Prop       | Type                              | Required | Default           | Description      |
| ---------- | --------------------------------- | -------- | ----------------- | ---------------- |
| `disabled` | `boolean`                         | ❌       | `[object Object]` | _No description_ |
| `value`    | `RecurrenceRule`                  | ✅       | `_none_`          | _No description_ |
| `onChange` | `(value: RecurrenceRule) => void` | ✅       | `_none_`          | _No description_ |

## Categories

- Deprecated

## Web Test Code

```typescript
RecurringSelect Calendar Date Picker Schedule Web React Test Testing Jest /* eslint-disable jest/no-conditional-expect */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
/* eslint-disable import/no-deprecated */
import { RecurringSelect } from "./RecurringSelect";
import type { DayOfMonth } from "./types";
import { DurationPeriod, WeekDay } from "./types";

let onChange: jest.Mock;

describe("RecurringSelect with a weekly recurrenceRule", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });

  it("should render the days of the WeeklySelect component", () => {
    const { queryAllByText, queryByLabelText } = render(
      <RecurringSelect
        value={{
          interval: 1,
          type: DurationPeriod.Week,
          weekDays: new Set(),
        }}
        onChange={onChange}
        disabled={false}
      />,
    );

    expect(queryAllByText(/S/)).toBeTruthy();
    expect(queryAllByText(/T/)).toBeTruthy();
    expect(queryByLabelText(/F/)).toBeTruthy();
    expect(queryByLabelText(/W/)).toBeTruthy();
    expect(queryByLabelText(/M/)).toBeTruthy();
  });

  it("should call the onChange when checkbox is clicked", () => {
    const { getByLabelText } = render(
      <RecurringSelect
        value={{
          interval: 1,
          type: DurationPeriod.Week,
          weekDays: new Set(),
        }}
        onChange={onChange}
        disabled={false}
      />,
    );

    fireEvent.click(getByLabelText(/F/i));
    expect(onChange).toHaveBeenCalled();
  });
});

describe("RecurringSelect with an existing week day selected", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });

  it("should call the onChange when checkbox is clicked", () => {
    const newWeekDaySet = new Set<WeekDay>();
    newWeekDaySet.add(WeekDay.Friday);

    const { getByLabelText } = render(
      <RecurringSelect
        value={{
          interval: 1,
          type: DurationPeriod.Week,
          weekDays: newWeekDaySet,
        }}
        onChange={onChange}
        disabled={false}
      />,
    );

    fireEvent.click(getByLabelText(/F/i));
    expect(onChange).toHaveBeenCalledWith({
      interval: 1,
      type: DurationPeriod.Week,
      weekDays: new Set(),
    });
  });
});

describe("RecurringSelect with a daily recurrence", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });

  // eslint-disable-next-line max-statements
  it("should call the onChange when interval and type are changed", () => {
    const { container } = render(
      <RecurringSelect
        value={{
          interval: 1,
          type: DurationPeriod.Day,
        }}
        onChange={onChange}
        disabled={false}
      />,
    );

    const intervalEl = container.querySelector(
      'input[name="schedule-recurrence-interval"]',
    );
    expect(intervalEl).not.toBeNull();
    expect(intervalEl instanceof HTMLInputElement).toBe(true);

    if (intervalEl) {
      fireEvent.change(intervalEl, { target: { value: 3 } });

      expect(onChange).toHaveBeenCalledTimes(1);

      const typeEl = container.querySelector(
        'select[name="schedule-recurrence-type"]',
      );
      expect(typeEl).not.toBeNull();
      expect(typeEl instanceof HTMLSelectElement).toBe(true);

      if (typeEl) {
        fireEvent.change(typeEl, { target: { value: "Year" } });
      }

      expect(onChange).toHaveBeenCalledTimes(2);
    }
  });
});

describe("RecurringSelect with a day of month recurrenceRule", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });

  it("should render the days of the day of month component", () => {
    const { queryAllByText, queryByLabelText } = render(
      <RecurringSelect
        value={{
          interval: 1,
          type: DurationPeriod.DayOfMonth,
          date: new Set(),
        }}
        onChange={onChange}
        disabled={false}
      />,
    );

    expect(queryAllByText("1")).toBeTruthy();
    expect(queryAllByText("2")).toBeTruthy();
    expect(queryByLabelText("3")).toBeTruthy();
    expect(queryByLabelText("4")).toBeTruthy();
    expect(queryByLabelText("5")).toBeTruthy();
  });

  it("should call the onChange when checkbox is clicked", () => {
    const newDayOfMonthSet = new Set<DayOfMonth>();
    const { getByLabelText } = render(
      <RecurringSelect
        value={{
          interval: 1,
          type: DurationPeriod.DayOfMonth,
          date: newDayOfMonthSet,
        }}
        onChange={onChange}
        disabled={false}
      />,
    );

    fireEvent.click(getByLabelText("1"));
    fireEvent.click(getByLabelText("2"));
    expect(onChange).toHaveBeenCalled();
  });

  it("should call the onChange when checkbox is unchecked", () => {
    const newDayOfMonthSet = new Set<DayOfMonth>();
    newDayOfMonthSet.add(1);
    const { getByLabelText } = render(
      <RecurringSelect
        value={{
          interval: 1,
          type: DurationPeriod.DayOfMonth,
          date: newDayOfMonthSet,
        }}
        onChange={onChange}
        disabled={false}
      />,
    );

    fireEvent.click(getByLabelText("1"));
    expect(onChange).toHaveBeenCalled();
  });

  it("should render when last day selected", () => {
    const newDayOfMonthSet = new Set<DayOfMonth>();
    newDayOfMonthSet.add("LAST");
    const { getByLabelText } = render(
      <RecurringSelect
        value={{
          interval: 1,
          type: DurationPeriod.DayOfMonth,
          date: newDayOfMonthSet,
        }}
        onChange={onChange}
        disabled={false}
      />,
    );

    fireEvent.click(getByLabelText(/Last day/i));
    expect(onChange).toHaveBeenCalled();
  });
});

```

## Component Path

`/components/RecurringSelect`

---

_Generated on 2025-08-21T17:35:16.371Z_
