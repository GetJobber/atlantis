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

      const predictedHour = predictHours(typedTime, IS_12_HOUR_FORMAT.current);
      handleChange(`${formatHour(predictedHour)}:00`);
    }, DEBOUNCE_TIME),
    [typedTime, value, handleChange],
  );

  /**
   * Predict time when user types
   */
  useEffect(() => {
    if (typedTime && typedTime !== "0") {
      predictTime();

      // Immediately predict if user types any number except for 1 and it's in a 12 hour format
      if ((IS_12_HOUR_FORMAT && typedTime !== "1") || typedTime.length === 2) {
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

// eslint-disable-next-line max-statements
function predictHours(time: string, is12HourFormat = false) {
  const today = new Date();
  const currentHour = today.getHours();
  const parsedTime = parseInt(time, 10);

  if (is12HourFormat && parsedTime === 1 && currentHour < 12) {
    return currentHour < 10 ? 10 : currentHour + 1;
  }

  if (!is12HourFormat && (parsedTime === 1 || parsedTime === 2)) {
    if (parsedTime === 1) {
      return currentHour < 10 || currentHour >= 20 ? 10 : currentHour + 1;
    } else {
      return currentHour < 20 ? 20 : currentHour + 1;
    }
  }

  if (parsedTime === 24 || time === "00") {
    return 0;
  }

  if (is12HourFormat && parsedTime < 12 && !(parsedTime > 6)) {
    return parsedTime + 12;
  }

  return parsedTime;
}

function formatHour(time: number) {
  if (time.toString().length === 1) {
    return `0${time}`;
  }

  return time;
}
