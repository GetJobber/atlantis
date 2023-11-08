import React, { useState } from "react";
import styles from "./CalendarPicker.css";
import { Text } from "../Text";
import { InputNumber } from "../InputNumber";

export const CalendarPickerYearly = () => {
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
          year(s)
        </Text>
      </div>
    </div>
  );
};
