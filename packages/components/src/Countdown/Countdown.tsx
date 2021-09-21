import React, { useMemo } from "react";
import { CivilDate } from "@std-proposal/temporal";
import InternalCountdown, { CountdownRenderProps } from "react-countdown";
import { Text } from "../Text";

interface CountdownProps {
  readonly date: CivilDate | Date | number | string;
  onComplete?(): void;
}

export function Countdown({ date: inputDate, onComplete }: CountdownProps) {
  const date = useMemo(
    () =>
      inputDate instanceof Date
        ? inputDate
        : typeof inputDate === "string" || typeof inputDate === "number"
        ? new Date(inputDate)
        : new Date(inputDate.year, inputDate.month - 1, inputDate.day),
    [inputDate],
  );

  return (
    <InternalCountdown
      date={date}
      zeroPadTime={2}
      daysInHours
      renderer={RenderedCountdown}
      onComplete={onComplete}
    />
  );
}

function RenderedCountdown({ formatted }: CountdownRenderProps) {
  const { hours, minutes, seconds } = formatted;
  return <Text>{`${hours}:${minutes}:${seconds}`}</Text>;
}
