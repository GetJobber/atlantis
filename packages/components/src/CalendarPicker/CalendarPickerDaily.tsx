import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { PickedCalendarRange } from "./CalendarPickerTypes";
import { useDaily } from "./useHumanReadableRRule";
import { InputNumber } from "../InputNumber";

export const CalendarPickerDaily = ({
  onUpdate,
  defaultInterval,
  enableUpdate = true,
}: {
  readonly onUpdate?: (calTime: PickedCalendarRange) => void | undefined;
  readonly defaultInterval?: number;
  readonly enableUpdate?: boolean;
}) => {
  const [dailyInterval, setDailyInterval] = useState(defaultInterval || 1);

  useEffect(() => {
    if (!enableUpdate) {
      setDailyInterval(defaultInterval || 1);
    }
  }, [defaultInterval]);

  const dailySummary = useDaily(dailyInterval);

  useEffect(() => {
    if (enableUpdate && onUpdate) {
      onUpdate({ frequency: "Daily", interval: dailyInterval });
    }
  }, [dailyInterval]);

  return (
    <div>
      <div className={styles.picker}>
        <div className={styles.intervalWrapper}>
          <span className={styles.intervalPrefix}>Every </span>
          <InputNumber
            value={dailyInterval}
            onChange={d => setDailyInterval(Number(d))}
          />{" "}
          <span className={styles.intervalSuffix}>
            day{dailyInterval > 1 ? "s" : ""}
          </span>
        </div>
        <div className={styles.summary}>{dailySummary}</div>
      </div>
    </div>
  );
};
