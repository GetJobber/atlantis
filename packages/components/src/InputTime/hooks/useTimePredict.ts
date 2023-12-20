import debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";
import { InputTimeProps } from "../InputTimeProps";

const IS_12_HOUR_FORMAT = Intl.DateTimeFormat(navigator.language, {
  hour: "numeric",
}).resolvedOptions().hour12;

interface UseTimePredictProps extends Pick<InputTimeProps, "value"> {
  readonly handleChange: (value: string) => void;
}

export function useTimePredict({ value, handleChange }: UseTimePredictProps) {
  const [typedTime, setTypedTime] = useState<string>("");

  const predictTime = useCallback(
    debounce(() => {
      if (value) return;

      const predictedHour = predictHours(typedTime);
      handleChange(`${formatHour(predictedHour)}:00`);
    }, 300),
    [typedTime, value, handleChange],
  );

  useEffect(() => {
    if (typedTime !== "0") {
      predictTime();

      // Immediately predict if user types any number but 1 and it's in a 12 hour format
      if ((IS_12_HOUR_FORMAT && typedTime !== "1") || typedTime.length === 2) {
        predictTime.flush();
      }
    }

    return predictTime.cancel;
  }, [typedTime]);

  return {
    setTypedTime,
  };
}

// eslint-disable-next-line max-statements
function predictHours(time: string) {
  const today = new Date();
  const currentHour = today.getHours();
  const parsedTime = parseInt(time, 10);

  if (IS_12_HOUR_FORMAT && parsedTime === 1 && currentHour < 12) {
    return currentHour < 10 ? 10 : currentHour + 1;
  }

  if (!IS_12_HOUR_FORMAT && (parsedTime === 1 || parsedTime === 2)) {
    if (parsedTime === 1) {
      return currentHour < 10 || currentHour >= 20 ? 10 : currentHour + 1;
    } else {
      return currentHour < 20 ? 20 : currentHour + 1;
    }
  }

  if (parsedTime === 24 || time === "00") {
    return 0;
  }

  if (IS_12_HOUR_FORMAT && parsedTime < 12 && !(parsedTime > 7)) {
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
