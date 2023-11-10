import React from "react";
import { CalendarPicker } from "./CalendarPicker";
import { CalendarPickerModalProps } from "./CalendarPickerTypes";
import styles from "./CalendarPicker.css";
import { Modal } from "../Modal";

export const CalendarPickerModal = (props: CalendarPickerModalProps) => {
  return (
    <Modal {...props.modal}>
      <div className={styles.calendarInModal}>
        <CalendarPicker {...props.picker} />
      </div>
    </Modal>
  );
};
