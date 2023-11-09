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
          Every{" "}
          <InputNumber
            value={dailyInterval}
            onChange={d => setDailyInterval(Number(d))}
          />{" "}
          days(s)
        </Text>
        <div>
          {dailyInterval === 1 && "Summary: Daily"}
          {dailyInterval > 1 && `Summary: Every ${dailyInterval} days`}
        </div>
      </div>
    </div>
  );
};
