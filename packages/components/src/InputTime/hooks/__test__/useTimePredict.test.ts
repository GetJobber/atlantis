import { act, renderHook } from "@testing-library/react";
import { useTimePredict } from "../useTimePredict";

beforeEach(() => {
  jest.useFakeTimers();
});

describe("useTimePredict", () => {
  it("shouldn't predict time when the value is not empty", async () => {
    const handleChange = jest.fn();
    const noonDate = new Date();
    noonDate.setHours(12, 0, 0, 0);

    const { result } = renderHook(useTimePredict, {
      initialProps: {
        handleChange,
        value: noonDate,
      },
    });

    act(() => result.current.setTypedTime("1"));
    await jest.runAllTimersAsync();

    expect(handleChange).not.toHaveBeenCalled();
  });

  describe("12 hours", () => {
    beforeEach(() => {
      jest.spyOn(Intl, "DateTimeFormat").mockReturnValue({
        // @ts-expect-error - We don't need to mock all the methods
        resolvedOptions: () => ({ hour12: true }),
      });
    });

    it.each`
      currentTime | typedTime | expected
      ${"8:24"}   | ${"1"}    | ${"10:00"}
      ${"10:01"}  | ${"1"}    | ${"11:00"}
      ${"11:01"}  | ${"1"}    | ${"12:00"}
      ${"12:01"}  | ${"1"}    | ${"13:00"}
      ${"13:01"}  | ${"1"}    | ${"13:00"}
      ${"14:01"}  | ${"1"}    | ${"13:00"}
      ${"9:30"}   | ${"10"}   | ${"10:00"}
      ${"9:30"}   | ${"11"}   | ${"11:00"}
      ${"7:00"}   | ${"12"}   | ${"12:00"}
      ${"19:30"}  | ${"10"}   | ${"10:00"}
      ${"19:30"}  | ${"11"}   | ${"11:00"}
      ${"17:00"}  | ${"12"}   | ${"12:00"}
      ${"20:00"}  | ${"13"}   | ${"13:30"}
      ${"20:00"}  | ${"14"}   | ${"13:40"}
      ${"8:00"}   | ${"2"}    | ${"14:00"}
      ${"14:00"}  | ${"2"}    | ${"14:00"}
      ${"16:00"}  | ${"2"}    | ${"14:00"}
      ${"8:00"}   | ${"3"}    | ${"15:00"}
      ${"15:00"}  | ${"3"}    | ${"15:00"}
      ${"16:00"}  | ${"3"}    | ${"15:00"}
      ${"8:00"}   | ${"5"}    | ${"17:00"}
      ${"18:00"}  | ${"5"}    | ${"17:00"}
      ${"20:00"}  | ${"5"}    | ${"17:00"}
      ${"8:00"}   | ${"6"}    | ${"06:00"}
      ${"6:00"}   | ${"6"}    | ${"06:00"}
      ${"20:00"}  | ${"6"}    | ${"06:00"}
      ${"8:00"}   | ${"7"}    | ${"07:00"}
      ${"16:00"}  | ${"7"}    | ${"07:00"}
      ${"19:00"}  | ${"7"}    | ${"07:00"}
    `(
      "should predict $expected when user types $typedTime and the current time is $currentTime",
      simpleTypedTimeTest,
    );
  });

  describe("24 hours", () => {
    beforeEach(() => {
      jest.spyOn(Intl, "DateTimeFormat").mockReturnValue({
        // @ts-expect-error - We don't need to mock all the methods
        resolvedOptions: () => ({ hour12: false }),
      });
    });

    it.each`
      currentTime | typedTime | expected
      ${"8:24"}   | ${"1"}    | ${"10:00"}
      ${"10:01"}  | ${"1"}    | ${"11:00"}
      ${"11:01"}  | ${"1"}    | ${"12:00"}
      ${"12:01"}  | ${"1"}    | ${"13:00"}
      ${"22:01"}  | ${"1"}    | ${"10:00"}
      ${"13:33"}  | ${"00"}   | ${"00:00"}
      ${"12:00"}  | ${"01"}   | ${"01:00"}
      ${"1:00"}   | ${"02"}   | ${"02:00"}
      ${"6:33"}   | ${"24"}   | ${"00:00"}
      ${"13:33"}  | ${"2"}    | ${"20:00"}
      ${"21:33"}  | ${"2"}    | ${"22:00"}
      ${"8:24"}   | ${"3"}    | ${"03:00"}
      ${"8:24"}   | ${"4"}    | ${"04:00"}
    `(
      "should predict $expected when user types $typedTime and the current time is $currentTime",
      simpleTypedTimeTest,
    );
  });
});

interface SimpleTestProps {
  currentTime: string;
  typedTime: string;
  expected: string;
}

async function simpleTypedTimeTest({
  currentTime,
  typedTime,
  expected,
}: SimpleTestProps) {
  setSystemTime(...parseTime(currentTime));

  const handleChange = jest.fn();
  const { result } = renderHook(useTimePredict, {
    initialProps: { handleChange },
  });

  act(() => result.current.setTypedTime(typedTime));
  await jest.runAllTimersAsync();

  expect(handleChange).toHaveBeenCalledWith(expected);
}

function setSystemTime(hours: number, minutes: number) {
  jest.setSystemTime(new Date(2024, 1, 1).setHours(hours, minutes));
}

/**
 * Parse time string into an array of hours and minutes.
 *
 * @param time - Only accepts a string in the 24 hour format of "HH:MM"
 */
function parseTime(time: string): [number, number] {
  const currentTimeArray = time.split(":");
  const parsedTime: [number, number] = [
    parseInt(currentTimeArray[0], 10),
    parseInt(currentTimeArray[1], 10),
  ];

  return parsedTime;
}
