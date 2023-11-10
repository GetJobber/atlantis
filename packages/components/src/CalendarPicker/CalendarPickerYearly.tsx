import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { PickedCalendarRange } from "./CalendarPickerTypes";
import { useYearly } from "./useHumanReadableRRule";
import { InputNumber } from "../InputNumber";

export const CalendarPickerYearly = ({
  onUpdate,
  defaultInterval = 1,
  enableInteraction = true,
}: {
  readonly onUpdate?: (calTime: PickedCalendarRange) => void | undefined;
  readonly defaultInterval?: number;
  readonly enableInteraction?: boolean;
}) => {
  const [yearlyInterval, setYearlyInterval] = useState(defaultInterval);
  useEffect(() => {
    if (!enableInteraction) {
      setYearlyInterval(defaultInterval);
    }
  }, [defaultInterval]);
  const yearlySummary = useYearly(yearlyInterval);

  useEffect(() => {
    if (enableInteraction && onUpdate) {
      onUpdate({ frequency: "Yearly", interval: yearlyInterval });
    }
  }, [yearlyInterval]);

  return (
    <div>
      <div className={styles.picker}>
        <div className={styles.intervalWrapper}>
          <span className={styles.intervalPrefix}> Every </span>
          <InputNumber
            value={yearlyInterval}
            onChange={d => setYearlyInterval(Number(d))}
          />{" "}
          <span className={styles.intervalSuffix}>
            year{yearlyInterval > 1 ? "s" : ""}
          </span>
        </div>
        <div className={styles.summary}>{yearlySummary}</div>
      </div>
    </div>
  );
};
