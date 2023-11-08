import React, { useState } from "react";
import styles from "./CalendarPicker.css";
import { Text } from "../Text";
import { InputNumber } from "../InputNumber";

export const CalendarPickerWeekly = ({
  daysOfWeek,
}: {
  readonly daysOfWeek: Array<string>;
}) => {
  const [weeklyDays, setWeeklyDays] = useState<Array<string | undefined>>([]);
  const [weeklyInterval, setWeeklyInterval] = useState(1);

  return (
    <div>
      <div className={styles.picker}>
        <Text>
          Every{" "}
          <InputNumber
            value={weeklyInterval}
            onChange={d => setWeeklyInterval(Number(d))}
          />{" "}
          week(s) on:
        </Text>
      </div>
      <div>
        {daysOfWeek.map((day, index) => {
          return (
            <button
              type="button"
              className={weeklyDays[index] ? styles.selected : ""}
              key={index}
              onClick={() =>
                setWeeklyDays(db => {
                  const n = [...db];
                  n[index] = n[index] ? undefined : day;

                  return n;
                })
              }
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
