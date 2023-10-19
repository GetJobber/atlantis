/* eslint-disable max-statements */
import React from "react";
import { Popover } from "@jobber/components/Popover";
import classNames from "./InputDate.css";
import {
  InputDateComponentProps,
  InputDateProps,
  useInputDateComponentProps,
} from "./hooks/useInputDateComponentProps";
import { CalendarDatePicker } from "../CalandarDatePicker";
import { InputText } from "../InputText";

export function InputDate(props: InputDateProps) {
  const componentProps = useInputDateComponentProps(props);

  return <InputDateComponent {...props} {...componentProps} />;
}

export function InputDateComponent({
  suffix,
  prefix,
  value,
  onFocus,
  onBlur,
  onChangeInput,
  showDatePicker,
  onSelectDate,
  date,
  onClickOutside,
  pickerRef,
  formFieldRef,
  ...props
}: InputDateComponentProps &
  Omit<InputDateProps, keyof InputDateComponentProps>) {
  return (
    <>
      <InputText
        {...props}
        formFieldRef={formFieldRef}
        suffix={props.clearable ? suffix : prefix}
        prefix={props.clearable ? prefix : undefined}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChangeInput}
      />
      <Popover
        attachTo={formFieldRef}
        open={showDatePicker}
        dismissable={false}
        refocus={false}
      >
        <div className={classNames.picker}>
          <CalendarDatePicker
            onChange={onSelectDate}
            selected={date}
            onClickOutside={onClickOutside}
            minDate={props.minDate}
            maxDate={props.maxDate}
            hightlightedDates={props.highlightedDates}
            ref={pickerRef}
            focusonSelectedDate
          />
        </div>
      </Popover>
    </>
  );
}
