import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { PickedCalendarRange } from "./CalendarPickerTypes";
import { useDaily } from "./useHumanReadableRRule";
import { Text } from "../Text";
import { InputNumber } from "../InputNumber";

export const CalendarPickerDaily = ({
  onUpdate,
  defaultInterval,
  enableUpdate = true,
}: {
  readonly onUpdate: (calTime: PickedCalendarRange) => void | undefined;
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
    if (enableUpdate) {
      onUpdate({ frequency: "Daily", interval: dailyInterval });
    }
  }, [dailyInterval]);

  return (
    <div>
      <div className={styles.picker}>
        <Text>
          <span className={styles.intervalPrefix}>Every </span>
          <InputNumber
            value={dailyInterval}
            onChange={d => setDailyInterval(Number(d))}
          />{" "}
          <span className={styles.intervalSuffix}>
            day{dailyInterval > 1 ? "s" : ""}
          </span>
        </Text>
        <div className={styles.summary}>{dailySummary}</div>
      </div>
    </div>
  );
};
