import React from "react";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import styles from "./DatePicker.css";
import { Typography } from "../Typography";
import { Button } from "../Button";

export function DatePickerCustomHeader({
  monthDate,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) {
  return (
    <div className={styles.header}>
      <Button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        icon="arrowLeft"
        ariaLabel="Previous Month"
        variation="work"
        type="tertiary"
      />

      <div className={styles.month}>
        <Typography element="span" fontFamily="display" size="large">
          {monthDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
      </div>

      <Button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        icon="arrowRight"
        ariaLabel="Next Month"
        variation="work"
        type="tertiary"
      />
    </div>
  );
}
