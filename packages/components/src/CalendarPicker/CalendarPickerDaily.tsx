import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { PickedCalendarRange } from "./CalendarPickerTypes";
import { Text } from "../Text";
import { InputNumber } from "../InputNumber";

export const CalendarPickerDaily = ({
  onUpdate,
}: {
  readonly onUpdate: (calTime: PickedCalendarRange) => void | undefined;
}) => {
  const [dailyInterval, setDailyInterval] = useState(1);
  useEffect(() => {
    onUpdate({ frequency: "Daily", interval: dailyInterval });
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
        <div className={styles.summary}>
          {dailyInterval === 1 && "Summary: Daily"}
          {dailyInterval > 1 && `Summary: Every ${dailyInterval} days`}
        </div>
      </div>
    </div>
  );
};
