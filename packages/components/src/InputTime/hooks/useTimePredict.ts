import debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";
import { InputTimeProps } from "../InputTimeProps";

const hour12to24Hours: Record<string, number | undefined> = {
  "1": 13,
  "2": 14,
  "3": 15,
  "4": 16,
  "5": 17,
  "6": 18,
  "7": 19,
  "8": 20,
};

const LANGUAGE = navigator.language;
const IS_12_HOUR_FORMAT = Intl.DateTimeFormat(LANGUAGE, {
  hour: "numeric",
}).resolvedOptions().hour12;

interface UseTimePredictProps extends Pick<InputTimeProps, "value"> {
  readonly handleChange: (value: string) => void;
}

export function useTimePredict({ value, handleChange }: UseTimePredictProps) {
  const [typedTime, setTypedTime] = useState<string>("");

  const handleKeyup = useCallback(
    debounce(() => {
      if (value) {
        return;
      }

      let predictedHour: number = 1;

      if (IS_12_HOUR_FORMAT) {
        predictedHour = predict12Hours(typedTime);
      }

      handleChange(`${predictedHour}:00`);
    }, 200),
    [typedTime, value, handleChange],
  );

  useEffect(() => {
    if (typedTime !== "0") {
      handleKeyup();
    }

    return handleKeyup.cancel;
  }, [typedTime]);

  return {
    setTypedTime,
  };
}

function predict12Hours(time: string) {
  const today = new Date();
  const currentHour = today.getHours();

  if (time === "1") {
    return currentHour + 1;
  } else {
    return hour12to24Hours[parseInt(time, 10)] || parseInt(time, 10);
  }
}
