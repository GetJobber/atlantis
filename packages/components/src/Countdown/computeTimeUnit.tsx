type TimeUnitOptions = "day" | "hour" | "minute" | "second";

export function computeTimeUnit(remainder: string, unit: TimeUnitOptions) {
  return parseInt(remainder, 10) !== 1 ? `${unit}s` : unit;
}
