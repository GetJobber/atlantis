import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { PickedCalendarRange } from "./CalendarPickerTypes";
import { Text } from "../Text";
import { InputNumber } from "../InputNumber";

export const CalendarPickerWeekly = ({
  daysOfWeek,
  onUpdate,
}: {
  readonly daysOfWeek: Array<string>;
  readonly onUpdate: (calTime: PickedCalendarRange) => void | undefined;
}) => {
  const [weeklyDays, setWeeklyDays] = useState<
    Array<{ day: string; index: number } | undefined>
  >([]);
  const [weeklyInterval, setWeeklyInterval] = useState(1);

  const numberToWeekDay = (num: number) => {
    switch (num) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "Sunday";
    }
  };
  useEffect(() => {
    onUpdate({
      frequency: "Weekly",
      interval: weeklyInterval,
      daysOfWeek: weeklyDays,
    });
  }, [weeklyInterval, weeklyDays]);

  return (
    <div>
      <div className={styles.picker}>
        <Text>
          Every{" "}
          <InputNumber
            value={weeklyInterval}
            onChange={d => setWeeklyInterval(Number(d))}
          />{" "}
          week(s) on:
        </Text>
      </div>
      <div>
        {daysOfWeek.map((day, index) => {
          return (
            <button
              type="button"
              className={weeklyDays[index] ? styles.selected : ""}
              key={index}
              onClick={() =>
                setWeeklyDays(db => {
                  const n = [...db];
                  n[index] = n[index] ? undefined : { day, index };

                  return n;
                })
              }
            >
              {day}
            </button>
          );
        })}
      </div>
      <div>
        {weeklyDays.filter(d => d).length === 0 && weeklyInterval === 1 ? (
          "Summary: Weekly"
        ) : (
          <div>
            {weeklyInterval === 1 && "Weekly "}
            {weeklyInterval > 1 && `Every ${weeklyInterval} weeks`}
            {weeklyInterval > 0 &&
              weeklyDays.filter(d => d).length > 0 &&
              " on "}
            {weeklyDays
              .filter(d => d)
              .map((e, index) => {
                let ret = "";

                if (
                  index > 0 &&
                  index === weeklyDays.filter(x => x).length - 1
                ) {
                  ret = " and " + numberToWeekDay(Number(e?.index));
                } else {
                  ret = numberToWeekDay(Number(e?.index));
                }

                return ret;
              })
              .join(", ")}
          </div>
        )}
      </div>
    </div>
  );
};
