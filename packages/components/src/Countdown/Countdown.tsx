import React, { useMemo } from "react";
import { CivilDate } from "@std-proposal/temporal";
import ReactCountdown, { CountdownRenderProps } from "react-countdown";
import { Text } from "../Text";

type GranularityOptions = "dhms" | "dhm" | "dh" | "d";

interface CountdownProps {
  readonly date: CivilDate | Date | number | string;
  readonly showUnits?: boolean;
  readonly granularity?: GranularityOptions;
  onComplete?(): void;
}

export function Countdown({
  date: inputDate,
  onComplete,
  showUnits,
  granularity = "dhms",
}: CountdownProps) {
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
    <ReactCountdown
      date={date}
      zeroPadTime={2}
      renderer={(props: CountdownRenderProps) => (
        <RenderedCountdown
          {...props}
          granularity={granularity}
          showUnits={showUnits}
        />
      )}
      onComplete={onComplete}
    />
  );
}

interface RenderedCountdownProps extends CountdownRenderProps {
  granularity?: GranularityOptions;
  showUnits?: boolean;
}

function RenderedCountdown({
  formatted,
  granularity = "dhms",
  showUnits,
}: RenderedCountdownProps) {
  const { days, hours, minutes, seconds } = formatted;

  return <Text>{buildTime()}</Text>;

  function buildTime() {
    let time = days;

    if (showUnits) {
      time += " dd";
    }

    if (granularity.includes("h")) {
      time += ` : ${hours}${showUnits && " hh"}`;

      if (granularity.includes("m")) {
        time += ` : ${minutes}${showUnits && " mm"}`;

        if (granularity.includes("s")) {
          time += ` : ${seconds}${showUnits && " ss"}`;
        }
      }
    }

    return time;
  }
}
