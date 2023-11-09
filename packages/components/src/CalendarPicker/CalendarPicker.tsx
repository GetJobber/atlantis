import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { CalendarPickerWeekly } from "./CalendarPickerWeekly";
import { CalendarPickerDaily } from "./CalendarPickerDaily";
import { CalendarPickerMonthly } from "./CalendarPickerMonthly";
import { CalendarPickerYearly } from "./CalendarPickerYearly";
import { PickedCalendarRange } from "./CalendarPickerTypes";
import { Option, Select } from "../Select";
import { Typography } from "../Typography";

export const CalendarPicker = ({
  onUpdate,
  restrict = false,
  defaultPickedCalendarRange,
  enableRangeInteraction = true,
}: {
  readonly onUpdate: (calTime: PickedCalendarRange) => void | undefined;
  readonly defaultPickedCalendarRange?: PickedCalendarRange;
  readonly restrict?: boolean;
  readonly enableRangeInteraction?: boolean;
}) => {
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
      <Select value={frequency} onChange={(val: string) => setFrequency(val)}>
        {options.map((option, index) => (
          <Option key={index}>{option}</Option>
        ))}
      </Select>
      {frequency === "Daily" && (
        <CalendarPickerDaily
          onUpdate={onUpdate}
          defaultInterval={defaultPickedCalendarRange?.interval}
          enableUpdate={enableRangeInteraction}
        />
      )}
      {frequency === "Weekly" && (
        <CalendarPickerWeekly
          enableUpdate={enableRangeInteraction}
          daysOfWeek={daysOfWeek}
          defaultInterval={defaultPickedCalendarRange?.interval}
          defaultWeeklyDays={defaultPickedCalendarRange?.daysOfWeek}
          onUpdate={onUpdate}
        />
      )}
      {frequency === "Monthly" && (
        <CalendarPickerMonthly
          daysOfWeek={daysOfWeek}
          onUpdate={onUpdate}
          enableUpdate={enableRangeInteraction}
          defaultInterval={defaultPickedCalendarRange?.interval}
          defaultTypeOfMonth={defaultPickedCalendarRange?.typeOfMonth}
          defaultMonthlyDays={defaultPickedCalendarRange?.daysOfMonth}
          defaultWeeklyDays={defaultPickedCalendarRange?.weeksOfMonth}
        />
      )}
      {frequency === "Yearly" && (
        <CalendarPickerYearly
          onUpdate={onUpdate}
          enableUpdate={enableRangeInteraction}
          defaultInterval={defaultPickedCalendarRange?.interval}
        />
      )}
    </div>
  );
};
