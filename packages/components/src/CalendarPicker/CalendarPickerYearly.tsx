import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { PickedCalendarRange } from "./CalendarPickerTypes";
import { Text } from "../Text";
import { InputNumber } from "../InputNumber";

export const CalendarPickerYearly = ({
  onUpdate,
}: {
  readonly onUpdate: (calTime: PickedCalendarRange) => void | undefined;
}) => {
  const [yearlyInterval, setYearlyInterval] = useState(1);
  useEffect(() => {
    onUpdate({ frequency: "Yearly", interval: yearlyInterval });
  }, [yearlyInterval]);

  return (
    <div>
      <div className={styles.picker}>
        <Text>
          Every{" "}
          <InputNumber
            value={yearlyInterval}
            onChange={d => setYearlyInterval(Number(d))}
          />{" "}
          year(s)
        </Text>
        <div>
          {yearlyInterval === 1 && "Summary: Yearly"}
          {yearlyInterval > 1 && `Summary: Every ${yearlyInterval} years`}
        </div>
      </div>
    </div>
  );
};
