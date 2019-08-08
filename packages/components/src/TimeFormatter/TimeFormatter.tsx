import React from "react";

interface TimeFormatterProps {
  /**
   * Civil Time string to be formatted
   * 17:45:00.000000000
   * 11:30:00.000000000
   */
  readonly civilTime: string;

  /**
   * Decide to show 24 hour vs.
   * 12 hour display
   */
  readonly useMilitaryTime: boolean;
}

export function TimeFormatter(props: TimeFormatterProps) {
  const timeSplit = props.civilTime.split(":");
  const hour = parseInt(timeSplit[0]);
  const minute = parseInt(timeSplit[1]);

  const amOrPm = getAmPmLabel(hour, props.useMilitaryTime);
  const formattedHour = setCorrectHourFormat(hour, props.useMilitaryTime);

  return `${formattedHour}:${minute} ${amOrPm}`;
}

function getAmPmLabel(hour: number, useMilitaryTime: boolean) {
  if (useMilitaryTime === true) {
    return "";
  }

  return hour > 12 ? "PM" : "AM";
}

function setCorrectHourFormat(hour: number, useMilitaryTime: boolean) {
  if (hour > 12 && useMilitaryTime === false) {
    return hour - 12;
  }

  return hour;
}
