import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { PickedCalendarRange } from "./CalendarPickerTypes";
import { useYearly } from "./useHumanReadableRRule";
import { Text } from "../Text";
import { InputNumber } from "../InputNumber";

export const CalendarPickerYearly = ({
  onUpdate,
  defaultInterval = 1,
  enableUpdate = true,
}: {
  readonly onUpdate: (calTime: PickedCalendarRange) => void | undefined;
  readonly defaultInterval?: number;
  readonly enableUpdate?: boolean;
}) => {
  const [yearlyInterval, setYearlyInterval] = useState(defaultInterval);
  useEffect(() => {
    if (!enableUpdate) {
      setYearlyInterval(defaultInterval);
    }
  }, [defaultInterval]);
  const yearlySummary = useYearly(yearlyInterval);

  useEffect(() => {
    if (enableUpdate) {
      onUpdate({ frequency: "Yearly", interval: yearlyInterval });
    }
  }, [yearlyInterval]);

  return (
    <div>
      <div className={styles.picker}>
        <Text>
          <span className={styles.intervalPrefix}> Every </span>
          <InputNumber
            value={yearlyInterval}
            onChange={d => setYearlyInterval(Number(d))}
          />{" "}
          <span className={styles.intervalSuffix}>
            year{yearlyInterval > 1 ? "s" : ""}
          </span>
        </Text>
        <div className={styles.summary}>{yearlySummary}</div>
      </div>
    </div>
  );
};
