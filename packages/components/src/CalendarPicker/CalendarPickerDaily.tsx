import React, { useState } from "react";
import styles from "./CalendarPicker.css";
import { Text } from "../Text";
import { InputNumber } from "../InputNumber";

export const CalendarPickerDaily = () => {
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
          days(s)
        </Text>
      </div>
    </div>
  );
};
