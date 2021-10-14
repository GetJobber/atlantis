import React, { useMemo } from "react";
import { CivilDate } from "@std-proposal/temporal";
import ReactCountdown, { CountdownRenderProps } from "react-countdown";

type GranularityOptions = "dhms" | "hms" | "ms" | "s" | "dhm" | "dh" | "d";

/**
 * Civil Time of time to be displayed.
 * In the case of `date` a `string` should be in ISO 8601 format
 */
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
  const date = useMemo(() => {
    let initDate: Date;
    if (inputDate instanceof CivilDate) {
      initDate = new Date(inputDate.year, inputDate.month - 1, inputDate.day);
    } else {
      initDate = new Date(inputDate);
    }
    return initDate;
  }, [inputDate]);

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
  return <>{buildTime()}</>;

  function buildTime() {
    const totalHours = 24 * Number(days) + Number(hours);
    const totalMinutes = 60 * totalHours + Number(minutes);
    const totalSeconds = 60 * totalMinutes + Number(seconds);

    const times: TimesType = {
      d: { mod: days, total: days, unit: "days" },
      h: { mod: hours, total: totalHours, unit: "hours" },
      m: { mod: minutes, total: totalMinutes, unit: "minutes" },
      s: { mod: seconds, total: totalSeconds, unit: "seconds" },
    };

    return builder(times, granularity, showUnits);
  }
}

interface TimeType {
  mod: string | number;
  total: string | number;
  unit: string;
}

type TimesType = Record<string, TimeType>;

function builder(
  times: TimesType,
  granularity: GranularityOptions,
  showUnits?: boolean,
): string {
  let substr = "";
  granularity.split("").forEach((unit, i) => {
    if (i == 0) {
      substr += `${times[unit].total}${
        showUnits ? ` ${times[unit].unit}` : ""
      }`;
    } else {
      substr += ` : ${times[unit].mod}${
        showUnits ? ` ${times[unit].unit}` : ""
      }`;
    }
  });
  return substr;
}
