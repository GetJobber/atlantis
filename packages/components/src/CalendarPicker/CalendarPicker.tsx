import React, { useState } from "react";
import { CalendarPickerWeekly } from "./CalendarPickerWeekly";
import { CalendarPickerDaily } from "./CalendarPickerDaily";
import { CalendarPickerMonthly } from "./CalendarPickerMonthly";
import { CalendarPickerYearly } from "./CalendarPickerYearly";
import { Option, Select } from "../Select";
import { Text } from "../Text";

export const CalendarPicker = () => {
  const [frequency, setFrequency] = useState("Weekly");
  const options = ["Daily", "Weekly", "Monthly", "Yearly"];
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div>
      <Text>Repeat</Text>
      <Select value={frequency} onChange={(val: string) => setFrequency(val)}>
        {options.map((option, index) => (
          <Option key={index}>{option}</Option>
        ))}
      </Select>
      {frequency === "Daily" && <CalendarPickerDaily />}
      {frequency === "Weekly" && (
        <CalendarPickerWeekly daysOfWeek={daysOfWeek} />
      )}
      {frequency === "Monthly" && (
        <CalendarPickerMonthly daysOfWeek={daysOfWeek} />
      )}
      {frequency === "Yearly" && <CalendarPickerYearly />}
    </div>
  );
};
