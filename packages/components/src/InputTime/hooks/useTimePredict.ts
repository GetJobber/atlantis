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

  const handleKeyup = useCallback(
    debounce(() => {
      if (value) return;

      const predictedHour = predictHours(typedTime);
      handleChange(`${formatHour(predictedHour)}:00`);
    }, 300),
    [typedTime, value, handleChange],
  );

  useEffect(() => {
    if (typedTime !== "0") {
      handleKeyup();

      // Immediately if user types any number but 1 and it's in a 12 hour format
      if (IS_12_HOUR_FORMAT && typedTime !== "1") {
        handleKeyup.flush();
      }
    }

    return handleKeyup.cancel;
  }, [typedTime]);

  return {
    setTypedTime,
  };
}

function predictHours(time: string) {
  const today = new Date();
  const currentHour = today.getHours();

  if (time === "1") {
    return currentHour + 1;
  } else if (time === "24" || time === "00") {
    return 0;
  }

  const parsedTime = parseInt(time, 10);

  if (parsedTime > 12 || parsedTime > currentHour) {
    return parsedTime;
  }

  return parsedTime + 12;
}

function formatHour(time: number) {
  if (time.toString().length === 1) {
    return `0${time}`;
  }

  return time;
}
