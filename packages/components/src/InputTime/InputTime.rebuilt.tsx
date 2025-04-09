import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTimePredict } from "./hooks/useTimePredict";
import { InputTimeRebuiltProps } from "./InputTime.types";
import { dateToTimeString, timeStringToDate } from "./timeUtils";
import { InputText, InputTextRef } from "../InputText";

// Extracted helper for reformatting (with DOM manipulation)
function reformatValidTimeWithDOM(
  inputElement: HTMLInputElement,
  isControlled: boolean,
  setInternalValue?: (value: string) => void,
) {
  const currentValue = inputElement.value;
  if (!currentValue) return;

  const formattedDate = timeStringToDate(currentValue);

  if (formattedDate) {
    const formattedString = dateToTimeString(formattedDate);

    if (currentValue !== formattedString) {
      inputElement.value = formattedString; // Direct DOM manipulation

      if (!isControlled) {
        setInternalValue?.(formattedString);
      }
    }
  }
}

// Main blur helper (reverted style, using extracted reformat helper)
function handleInputResetOrReformat(
  inputElement: HTMLInputElement,
  isControlled: boolean,
  controlledValue: Date | undefined,
  defaultValue: Date | undefined,
  // Keep onChange here? It's unused in this version of the helper
  // onChange?: (value?: Date) => void,
  setInternalValue?: (value: string) => void,
) {
  if (!inputElement.checkValidity()) {
    // Handle invalid case
    const resetValueString = isControlled
      ? dateToTimeString(controlledValue)
      : dateToTimeString(defaultValue);
    inputElement.value = resetValueString;
    if (!isControlled) setInternalValue?.(resetValueString);
  } else {
    // Handle valid case
    reformatValidTimeWithDOM(inputElement, isControlled, setInternalValue);
  }
}

export const InputTimeRebuilt = forwardRef(function InputTimeInternal(
  {
    defaultValue,
    value: controlledValue,
    onChange,
    onBlur,
    onKeyUp,
    ...params
  }: InputTimeRebuiltProps,
  ref: React.ForwardedRef<HTMLInputElement | InputTextRef>,
) {
  const internalInputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => internalInputRef.current as HTMLInputElement);

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>(() =>
    dateToTimeString(defaultValue),
  );
  const displayValue = isControlled
    ? dateToTimeString(controlledValue)
    : internalValue;

  const { setTypedTime } = useTimePredict({
    value: controlledValue,
    handleChange: handleTimePredictChange,
  });

  useEffect(() => {
    if (!isControlled) {
      setInternalValue(dateToTimeString(defaultValue));
    }
  }, [defaultValue, isControlled]);

  useEffect(() => {
    if (isControlled && internalInputRef.current) {
      const timeString = dateToTimeString(controlledValue);

      if (internalInputRef.current.value !== timeString) {
        internalInputRef.current.value = timeString;
      }
    }
  }, [controlledValue, isControlled]);

  function handleInputChange(
    newValue: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(timeStringToDate(newValue));
  }

  function handleTimePredictChange(newValue: string) {
    handleInputChange(newValue);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    onBlur?.(event);

    if (internalInputRef.current) {
      handleInputResetOrReformat(
        internalInputRef.current,
        isControlled,
        controlledValue,
        defaultValue,
        // onChange, // Pass onChange if needed by helpers (currently not)
        setInternalValue,
      );
    }
  }

  return (
    <InputText
      ref={internalInputRef}
      type="time"
      {...params}
      value={displayValue}
      version={2}
      onBlur={handleBlur}
      onKeyUp={e => {
        onKeyUp?.(e);
        !isNaN(parseInt(e.key, 10)) && setTypedTime(prev => prev + e.key);
      }}
      onChange={handleInputChange}
    />
  );
});
