import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { CalendarPickerWeekly } from "./CalendarPickerWeekly";
import { CalendarPickerDaily } from "./CalendarPickerDaily";
import { CalendarPickerMonthly } from "./CalendarPickerMonthly";
import { CalendarPickerYearly } from "./CalendarPickerYearly";
import { CalendarPickerProps } from "./CalendarPickerTypes";
import { Option, Select } from "../Select";
import { Typography } from "../Typography";

export const CalendarPicker = ({
  onUpdate,
  restrict = false,
  defaultPickedCalendarRange,
  enableRangeInteraction = true,
  dailyTestId = "ATL-CalendarPicker-Daily",
  weeklyTestId = "ATL-CalendarPicker-Weekly",
  monthlyTestId = "ATL-CalendarPicker-Monthly",
  yearlyTestId = "ATL-CalendarPicker-Yearly",
  selectPickerId = "ATL-CalendarPicker-Select",
}: CalendarPickerProps) => {
  const [frequency, setFrequency] = useState(
    defaultPickedCalendarRange?.frequency || "Weekly",
  );

  useEffect(() => {
    setFrequency(defaultPickedCalendarRange?.frequency || "Weekly");
  }, [defaultPickedCalendarRange?.frequency]);

  const options = ["Daily", "Weekly", "Monthly", "Yearly"];

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div
      className={`${styles.pickerWrapper} ${restrict ? styles.restrict : ""}`}
    >
      <div>
        <div className={styles.title}>
          <Typography size="large">Repeat</Typography>
        </div>
      </div>
      <div data-testid={selectPickerId}>
        <Select value={frequency} onChange={(val: string) => setFrequency(val)}>
          {options.map((option, index) => (
            <Option key={index}>{option}</Option>
          ))}
        </Select>
      </div>
      {frequency === "Daily" && (
        <div data-testid={dailyTestId}>
          <CalendarPickerDaily
            onUpdate={onUpdate}
            defaultInterval={defaultPickedCalendarRange?.interval}
            enableInteraction={enableRangeInteraction}
          />
        </div>
      )}
      {frequency === "Weekly" && (
        <div data-testid={weeklyTestId}>
          <CalendarPickerWeekly
            enableInteraction={enableRangeInteraction}
            daysOfWeek={daysOfWeek}
            defaultInterval={defaultPickedCalendarRange?.interval}
            defaultWeeklyDays={defaultPickedCalendarRange?.daysOfWeek}
            onUpdate={onUpdate}
          />
        </div>
      )}
      {frequency === "Monthly" && (
        <div data-testid={monthlyTestId}>
          <CalendarPickerMonthly
            daysOfWeek={daysOfWeek}
            onUpdate={onUpdate}
            enableInteraction={enableRangeInteraction}
            defaultInterval={defaultPickedCalendarRange?.interval}
            defaultTypeOfMonth={defaultPickedCalendarRange?.typeOfMonth}
            defaultMonthlyDays={defaultPickedCalendarRange?.daysOfMonth}
            defaultWeeklyDays={defaultPickedCalendarRange?.weeksOfMonth}
          />
        </div>
      )}
      {frequency === "Yearly" && (
        <div data-testid={yearlyTestId}>
          <CalendarPickerYearly
            onUpdate={onUpdate}
            enableInteraction={enableRangeInteraction}
            defaultInterval={defaultPickedCalendarRange?.interval}
          />
        </div>
      )}
    </div>
  );
};
