import React, { useMemo } from "react";
import { CivilDate } from "@std-proposal/temporal";
import ReactCountdown, { CountdownRenderProps } from "react-countdown";

/**
 * Options for deciding how much information is shown to the user
 * days, hours, minutes, seconds
 */
type GranularityOptions = "dhms" | "hms" | "ms" | "s" | "dhm" | "dh" | "d";

interface CountdownProps {
  /**
   * The date that is being counted down to
   * Civil Time of time is to be displayed.
   * In the case of `date` a `string` should be in ISO 8601 format
   */
  readonly date: CivilDate | Date | number | string;

  /**
   * Whether or not to present the unit of time to the user, or just the raw numbers.
   */
  readonly showUnits?: boolean;

  /**
   * Defines the time format presented
   * (e.g., dhms will show days, hours, minutes, and seconds)
   *
   * @default 'dhms'
   */
  readonly granularity?: GranularityOptions;

  /**
   * Callback when the countdown is done
   */
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
      d: { modDuration: days, totalDuration: days, unit: "days" },
      h: { modDuration: hours, totalDuration: totalHours, unit: "hours" },
      m: { modDuration: minutes, totalDuration: totalMinutes, unit: "minutes" },
      s: { modDuration: seconds, totalDuration: totalSeconds, unit: "seconds" },
    };

    return timeFormatter(times, granularity, showUnits);
  }
}

interface TimeType {
  modDuration: string | number;
  totalDuration: string | number;
  unit: string;
}

type TimesType = Record<string, TimeType>;

function timeFormatter(
  times: TimesType,
  granularity: GranularityOptions,
  showUnits?: boolean,
): string {
  let substr = "";
  granularity.split("").forEach((unit, i) => {
    if (i == 0) {
      substr += `${times[unit].totalDuration}${
        showUnits ? ` ${times[unit].unit}` : ""
      }`;
    } else {
      substr += ` : ${times[unit].modDuration}${
        showUnits ? ` ${times[unit].unit}` : ""
      }`;
    }
  });
  return substr;
}
