import React, { useEffect, useState } from "react";
import styles from "./CalendarPicker.css";
import { PickedCalendarRange } from "./CalendarPickerTypes";
import { Text } from "../Text";
import { InputNumber } from "../InputNumber";
import { RadioGroup, RadioOption } from "../RadioGroup";

function appendSuffix(n: number) {
  const j = n % 10,
    k = n % 100;

  if (j == 1 && k != 11) {
    return n + "st";
  }

  if (j == 2 && k != 12) {
    return n + "nd";
  }

  if (j == 3 && k != 13) {
    return n + "rd";
  }

  return n + "th";
}

function getDayOfWeek(dayNumber: number) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return daysOfWeek[dayNumber];
}

export const CalendarPickerMonthly = ({
  daysOfWeek,
  onUpdate,
}: {
  readonly daysOfWeek: Array<string>;
  readonly onUpdate: (calTime: PickedCalendarRange) => void | undefined;
}) => {
  const days = Array.from({ length: 31 });
  const weeks = ["1st", "2nd", "3rd", "4th"];
  const [monthlyDays, setMonthlyDays] = useState<Array<number | undefined>>([]);
  const [weeklyDays, setWeeklyDays] = useState<
    Array<Array<string | undefined>>
  >([[]]);
  const [weeklyInterval, setWeeklyInterval] = useState(1);
  const [typeOfMonth, setTypeOfMonth] = useState(1);
  useEffect(() => {
    onUpdate({
      frequency: "Monthly",
      interval: weeklyInterval,
      daysOfMonth: monthlyDays,
      weeksOfMonth: weeklyDays,
      typeOfMonth,
    });
  }, [weeklyInterval, monthlyDays, weeklyDays, typeOfMonth]);

  console.log("TYPE OF MONTH", typeOfMonth, weeklyDays);
  let found = false;

  return (
    <div>
      <div className={styles.picker}>
        <Text>
          Every{" "}
          <InputNumber
            value={weeklyInterval}
            onChange={d => setWeeklyInterval(Number(d))}
          />{" "}
          months(s):
        </Text>
      </div>
      <div>
        <RadioGroup
          ariaLabel="Type Of Month"
          onChange={d => setTypeOfMonth(Number(d))}
          value={typeOfMonth}
        >
          <RadioOption value={1} label="Day of month" />
          <RadioOption value={2} label="Day of week" />
        </RadioGroup>
      </div>
      {typeOfMonth === 1 && (
        <div style={{ display: "flex", maxWidth: "300px", flexWrap: "wrap" }}>
          {days.map((_, index) => {
            return (
              <button
                type="button"
                className={monthlyDays[index] ? styles.selected : ""}
                onClick={() =>
                  setMonthlyDays(db => {
                    const n = [...db];
                    n[index] = n[index] ? undefined : index + 1;

                    return n;
                  })
                }
                key={index}
              >
                {index + 1}
              </button>
            );
          })}
          <button
            type="button"
            className={monthlyDays[32] ? styles.selected : ""}
            onClick={() => {
              setMonthlyDays(db => {
                const n = [...db];
                n[32] = n[32] ? undefined : 32;

                return n;
              });
            }}
          >
            Last Day
          </button>
        </div>
      )}
      {typeOfMonth === 2 && (
        <div>
          {weeks.map((week, key) => {
            return (
              <div key={key}>
                <Text>{week}</Text>
                <div>
                  {daysOfWeek.map((day, index) => {
                    return (
                      <button
                        type="button"
                        className={
                          weeklyDays[key]?.[index] ? styles.selected : ""
                        }
                        key={index}
                        onClick={() =>
                          setWeeklyDays(db => {
                            const n = [...db];

                            if (!n[key]) {
                              n[key] = [];
                            }
                            n[key][index] = n[key][index] ? undefined : day;

                            return n;
                          })
                        }
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {typeOfMonth === 1 && (
        <div>
          {!monthlyDays.find(d => d) && "Summary:"}
          {monthlyDays.find(d => d) && (
            <div>
              {weeklyInterval === 1
                ? "Monthly "
                : `Every ${weeklyInterval} months `}
              on the{" "}
              {monthlyDays
                .filter(d => d)
                .map((d, index) => {
                  let val = "";

                  if (d !== 32) {
                    val = appendSuffix(Number(d));
                  } else {
                    val = "last";
                  }

                  if (
                    index > 0 &&
                    index === monthlyDays.filter(e => e).length - 1
                  ) {
                    val = "and " + val;
                  }

                  return val;
                })
                .join(", ")}{" "}
              day{monthlyDays.filter(d => d).length > 1 ? "s" : ""} of the month
            </div>
          )}
        </div>
      )}
      {typeOfMonth === 2 && (
        <div>
          {weeklyInterval === 1 && "Summary: Monthly "}
          {weeklyInterval > 1 && `Every ${weeklyInterval} months`}
          {weeklyDays
            .map(d => d)
            ?.find(d => d)
            ?.filter(d => d) && " on the "}
          {weeklyDays
            .map((b, index1) => {
              return b
                ?.map((d, index2) => {
                  if (d) {
                    let prefix = "";

                    if (found) {
                      prefix = " and ";
                    }
                    found = true;

                    return (
                      prefix +
                      appendSuffix(index1 + 1) +
                      " " +
                      getDayOfWeek(index2) +
                      " "
                    );
                  }
                })
                .filter(d => d);
            })
            .filter(d => d)}
        </div>
      )}
    </div>
  );
};
