import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { PickedCalendarRange } from "./CalendarPickerTypes";
import { useDaily } from "./useHumanReadableRRule";
import { InputNumber } from "../InputNumber";

export const CalendarPickerDaily = ({
  onUpdate,
  defaultInterval,
  enableInteraction = true,
}: {
  readonly onUpdate?: (calTime: PickedCalendarRange) => void | undefined;
  readonly defaultInterval?: number;
  readonly enableInteraction?: boolean;
}) => {
  const [dailyInterval, setDailyInterval] = useState(defaultInterval || 1);

  const dailySummary = useDaily(dailyInterval);

  useEffect(() => {
    if (enableInteraction && onUpdate) {
      onUpdate({ frequency: "Daily", interval: dailyInterval });
    }
  }, [dailyInterval]);

  useEffect(() => {
    if (!enableInteraction) {
      setDailyInterval(defaultInterval || 1);
    }
  }, [defaultInterval]);

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
