import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { PickedCalendarRange } from "./CalendarPickerTypes";
import { useWeekly } from "./useHumanReadableRRule";
import { CalendarPickerDaysOfTheWeek } from "./CalendarPickerDaysOfTheWeek";
import { InputNumber } from "../InputNumber";

export const CalendarPickerWeekly = ({
  daysOfWeek,
  defaultWeeklyDays = [],
  defaultInterval = 1,
  onUpdate,
  enableInteraction,
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
  readonly enableInteraction?: boolean;
  readonly onUpdate?: (calTime: PickedCalendarRange) => void | undefined;
}) => {
  const [weeklyDays, setWeeklyDays] =
    useState<Array<{ day: string; index: number } | undefined>>(
      defaultWeeklyDays,
    );
  const [weeklyInterval, setWeeklyInterval] = useState(defaultInterval);
  const weeklyDaysSummary = useWeekly(weeklyDays, weeklyInterval);

  useEffect(() => {
    if (!enableInteraction) {
      setWeeklyDays(defaultWeeklyDays);
      setWeeklyInterval(defaultInterval);
    }
  }, [defaultWeeklyDays, enableInteraction, defaultInterval]);

  useEffect(() => {
    if (enableInteraction && onUpdate) {
      onUpdate({
        frequency: "Weekly",
        interval: weeklyInterval,
        daysOfWeek: weeklyDays,
      });
    }
  }, [weeklyInterval, weeklyDays, enableInteraction]);

  return (
    <div>
      <div className={styles.picker}>
        <div className={styles.intervalWrapper}>
          <span className={styles.intervalPrefix}>Every </span>
          <InputNumber
            value={weeklyInterval}
            onChange={d => setWeeklyInterval(Number(d))}
          />{" "}
          <span className={styles.intervalSuffix}>
            week{weeklyInterval > 1 ? "s" : ""} on:
          </span>
        </div>
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
