import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./FormField.css";
import { RawerDatePicker } from "../DatePicker";

export const RawDatePicker = ({ label }: { readonly label: string }) => {
  const wrapperClasses = classnames(styles.wrapper, styles.miniLabel);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const myElement = useRef<HTMLDivElement>(null);

  const inDateFormat = (date: Date) => {
    const dateWithZero = (dayIn: number) => {
      let day: string | number = dayIn;

      if (day < 10) {
        day = "0" + day;
      }

      return String(day);
    };
    const format =
      date.getFullYear() +
      "-" +
      dateWithZero(date.getMonth() + 1) +
      "-" +
      dateWithZero(date.getDate());

    return format;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDatePicker &&
        myElement.current &&
        !myElement.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  return (
    <div ref={myElement}>
      <div className={wrapperClasses}>
        <div className={styles.childrenWrapper}>
          <label className={styles.label}>{label}</label>
          <input
            className={styles.input}
            type="date"
            onFocus={() => setShowDatePicker(true)}
            value={inDateFormat(selectedDate)}
            readOnly
          />
          {showDatePicker && (
            <RawerDatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setShowDatePicker={setShowDatePicker}
            />
          )}
        </div>
      </div>
    </div>
  );
};
