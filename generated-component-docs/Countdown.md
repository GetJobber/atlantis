# Countdown

# Countdown

Countdown is used to ensure that a "countdown" to a specified end time is
displayed in a consistent format. No text styling is applied to Countdown; it is
only concerned with the text content that will be presented.

## Design & usage guidelines

Use Countdown when:

- There is a need to make a deadline, such as time left to update important
  details about your account, apparent to the user.
- There is a desire to convey urgency to the user for conversion optimization
  purposes, such as in a time-bound promotional offer.

When choosing which units of time to display via the `granularity` property,
consider the time range that the countdown will start at, and the required level
of urgency. For example, you may not want to display a 4-day countdown using
only seconds; and conversely, a 2-hour countdown would not be conducive to
rendering with only days and hours.

## Content guidelines

Countdown only displays numbers and the units of time that it represents. You
can choose to show or hide the units themselves, in which case the units are
removed and only the `:` between digits remains.

Consider the context of the countdown and whether the user will have enough
context to interpret appropriately without labeled units when making the
decision on whether to show or hide the units.

## Related components

- To display a unit of time that has already passed, use
  [FormatRelativeDateTime](/components/FormatRelativeDateTime)
- To display time as a static unit, use [FormatTime](/components/FormatTime)

## Web Component Code

```tsx
Countdown Timer Time Clock Web React import React, { useMemo } from "react";
import type { CountdownRenderProps } from "react-countdown";
import ReactCountdown from "react-countdown";
import { computeTimeUnit } from "./computeTimeUnit";

/**
 * Options for deciding how much information is shown to the user
 * days, hours, minutes, seconds
 */
type GranularityOptions = "dhms" | "hms" | "ms" | "s" | "dhm" | "dh" | "d";

interface CountdownProps {
  /**
   * The date that is being counted down to.
   * Value for date as a `string` should be in ISO 8601 format.
   */
  readonly date: Date | number | string;

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
    const initDate = new Date(inputDate);

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
  readonly granularity?: GranularityOptions;
  readonly showUnits?: boolean;
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
      d: { total: days, remainder: days, unit: computeTimeUnit(days, "day") },
      h: {
        total: totalHours,
        remainder: hours,
        unit: computeTimeUnit(hours, "hour"),
      },
      m: {
        total: totalMinutes,
        remainder: minutes,
        unit: computeTimeUnit(minutes, "minute"),
      },
      s: {
        total: totalSeconds,
        remainder: seconds,
        unit: computeTimeUnit(seconds, "second"),
      },
    };

    return timeFormatter(times, granularity, showUnits);
  }
}
interface TimeType {
  /**
   * The total amount of that unit (assuming there is no parent unit)
   *
   * Example:
   *   25 hours (instead of 1 day and 1 hour)
   */
  total: string | number;

  /**
   * The remaining time left over up until the next full parent unit
   *
   * Cases/examples:
   *   hours: max = 23, anything over would revert back to 0
   *   minutes or seconds: max = 59, anything over would revert back to 0
   */
  remainder: string | number;

  /**
   * The unit of time
   * (i.e., days, hours, minutes, seconds)
   */
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
      substr += `${times[unit].total}${
        showUnits ? ` ${times[unit].unit}` : ""
      }`;
    } else {
      substr += ` : ${times[unit].remainder}${
        showUnits ? ` ${times[unit].unit}` : ""
      }`;
    }
  });

  return substr;
}
type TimeUnitOptions = "day" | "hour" | "minute" | "second";

export function computeTimeUnit(remainder: string, unit: TimeUnitOptions) {
  return parseInt(remainder, 10) !== 1 ? `${unit}s` : unit;
}

```

## Props

### Web Props

| Prop                                                       | Type                 | Required | Default  | Description                                                                      |
| ---------------------------------------------------------- | -------------------- | -------- | -------- | -------------------------------------------------------------------------------- | -------- | --------------------------------------- |
| `date`                                                     | `string              | number   | Date`    | ✅                                                                               | `_none_` | The date that is being counted down to. |
| Value for date as a `string` should be in ISO 8601 format. |
| `showUnits`                                                | `boolean`            | ❌       | `_none_` | Whether or not to present the unit of time to the user, or just the raw numbers. |
| `granularity`                                              | `GranularityOptions` | ❌       | `dhms`   | Defines the time format presented                                                |
| (e.g., dhms will show days, hours, minutes, and seconds)   |
| `onComplete`                                               | `() => void`         | ❌       | `_none_` | Callback when the countdown is done                                              |

## Categories

- Utilities

## Web Test Code

```typescript
Countdown Timer Time Clock Web React Test Testing Jest import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Countdown } from "./Countdown";

jest.useFakeTimers();

it(`Shows units`, () => {
  const { container } = render(
    <Countdown
      date={new Date(new Date().getTime() + 48 * 3600 * 1000)}
      granularity="dhms"
      showUnits={true}
    />,
  );

  expect(container.innerHTML).toContain("days");
  expect(container.innerHTML).toContain("hours");
  expect(container.innerHTML).toContain("minutes");
  expect(container.innerHTML).toContain("seconds");
});

it(`Should have the right units show up when they're supposed to`, () => {
  const { container } = render(
    <Countdown
      date={new Date(new Date().getTime() + 48 * 3600 * 1000)}
      granularity="d"
      showUnits={true}
    />,
  );

  expect(container.innerHTML).toContain("days");
  expect(container.innerHTML).not.toContain("hours");
  expect(container.innerHTML).not.toContain("minutes");
  expect(container.innerHTML).not.toContain("seconds");
});

it(`Should fire onComplete once the time is up!`, async () => {
  const completeHandler = jest.fn();

  render(
    <Countdown
      date={new Date(new Date().getTime() + 2000)}
      granularity="d"
      showUnits={true}
      onComplete={completeHandler}
    />,
  );

  jest.runAllTimers();

  await waitFor(() => expect(completeHandler).toHaveBeenCalled());
});
import { computeTimeUnit } from "./computeTimeUnit";

describe("computeTimeUnit", () => {
  describe("when remainder time is not equal to one", () => {
    it("should return a plural unit", () => {
      expect(computeTimeUnit("0123", "day")).toEqual("days");
      expect(computeTimeUnit("0", "minute")).toEqual("minutes");
      expect(computeTimeUnit("0123", "second")).toEqual("seconds");
      expect(computeTimeUnit("0123", "hour")).toEqual("hours");
    });
  });

  describe("when remainder time is equal to one", () => {
    it("should return a singular unit", () => {
      expect(computeTimeUnit("01", "day")).toEqual("day");
      expect(computeTimeUnit("01", "hour")).toEqual("hour");
      expect(computeTimeUnit("01", "minute")).toEqual("minute");
      expect(computeTimeUnit("01", "second")).toEqual("second");
    });
  });
});

```

## Component Path

`/components/Countdown`

---

_Generated on 2025-08-21T17:35:16.357Z_
