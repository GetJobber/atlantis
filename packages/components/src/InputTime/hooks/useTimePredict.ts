import debounce from "lodash/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { InputTimeProps } from "../InputTimeProps";

interface UseTimePredictProps extends Pick<InputTimeProps, "value"> {
  readonly handleChange: (value: string) => void;
}

const DEBOUNCE_TIME = 300;

export function useTimePredict({ value, handleChange }: UseTimePredictProps) {
  const IS_12_HOUR_FORMAT = useRef(
    Intl.DateTimeFormat(navigator.language, {
      hour: "numeric",
    }).resolvedOptions().hour12,
  );

  const [typedTime, setTypedTime] = useState<string>("");

  const predictTime = useCallback(
    debounce(() => {
      if (value) return;

      handleChange(predictHours(typedTime, IS_12_HOUR_FORMAT.current));
    }, DEBOUNCE_TIME),
    [typedTime, value, handleChange],
  );

  /**
   * Predict the hour when user types a number
   */
  useEffect(() => {
    /**
     * Don't try to predict if the user types 0 as the user would almost always
     * type another number after 0.
     */
    if (typedTime && typedTime !== "0") {
      predictTime();

      if ((IS_12_HOUR_FORMAT && typedTime !== "1") || typedTime.length === 2) {
        // Immediately predict the hour
        predictTime.flush();
      }
    }

    return predictTime.cancel;
  }, [typedTime]);

  /**
   * Reset typed time when the value changed
   */
  useEffect(() => {
    setTypedTime("");
  }, [value]);

  return {
    setTypedTime,
  };
}

function predictHours(time: string, is12HourFormat = false) {
  const today = new Date();
  const currentHour = today.getHours();
  const parsedTime = parseInt(time, 10);
  let predictedTime: number;

  if (is12HourFormat) {
    predictedTime = predict12Hours(parsedTime, currentHour);
  } else {
    predictedTime = predict24Hours(time, parsedTime, currentHour);
  }

  return formatHour(predictedTime);
}

function predict12Hours(parsedTime: number, currentHour: number) {
  /**
   * We need to predict what the user wants when they type 1 since it could be
   * 10, 11, 12, or 1.
   *
   * If the current hour is over 12PM, we can skip this and go to the next logic.
   */
  if (parsedTime === 1 && currentHour < 12) {
    if (currentHour < 10) {
      return 10;
    } else {
      return currentHour + 1;
    }
  }

  /**
   * Typing 1-5 predicts that the user want that exact hour on the afternoon.
   */
  if (parsedTime <= 5) {
    return parsedTime + 12;
  }

  if (parsedTime > 12 && parsedTime <= 15) {
    return parsedTime * 10;
  }

  /**
   * Anything after 5 will be predicted to be set as AM.
   */
  return parsedTime;
}

function predict24Hours(time: string, parsedTime: number, currentHour: number) {
  /**
   * Typing 1 could be predicted from 10 to 19.
   * Typing 01 skips this logic and sets the time to 01:00.
   */
  if (parsedTime === 1 && time !== "01") {
    if (currentHour < 10 || currentHour > 19) {
      return 10;
    } else {
      return currentHour + 1;
    }
  }

  /**
   * Typing 2 could be predicted from 20 to 24.
   * Typing 02 skips this logic and sets the time to 02:00.
   */
  if (parsedTime === 2 && time !== "02") {
    if (currentHour < 20) {
      return 20;
    } else {
      return currentHour + 1;
    }
  }

  /**
   * Typing 24 or 00 is set to midnight. This ensures the time doesn't get set
   * to 24 as that would be invalid.
   */
  if (parsedTime === 24 || time === "00") {
    return 0;
  }

  return parsedTime;
}

function formatHour(time: number) {
  if (time > 99) {
    const splitTime = time.toString().split("");
    if (splitTime.length === 3) splitTime.unshift("0"); // 130 -> 0130
    splitTime.splice(2, 0, ":"); // 0130 -> 01:30

    return splitTime.join("");
  }

  if (time < 10) {
    return `0${time}:00`;
  }

  return `${time}:00`;
}