import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { PickedCalendarRange } from "./CalendarPickerTypes";
import { useWeekly } from "./useHumanReadableRRule";
import { CalendarPickerDaysOfTheWeek } from "./CalendarPickerDaysOfTheWeek";
import { Text } from "../Text";
import { InputNumber } from "../InputNumber";

export const CalendarPickerWeekly = ({
  daysOfWeek,
  defaultWeeklyDays = [],
  onUpdate,
}: {
  readonly daysOfWeek: Array<string>;
  readonly defaultWeeklyDays:
    | (
        | {
            day: string;
            index: number;
          }
        | undefined
      )[]
    | undefined;
  readonly onUpdate: (calTime: PickedCalendarRange) => void | undefined;
}) => {
  const [weeklyDays, setWeeklyDays] =
    useState<Array<{ day: string; index: number } | undefined>>(
      defaultWeeklyDays,
    );
  const [weeklyInterval, setWeeklyInterval] = useState(1);
  const weeklyDaysSummary = useWeekly(weeklyDays, weeklyInterval);

  useEffect(() => {
    onUpdate({
      frequency: "Weekly",
      interval: weeklyInterval,
      daysOfWeek: weeklyDays,
    });
  }, [weeklyInterval, weeklyDays]);

  return (
    <div>
      <div className={styles.picker}>
        <Text>
          <span className={styles.intervalPrefix}>Every </span>
          <InputNumber
            value={weeklyInterval}
            onChange={d => setWeeklyInterval(Number(d))}
          />{" "}
          <span className={styles.intervalSuffix}>
            week{weeklyInterval > 1 ? "s" : ""} on:
          </span>
        </Text>
      </div>
      <div className={styles.buttonWrapper}>
        <CalendarPickerDaysOfTheWeek
          daysOfWeek={daysOfWeek}
          selected={index => !!weeklyDays[index]}
          onClick={(day: string, index: number) => {
            setWeeklyDays(db => {
              const n = [...db];
              n[index] = n[index] ? undefined : { day, index };

              return n;
            });
          }}
        />
      </div>
      <div className={styles.summary}>{weeklyDaysSummary}</div>
    </div>
  );
};
