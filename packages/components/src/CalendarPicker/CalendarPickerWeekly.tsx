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
  defaultInterval = 1,
  onUpdate,
  enableUpdate,
}: {
  readonly daysOfWeek: Array<string>;
  readonly defaultInterval?: number;
  readonly defaultWeeklyDays:
    | (
        | {
            day: string;
            index: number;
          }
        | undefined
      )[]
    | undefined;
  readonly enableUpdate?: boolean;
  readonly onUpdate: (calTime: PickedCalendarRange) => void | undefined;
}) => {
  const [weeklyDays, setWeeklyDays] =
    useState<Array<{ day: string; index: number } | undefined>>(
      defaultWeeklyDays,
    );
  const [weeklyInterval, setWeeklyInterval] = useState(defaultInterval);
  const weeklyDaysSummary = useWeekly(weeklyDays, weeklyInterval);

  useEffect(() => {
    if (!enableUpdate) {
      setWeeklyDays(defaultWeeklyDays);
      setWeeklyInterval(defaultInterval);
    }
  }, [defaultWeeklyDays, enableUpdate, defaultInterval]);

  useEffect(() => {
    if (enableUpdate) {
      onUpdate({
        frequency: "Weekly",
        interval: weeklyInterval,
        daysOfWeek: weeklyDays,
      });
    }
  }, [weeklyInterval, weeklyDays, enableUpdate]);

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
